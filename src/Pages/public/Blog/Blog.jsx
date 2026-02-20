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
import { BlogPostCard } from './components/BlogPostCard/BlogPostCard';
import useAxios from '../../../../hooks/useAxios';
import Sidebar from './components/sidebar/Sidebar';
import FilterAndController from './components/FilterAndController/FilterAndController';
import Pagination from './components/Pagination';
import CTASection from './components/CTASection';
import MobileFilterModal from './components/MobileFiltersModal/MobileFilterModal';
import EmptyState from './components/EmptyState';

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

  const filteredAndSortedPosts = posts; // Server already filtered and sorted

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
// function generateMockPosts() {
//   return [
//     {
//       _id: '1',
//       title: '10 Essential Tips for First-Time Roommate Seekers',
//       slug: '10-essential-tips-first-time-seekers',
//       excerpt: 'Starting your roommate search? Here are the top 10 things you need to know before signing that lease.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
//       author: { name: 'Sarah Johnson', avatar: '' },
//       status: 'published',
//       categories: ['Tips for Seekers', 'For Both'],
//       tags: ['budget', 'safety', 'communication'],
//       featured: true,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 1243, likes: 89, shares: 34 },
//       createdAt: new Date('2024-11-01'),
//       readTime: '8 min read'
//     },
//     {
//       _id: '2',
//       title: 'How to Screen Potential Roommates: A Provider\'s Guide',
//       slug: 'screen-potential-roommates-guide',
//       excerpt: 'Learn the best practices for vetting roommates to ensure you find the perfect match for your space.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
//       author: { name: 'Michael Chen', avatar: '' },
//       status: 'published',
//       categories: ['Advice for Providers'],
//       tags: ['safety', 'legal', 'screening'],
//       featured: true,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 956, likes: 67, shares: 23 },
//       createdAt: new Date('2024-10-28'),
//       readTime: '6 min read'
//     },
//     {
//       _id: '3',
//       title: 'Budget-Friendly Decorating Ideas for Shared Spaces',
//       slug: 'budget-decorating-shared-spaces',
//       excerpt: 'Transform your shared living space without breaking the bank with these creative decorating tips.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
//       author: { name: 'Emma Williams', avatar: '' },
//       status: 'published',
//       categories: ['Decorating on a Budget', 'For Both'],
//       tags: ['budget', 'lifestyle', 'moving'],
//       featured: false,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 2103, likes: 145, shares: 67 },
//       createdAt: new Date('2024-10-25'),
//       readTime: '5 min read'
//     },
//     {
//       _id: '4',
//       title: 'Understanding Your Rights: Roommate Agreements 101',
//       slug: 'understanding-rights-roommate-agreements',
//       excerpt: 'Everything you need to know about roommate agreements and your legal rights as a tenant.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
//       author: { name: 'David Martinez', avatar: '' },
//       status: 'published',
//       categories: ['For Both', 'Safety & Trust'],
//       tags: ['legal', 'contracts', 'safety'],
//       featured: false,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 1567, likes: 92, shares: 45 },
//       createdAt: new Date('2024-10-22'),
//       readTime: '10 min read'
//     },
//     {
//       _id: '5',
//       title: 'Best Neighborhoods for Young Professionals in NYC',
//       slug: 'best-neighborhoods-young-professionals-nyc',
//       excerpt: 'Discover the top NYC neighborhoods perfect for young professionals seeking roommates.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&h=600&fit=crop',
//       author: { name: 'Lisa Anderson', avatar: '' },
//       status: 'published',
//       categories: ['City Guides'],
//       tags: ['location', 'budget', 'lifestyle'],
//       featured: true,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 3421, likes: 234, shares: 89 },
//       createdAt: new Date('2024-10-20'),
//       readTime: '12 min read'
//     },
//     {
//       _id: '6',
//       title: 'How to Handle Roommate Conflicts Like a Pro',
//       slug: 'handle-roommate-conflicts',
//       excerpt: 'Practical strategies for resolving disagreements and maintaining a peaceful living environment.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
//       author: { name: 'James Wilson', avatar: '' },
//       status: 'published',
//       categories: ['For Both', 'Safety & Trust'],
//       tags: ['communication', 'lifestyle'],
//       featured: false,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 1876, likes: 112, shares: 56 },
//       createdAt: new Date('2024-10-18'),
//       readTime: '7 min read'
//     },
//     {
//       _id: '7',
//       title: 'Creating a Cleaning Schedule That Actually Works',
//       slug: 'cleaning-schedule-that-works',
//       excerpt: 'Say goodbye to passive-aggressive notes! Learn how to create a fair cleaning schedule for shared spaces.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=600&fit=crop',
//       author: { name: 'Rachel Kim', avatar: '' },
//       status: 'published',
//       categories: ['For Both'],
//       tags: ['cleaning', 'communication', 'lifestyle'],
//       featured: false,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 892, likes: 54, shares: 21 },
//       createdAt: new Date('2024-10-15'),
//       readTime: '5 min read'
//     },
//     {
//       _id: '8',
//       title: 'Red Flags to Watch Out for When Meeting Potential Roommates',
//       slug: 'red-flags-potential-roommates',
//       excerpt: 'Protect yourself by knowing these warning signs before committing to a roommate situation.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
//       author: { name: 'Tom Harris', avatar: '' },
//       status: 'published',
//       categories: ['Tips for Seekers', 'Safety & Trust'],
//       tags: ['safety', 'screening'],
//       featured: false,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 2654, likes: 187, shares: 78 },
//       createdAt: new Date('2024-10-12'),
//       readTime: '9 min read'
//     },
//     {
//       _id: '9',
//       title: 'Maximizing Small Spaces: Storage Solutions for Roommates',
//       slug: 'maximizing-small-spaces-storage',
//       excerpt: 'Make the most of your shared space with these clever storage and organization ideas.',
//       content: 'Full content here...',
//       coverImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop',
//       author: { name: 'Sophie Taylor', avatar: '' },
//       status: 'published',
//       categories: ['Decorating on a Budget', 'For Both'],
//       tags: ['budget', 'lifestyle', 'moving'],
//       featured: false,
//       meta: { title: 'SEO Title', description: 'SEO Description' },
//       stats: { views: 1234, likes: 78, shares: 34 },
//       createdAt: new Date('2024-10-10'),
//       readTime: '6 min read'
//     }
//   ];
// }

export default Blog;