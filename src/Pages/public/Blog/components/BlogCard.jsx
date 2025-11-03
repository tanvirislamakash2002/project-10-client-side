import { Link } from 'react-router';
import { Clock, User, Calendar } from 'lucide-react';

const BlogCard = ({ post }) => {
  return (
    <article className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
      <figure className="px-6 pt-6">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </figure>
      
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <span className="badge badge-primary badge-sm">
            {post.category}
          </span>
          <span className="text-xs text-base-content/70 flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>
        
        <h3 className="card-title text-lg hover:text-primary transition-colors">
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-base-content/70 text-sm line-clamp-2">
          {post.excerpt}
        </p>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-base-content/60 mt-2">
          <div className="flex items-center gap-1">
            <User size={12} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="card-actions justify-start mt-3">
          {post.tags.slice(0, 3).map(tag => (
            <div key={tag} className="badge badge-outline badge-xs">
              {tag}
            </div>
          ))}
          {post.tags.length > 3 && (
            <div className="badge badge-ghost badge-xs">
              +{post.tags.length - 3}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;