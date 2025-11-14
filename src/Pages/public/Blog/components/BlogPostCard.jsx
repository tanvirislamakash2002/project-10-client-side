import { ArrowRight, Bookmark, Calendar, Clock, Eye, Heart, Star, User } from "lucide-react";

// Blog Post Card Component
export const BlogPostCard = ({ post, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="card card-side bg-base-100 dark:bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <figure className="w-48 md:w-64 flex-shrink-0">
          <img
            src={post.coverImage || 'https://placehold.co/400x300/0E7490/ffffff?text=Blog+Post'}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </figure>
        <div className="card-body">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.featured && (
                  <span className="badge badge-warning badge-sm gap-1">
                    <Star size={10} />
                    Featured
                  </span>
                )}
                {post.categories?.slice(0, 2).map(cat => (
                  <span key={cat} className="badge badge-secondary badge-sm">{cat}</span>
                ))}
              </div>
              <h3 className="card-title text-base-content dark:text-base-content group-hover:text-primary dark:group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-text-muted dark:text-text-muted text-sm mt-2 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4 text-xs text-text-muted dark:text-text-muted">
              <div className="flex items-center gap-1">
                <User size={12} />
                {post.author?.name || 'Admin'}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime || '5 min'}
              </div>
              <div className="flex items-center gap-1">
                <Eye size={12} />
                {post.stats?.views || 0}
              </div>
            </div>
            
            <button className="btn btn-primary btn-sm gap-2">
              Read More
              <ArrowRight size={14} />
            </button>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.slice(0, 4).map(tag => (
                <span key={tag} className="badge badge-outline badge-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="card bg-base-100 dark:bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <figure className="relative h-48 overflow-hidden">
        <img
          src={post.coverImage || 'https://placehold.co/600x400/0E7490/ffffff?text=Blog+Post'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {post.featured && (
          <div className="absolute top-3 left-3">
            <span className="badge badge-warning gap-1">
              <Star size={12} />
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button className="btn btn-circle btn-sm bg-base-100/80 dark:bg-base-200/80 border-none hover:bg-base-100 dark:hover:bg-base-200">
            <Heart size={14} className="text-error" />
          </button>
          <button className="btn btn-circle btn-sm bg-base-100/80 dark:bg-base-200/80 border-none hover:bg-base-100 dark:hover:bg-base-200">
            <Bookmark size={14} className="text-primary" />
          </button>
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
        
        <p className="text-text-muted dark:text-text-muted text-sm line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="divider my-2"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-8">
                <span className="text-xs">{post.author?.name?.charAt(0) || 'A'}</span>
              </div>
            </div>
            <div className="text-xs">
              <div className="font-semibold text-base-content dark:text-base-content">
                {post.author?.name || 'Admin'}
              </div>
              <div className="text-text-muted dark:text-text-muted">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-text-muted dark:text-text-muted">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime || '5 min'}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {post.stats?.views || 0}
            </span>
          </div>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="badge badge-outline badge-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-primary btn-sm gap-2">
            Read More
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};