import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { BlogPostCard } from './components/BlogPostCard/BlogPostCard';
import useAxios from '../../../../hooks/useAxios';
import Sidebar from './components/sidebar/Sidebar';
import FilterAndController from './components/FilterAndController/FilterAndController';
import Pagination from './components/Pagination';
import CTASection from './components/CTASection';
import MobileFilterModal from './components/MobileFiltersModal/MobileFilterModal';
import EmptyState from './components/EmptyState';
import LoadingSkeleton from './components/LoadingSkeleton';
import FeaturedCard from './components/FeaturedCard';
import HeroHeader from './components/HeroHeader';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const axiosInstance = useAxios()
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTag, sortBy, postsPerPage]);

  // Fetch blog posts with filters applied server-side
  const {
    data: blogData,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: ['blogPosts', currentPage, postsPerPage, searchTerm, selectedCategory, selectedTag, sortBy],
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: postsPerPage,
          ...(searchTerm && { search: searchTerm }),
          ...(selectedCategory && selectedCategory !== 'all' && { category: selectedCategory }),
          ...(selectedTag && { tag: selectedTag }),
          sort: sortBy
        });

        const response = await axiosInstance.get(`/api/v1/blog?${params}`);
        return response?.data;
      } catch (err) {
        console.error('API Error:', err);
        throw err;
      }
    },
    keepPreviousData: true,
  });

  // Handle loading state
  if (isLoading && !blogData) {
    return <LoadingSkeleton />;
  }

  // Handle error state
  if (isError) {
    return <div>Error loading blog posts: {error?.message}</div>;
  }

  // Handle no data
  if (!blogData?.posts) {
    return <div>No blog posts available</div>;
  }

  // Destructure data from API response
  const {
    posts = [],
    pagination = {},
    categories = [],
    tags = []
  } = blogData;

  const {
    currentPage: serverPage,
    totalPages,
    totalPosts,
    hasNext,
    hasPrev
  } = pagination;

  const filteredAndSortedPosts = posts; 

  // Pagination calculations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredAndSortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Get featured posts (you might want a separate API endpoint for this)
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);

  // For popular posts, you might want a separate API call
  // But for now, using the current page's posts
  const topPosts = [...posts]
    .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-base-200 dark:bg-base-100">
      {/* Hero Header */}
      <HeroHeader props={{ searchTerm, setSearchTerm }}></HeroHeader>

      {/* Featured Posts Carousel */}
      {featuredPosts.length > 0 && (
        <div className="bg-base-100 dark:bg-base-200 py-12 border-b border-section-border dark:border-section-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-base-content dark:text-base-content flex items-center gap-2">
                <Star className="text-warning dark:text-warning" size={24} />
                Featured Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <FeaturedCard key={post._id} post={post} index={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar props={{ selectedCategory, setSelectedCategory, categories, posts, tags, selectedTag, setSelectedTag, topPosts }}></Sidebar>

          {/* Main Content */}
          <main className="flex-1 order-1 lg:order-2">
            {/* Filters and Controls */}
            <FilterAndController props={{ searchTerm, selectedCategory, selectedTag, filteredAndSortedPosts, sortBy, setSortBy, viewMode, setViewMode, setShowMobileFilters, showMobileFilters, setSearchTerm, setSelectedCategory, setSelectedTag }}></FilterAndController>

            {/* Blog Posts Grid/List */}
            {currentPosts.length > 0 ? (
              <>
                <div className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'
                    : 'space-y-6 mb-8'
                }>
                  {currentPosts.map(post => (
                    <BlogPostCard key={post._id} post={post} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination props={{ indexOfFirstPost, indexOfLastPost, filteredAndSortedPosts, currentPage, setCurrentPage, totalPages, postsPerPage, setPostsPerPage }}></Pagination>
                )}
              </>
            ) : (
              <EmptyState
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
                onClear={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTag(null);
                }}
              />
            )}

            {/* CTA Section */}
            <CTASection></CTASection>
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <MobileFilterModal></MobileFilterModal>
      )}
    </div>
  );
};


export default Blog;