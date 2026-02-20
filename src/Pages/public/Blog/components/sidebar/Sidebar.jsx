import { Eye, Facebook, Instagram, Linkedin, Mail, Tag, TrendingUp, Twitter } from 'lucide-react';
import React from 'react';

const Sidebar = ({ props }) => {
    const { selectedCategory, setSelectedCategory, categories, posts, tags, selectedTag, setSelectedTag, topPosts } = props;
    return (
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
                                className={`btn btn-sm w-full justify-start ${selectedCategory === 'all'
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
                                        className={`btn btn-sm w-full justify-start ${selectedCategory === category
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
                                    className={`badge badge-lg gap-1 cursor-pointer transition-all ${selectedTag === tag
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
    );
};

export default Sidebar;