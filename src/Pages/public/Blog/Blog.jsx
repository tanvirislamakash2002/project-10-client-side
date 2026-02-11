import { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  User, 
  Calendar, 
  ArrowRight,
  Grid3x3,
  List,
  TrendingUp,
  Eye,
  Heart,
  Bookmark,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Tag,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { BlogPostCard } from './components/BlogPostCard';
import useAxios from '../../../../hooks/useAxios';

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
  // Fetch blog posts
  const { data: blogData, isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/blog/posts`)
      console.log(response);
      return response?.data?.posts;
    },
    placeholderData: {
      posts: generateMockPosts(),
      categories: ['Tips for Seekers', 'Advice for Providers', 'For Both', 'City Guides', 'Safety & Trust', 'Decorating on a Budget'],
      tags: ['budget', 'safety', 'legal', 'moving', 'lifestyle', 'cleaning', 'communication', 'contracts'],
      popularPosts: []
    }
  });
  const { posts = [], categories = [], tags = [], popularPosts = [] } = blogData;

  // Filter and sort posts
  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.categories?.includes(selectedCategory);
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      const isPublished = post.status === 'published';
      return matchesSearch && matchesCategory && matchesTag && isPublished;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'popular':
          return (b.stats?.views || 0) - (a.stats?.views || 0);
        case 'trending':
          return (b.stats?.likes || 0) - (a.stats?.likes || 0);
        default:
          return 0;
      }
    });

  // Get featured posts
  const featuredPosts = posts.filter(post => post.featured && post.status === 'published').slice(0, 3);
  
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredAndSortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTag, sortBy]);

  // Get popular posts (top 5 by views)
  const topPosts = [...posts]
    .filter(post => post.status === 'published')
    .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
    .slice(0, 5);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-base-200 dark:bg-base-100">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20 border-b border-section-border dark:border-section-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-base-content dark:text-base-content mb-4">
              Roommate Resources & Insights
            </h1>
            <p className="text-lg text-text-muted dark:text-text-muted mb-8">
              Expert advice, tips, and guides to help you find the perfect roommate and create a harmonious living space
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-text-muted" size={20} />
              <input
                type="text"
                placeholder="Search articles, tips, and guides..."
                className="input input-lg w-full pl-12 pr-4 bg-base-100 dark:bg-base-200 border-2 border-primary/20 dark:border-primary/30 focus:border-primary dark:focus:border-primary text-base-content dark:text-base-content"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

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
          <aside className="lg:w-80 order-2 lg:order-1">
            <div className="sticky top-4 space-y-6">
              {/* Categories */}
              <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-base-content dark:text-base-content text-lg mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`btn btn-sm w-full justify-start ${
                        selectedCategory === 'all' 
                          ? 'btn-primary' 
                          : 'btn-ghost hover:bg-card-hover dark:hover:bg-card-hover'
                      }`}
                    >
                      All Articles
                      <span className="ml-auto badge badge-neutral">{posts.length}</span>
                    </button>
                    {categories.map(category => {
                      const count = posts.filter(p => p.categories?.includes(category)).length;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`btn btn-sm w-full justify-start ${
                            selectedCategory === category 
                              ? 'btn-primary' 
                              : 'btn-ghost hover:bg-card-hover dark:hover:bg-card-hover'
                          }`}
                        >
                          {category}
                          <span className="ml-auto badge badge-neutral">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-base-content dark:text-base-content text-lg mb-4">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        className={`badge badge-lg gap-1 cursor-pointer transition-all ${
                          selectedTag === tag
                            ? 'badge-primary'
                            : 'badge-outline hover:badge-primary'
                        }`}
                      >
                        <Tag size={12} />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Popular Posts */}
              {topPosts.length > 0 && (
                <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
                  <div className="card-body">
                    <h3 className="card-title text-base-content dark:text-base-content text-lg mb-4">
                      <TrendingUp size={20} className="text-success dark:text-success" />
                      Popular Posts
                    </h3>
                    <div className="space-y-4">
                      {topPosts.map((post, index) => (
                        <div key={post._id} className="flex gap-3 group cursor-pointer">
                          <div className="flex-shrink-0 w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-primary dark:text-primary font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-base-content dark:text-base-content group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-text-muted dark:text-text-muted mt-1">
                              <Eye size={12} />
                              {post.stats?.views || 0} views
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 shadow-lg border border-primary/20 dark:border-primary/30">
                <div className="card-body">
                  <div className="text-center mb-4">
                    <Mail className="w-12 h-12 mx-auto text-primary dark:text-primary mb-2" />
                    <h3 className="font-bold text-lg text-base-content dark:text-base-content">
                      Stay Updated
                    </h3>
                    <p className="text-sm text-text-muted dark:text-text-muted mt-1">
                      Get the latest tips delivered to your inbox
                    </p>
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full mb-2 bg-base-100 dark:bg-base-300"
                  />
                  <button className="btn btn-primary w-full">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-base-content dark:text-base-content text-lg mb-4">
                    Follow Us
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="btn btn-outline btn-sm">
                      <Facebook size={16} />
                    </button>
                    <button className="btn btn-outline btn-sm">
                      <Twitter size={16} />
                    </button>
                    <button className="btn btn-outline btn-sm">
                      <Instagram size={16} />
                    </button>
                    <button className="btn btn-outline btn-sm">
                      <Linkedin size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 order-1 lg:order-2">
            {/* Filters and Controls */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg mb-6">
              <div className="card-body">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Results Info */}
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-base-content dark:text-base-content">
                      {searchTerm || selectedCategory !== 'all' || selectedTag ? 'Filtered Results' : 'Latest Articles'}
                    </h2>
                    <span className="badge badge-primary badge-lg">
                      {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'article' : 'articles'}
                    </span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Sort */}
                    <select
                      className="select select-bordered select-sm bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="popular">Most Viewed</option>
                      <option value="trending">Most Liked</option>
                    </select>

                    {/* View Mode Toggle */}
                    <div className="join">
                      <button
                        className={`btn btn-sm join-item ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3x3 size={16} />
                      </button>
                      <button
                        className={`btn btn-sm join-item ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setViewMode('list')}
                      >
                        <List size={16} />
                      </button>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                      className="btn btn-sm btn-outline lg:hidden"
                      onClick={() => setShowMobileFilters(!showMobileFilters)}
                    >
                      <Filter size={16} />
                      Filters
                    </button>
                  </div>
                </div>

                {/* Active Filters */}
                {(searchTerm || selectedCategory !== 'all' || selectedTag) && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-section-border dark:border-section-border">
                    <span className="text-sm text-text-muted dark:text-text-muted">Active filters:</span>
                    {searchTerm && (
                      <span className="badge badge-primary gap-2">
                        Search: "{searchTerm}"
                        <X size={14} className="cursor-pointer" onClick={() => setSearchTerm('')} />
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="badge badge-secondary gap-2">
                        {selectedCategory}
                        <X size={14} className="cursor-pointer" onClick={() => setSelectedCategory('all')} />
                      </span>
                    )}
                    {selectedTag && (
                      <span className="badge badge-accent gap-2">
                        #{selectedTag}
                        <X size={14} className="cursor-pointer" onClick={() => setSelectedTag(null)} />
                      </span>
                    )}
                    <button
                      className="badge badge-ghost gap-1 cursor-pointer hover:badge-error"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setSelectedTag(null);
                      }}
                    >
                      <X size={14} />
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            </div>

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
                  <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
                    <div className="card-body">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-text-muted dark:text-text-muted">
                          Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredAndSortedPosts.length)} of {filteredAndSortedPosts.length} articles
                        </div>
                        
                        <div className="join">
                          <button
                            className="join-item btn btn-sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            «
                          </button>
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Show first, last, current, and adjacent pages
                            if (
                              pageNumber === 1 ||
                              pageNumber === totalPages ||
                              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                              return (
                                <button
                                  key={pageNumber}
                                  className={`join-item btn btn-sm ${
                                    currentPage === pageNumber ? 'btn-primary' : ''
                                  }`}
                                  onClick={() => setCurrentPage(pageNumber)}
                                >
                                  {pageNumber}
                                </button>
                              );
                            } else if (
                              pageNumber === currentPage - 2 ||
                              pageNumber === currentPage + 2
                            ) {
                              return <span key={pageNumber} className="join-item btn btn-sm btn-disabled">...</span>;
                            }
                            return null;
                          })}
                          <button
                            className="join-item btn btn-sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            »
                          </button>
                        </div>

                        <select
                          className="select select-bordered select-sm bg-base-100 dark:bg-base-300"
                          value={postsPerPage}
                          onChange={(e) => {
                            setPostsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option value={6}>6 per page</option>
                          <option value={9}>9 per page</option>
                          <option value={12}>12 per page</option>
                          <option value={24}>24 per page</option>
                        </select>
                      </div>
                    </div>
                  </div>
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
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 shadow-lg mt-8 border border-primary/20 dark:border-primary/30">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold text-base-content dark:text-base-content mb-2">
                  Can't find what you're looking for?
                </h3>
                <p className="text-text-muted dark:text-text-muted mb-4">
                  We're always adding new content. Suggest a topic or reach out to us!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="btn btn-primary">
                    <MessageCircle size={18} />
                    Suggest a Topic
                  </button>
                  <button className="btn btn-outline btn-primary">
                    <ArrowRight size={18} />
                    Browse Listings
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="modal modal-open lg:hidden">
          <div className="modal-box bg-base-100 dark:bg-base-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-base-content dark:text-base-content">Filters</h3>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setShowMobileFilters(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Mobile filter content */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-base-content dark:text-base-content">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setShowMobileFilters(false);
                    }}
                    className={`btn btn-sm w-full justify-start ${
                      selectedCategory === 'all' ? 'btn-primary' : 'btn-ghost'
                    }`}
                  >
                    All Articles
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowMobileFilters(false);
                      }}
                      className={`btn btn-sm w-full justify-start ${
                        selectedCategory === category ? 'btn-primary' : 'btn-ghost'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-base-content dark:text-base-content">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(selectedTag === tag ? null : tag);
                        setShowMobileFilters(false);
                      }}
                      className={`badge badge-lg cursor-pointer ${
                        selectedTag === tag ? 'badge-primary' : 'badge-outline'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline w-full"
                onClick={() => setShowMobileFilters(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Featured Card Component
const FeaturedCard = ({ post, index }) => (
  <div className="card bg-base-100 dark:bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
    <figure className="relative h-48 overflow-hidden">
      <img
        src={post.coverImage || `https://placehold.co/600x400/0E7490/ffffff?text=Featured+${index + 1}`}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-3 left-3">
        <span className="badge badge-warning gap-1">
          <Star size={12} />
          Featured
        </span>
      </div>
    </figure>
    <div className="card-body">
      <div className="flex flex-wrap gap-2 mb-2">
        {post.categories?.slice(0, 2).map(cat => (
          <span key={cat} className="badge badge-secondary badge-sm">{cat}</span>
        ))}
      </div>
      <h3 className="card-title text-base-content dark:text-base-content group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-text-muted dark:text-text-muted text-sm line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-xs text-text-muted dark:text-text-muted mt-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime || '5 min'}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {post.stats?.views || 0}
          </span>
        </div>
        <ArrowRight size={16} className="text-primary dark:text-primary group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);



// Empty State Component
const EmptyState = ({ searchTerm, selectedCategory, selectedTag, onClear }) => (
  <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
    <div className="card-body items-center text-center py-16">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-2xl font-bold text-base-content dark:text-base-content mb-2">
        No articles found
      </h3>
      <p className="text-text-muted dark:text-text-muted max-w-md mb-6">
        {searchTerm
          ? `We couldn't find any articles matching "${searchTerm}"`
          : selectedCategory !== 'all'
          ? `No articles found in "${selectedCategory}" category`
          : selectedTag
          ? `No articles found with tag "${selectedTag}"`
          : 'No articles available at the moment'}
      </p>
      <button className="btn btn-primary gap-2" onClick={onClear}>
        <X size={16} />
        Clear Filters
      </button>
    </div>
  </div>
);

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-base-200 dark:bg-base-100">
    <div className="bg-base-100 dark:bg-base-200 border-b border-section-border dark:border-section-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="skeleton h-12 w-3/4 mx-auto"></div>
          <div className="skeleton h-6 w-1/2 mx-auto"></div>
          <div className="skeleton h-12 w-full max-w-2xl mx-auto"></div>
        </div>
      </div>
    </div>
    
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="skeleton h-64 w-full"></div>
          <div className="skeleton h-48 w-full"></div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-base-100 dark:bg-base-200 shadow-lg">
                <div className="skeleton h-48 w-full"></div>
                <div className="card-body space-y-2">
                  <div className="skeleton h-4 w-1/2"></div>
                  <div className="skeleton h-6 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Mock Data Generator
function generateMockPosts() {
  return [
    {
      _id: '1',
      title: '10 Essential Tips for First-Time Roommate Seekers',
      slug: '10-essential-tips-first-time-seekers',
      excerpt: 'Starting your roommate search? Here are the top 10 things you need to know before signing that lease.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      author: { name: 'Sarah Johnson', avatar: '' },
      status: 'published',
      categories: ['Tips for Seekers', 'For Both'],
      tags: ['budget', 'safety', 'communication'],
      featured: true,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 1243, likes: 89, shares: 34 },
      createdAt: new Date('2024-11-01'),
      readTime: '8 min read'
    },
    {
      _id: '2',
      title: 'How to Screen Potential Roommates: A Provider\'s Guide',
      slug: 'screen-potential-roommates-guide',
      excerpt: 'Learn the best practices for vetting roommates to ensure you find the perfect match for your space.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      author: { name: 'Michael Chen', avatar: '' },
      status: 'published',
      categories: ['Advice for Providers'],
      tags: ['safety', 'legal', 'screening'],
      featured: true,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 956, likes: 67, shares: 23 },
      createdAt: new Date('2024-10-28'),
      readTime: '6 min read'
    },
    {
      _id: '3',
      title: 'Budget-Friendly Decorating Ideas for Shared Spaces',
      slug: 'budget-decorating-shared-spaces',
      excerpt: 'Transform your shared living space without breaking the bank with these creative decorating tips.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      author: { name: 'Emma Williams', avatar: '' },
      status: 'published',
      categories: ['Decorating on a Budget', 'For Both'],
      tags: ['budget', 'lifestyle', 'moving'],
      featured: false,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 2103, likes: 145, shares: 67 },
      createdAt: new Date('2024-10-25'),
      readTime: '5 min read'
    },
    {
      _id: '4',
      title: 'Understanding Your Rights: Roommate Agreements 101',
      slug: 'understanding-rights-roommate-agreements',
      excerpt: 'Everything you need to know about roommate agreements and your legal rights as a tenant.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
      author: { name: 'David Martinez', avatar: '' },
      status: 'published',
      categories: ['For Both', 'Safety & Trust'],
      tags: ['legal', 'contracts', 'safety'],
      featured: false,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 1567, likes: 92, shares: 45 },
      createdAt: new Date('2024-10-22'),
      readTime: '10 min read'
    },
    {
      _id: '5',
      title: 'Best Neighborhoods for Young Professionals in NYC',
      slug: 'best-neighborhoods-young-professionals-nyc',
      excerpt: 'Discover the top NYC neighborhoods perfect for young professionals seeking roommates.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&h=600&fit=crop',
      author: { name: 'Lisa Anderson', avatar: '' },
      status: 'published',
      categories: ['City Guides'],
      tags: ['location', 'budget', 'lifestyle'],
      featured: true,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 3421, likes: 234, shares: 89 },
      createdAt: new Date('2024-10-20'),
      readTime: '12 min read'
    },
    {
      _id: '6',
      title: 'How to Handle Roommate Conflicts Like a Pro',
      slug: 'handle-roommate-conflicts',
      excerpt: 'Practical strategies for resolving disagreements and maintaining a peaceful living environment.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      author: { name: 'James Wilson', avatar: '' },
      status: 'published',
      categories: ['For Both', 'Safety & Trust'],
      tags: ['communication', 'lifestyle'],
      featured: false,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 1876, likes: 112, shares: 56 },
      createdAt: new Date('2024-10-18'),
      readTime: '7 min read'
    },
    {
      _id: '7',
      title: 'Creating a Cleaning Schedule That Actually Works',
      slug: 'cleaning-schedule-that-works',
      excerpt: 'Say goodbye to passive-aggressive notes! Learn how to create a fair cleaning schedule for shared spaces.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=600&fit=crop',
      author: { name: 'Rachel Kim', avatar: '' },
      status: 'published',
      categories: ['For Both'],
      tags: ['cleaning', 'communication', 'lifestyle'],
      featured: false,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 892, likes: 54, shares: 21 },
      createdAt: new Date('2024-10-15'),
      readTime: '5 min read'
    },
    {
      _id: '8',
      title: 'Red Flags to Watch Out for When Meeting Potential Roommates',
      slug: 'red-flags-potential-roommates',
      excerpt: 'Protect yourself by knowing these warning signs before committing to a roommate situation.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      author: { name: 'Tom Harris', avatar: '' },
      status: 'published',
      categories: ['Tips for Seekers', 'Safety & Trust'],
      tags: ['safety', 'screening'],
      featured: false,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 2654, likes: 187, shares: 78 },
      createdAt: new Date('2024-10-12'),
      readTime: '9 min read'
    },
    {
      _id: '9',
      title: 'Maximizing Small Spaces: Storage Solutions for Roommates',
      slug: 'maximizing-small-spaces-storage',
      excerpt: 'Make the most of your shared space with these clever storage and organization ideas.',
      content: 'Full content here...',
      coverImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop',
      author: { name: 'Sophie Taylor', avatar: '' },
      status: 'published',
      categories: ['Decorating on a Budget', 'For Both'],
      tags: ['budget', 'lifestyle', 'moving'],
      featured: false,
      meta: { title: 'SEO Title', description: 'SEO Description' },
      stats: { views: 1234, likes: 78, shares: 34 },
      createdAt: new Date('2024-10-10'),
      readTime: '6 min read'
    }
  ];
}

export default Blog;