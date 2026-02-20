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

export default FeaturedCard;