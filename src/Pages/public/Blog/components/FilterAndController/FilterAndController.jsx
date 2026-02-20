import { Filter, Grid3x3, List, X } from 'lucide-react';
import React from 'react';

const FilterAndController = ({ props }) => {
    const { searchTerm, selectedCategory, selectedTag, filteredAndSortedPosts, sortBy, setSortBy, viewMode, setViewMode, setShowMobileFilters, showMobileFilters, setSearchTerm, setSelectedCategory, setSelectedTag } = props;
    return (
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
    );
};

export default FilterAndController;