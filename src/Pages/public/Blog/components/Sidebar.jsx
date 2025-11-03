// src/components/Blog/Sidebar.jsx
import { Search, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategorySelect,
  popularPosts
}) => {
  // Sample tags - in real app, these would come from your data
  const tags = [
    "first-time renter", "lease agreement", "interview questions", 
    "roommate matching", "security deposit", "utility bills",
    "house rules", "personal space", "conflict resolution"
  ];

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Search Blog</h3>
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search articles..."
                className="input input-bordered flex-1"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <button className="btn btn-primary">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Categories</h3>
          <div className="space-y-2">
            <button
              className={`btn btn-ghost justify-start w-full ${selectedCategory === 'all' ? 'btn-active' : ''}`}
              onClick={() => onCategorySelect('all')}
            >
              All Categories
              <span className="badge badge-neutral ml-auto">42</span>
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`btn btn-ghost justify-start w-full ${selectedCategory === category ? 'btn-active' : ''}`}
                onClick={() => onCategorySelect(category)}
              >
                {category}
                <span className="badge badge-neutral ml-auto">12</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Posts */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Popular Posts
          </h3>
          <div className="space-y-4">
            {popularPosts.slice(0, 3).map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="flex gap-3 hover:bg-base-300 p-2 rounded-lg transition-colors"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-base-content/60 mt-1">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                className="badge badge-outline hover:badge-primary cursor-pointer transition-colors"
                onClick={() => onSearchChange(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;