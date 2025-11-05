import { useState, useEffect } from 'react';
import { Search, Clock, User, Calendar, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import FeaturedArticle from './components/FeaturedArticle';
import BlogCard from './components/BlogCard';
import Pagination from './components/Pagination';
import Sidebar from './components/Sidebar';
import NewsletterSignup from './components/NewsletterSignup';

const Blog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const postsPerPage = 6;

    // Fetch blog posts - in a real app, this would be from your API
    const { data: blogData, isLoading } = useQuery({
        queryKey: ['blogPosts'],
        queryFn: async () => {
            // This would be your actual API call
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/posts`);
            return response.json();
        },
        placeholderData: {
            posts: [],
            categories: [],
            popularPosts: []
        }
    });
    console.log(blogData.posts);

    const { posts = [], categories = [], popularPosts = [] } = blogData;

    // Filter posts based on search and category
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get current posts for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Get featured article (most recent)
    const featuredArticle = posts[0];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100">
            {/* Featured Article */}
            {featuredArticle && (
                <FeaturedArticle article={featuredArticle} />
            )}

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Blog Grid Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-base-content">Latest Articles</h2>
                            <div className="flex gap-4">
                                <select
                                    className="select select-bordered select-sm"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Blog Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {currentPosts.map(post => (
                                <BlogCard
                                    key={post.id} post={post} />
                            ))}
                        </div>

                        {/* No Results Message */}
                        {currentPosts.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📝</div>
                                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                                <p className="text-base-content/70">
                                    {searchTerm ? `No results for "${searchTerm}"` : 'No articles in this category yet'}
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <Sidebar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                            popularPosts={popularPosts}
                        />
                    </div>
                </div>

                {/* Newsletter Signup */}
                <NewsletterSignup />
            </div>
        </div>
    );
};

export default Blog;