// src/components/Blog/FeaturedArticle.jsx
import { Link } from 'react-router-dom';
import { Clock, User, Calendar, ArrowRight } from 'lucide-react';

const FeaturedArticle = ({ article }) => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-primary-content">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2 space-y-4">
            <div className="badge badge-accent badge-lg text-accent-content">
              {article.category}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              {article.title}
            </h1>
            
            <p className="text-lg opacity-90">
              {article.excerpt}
            </p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="badge badge-outline badge-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <Link
              to={`/blog/${article.slug}`}
              className="btn btn-accent btn-lg mt-4"
            >
              Read Full Article
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticle;