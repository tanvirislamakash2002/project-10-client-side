import React from 'react';

const MobileFilterModal = ({ props }) => {
    const { setShowMobileFilters, setSelectedCategory, selectedCategory, categories, tags, selectedTag, setSelectedTag } = props;
    return (
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
                                className={`btn btn-sm w-full justify-start ${selectedCategory === 'all' ? 'btn-primary' : 'btn-ghost'
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
                                    className={`btn btn-sm w-full justify-start ${selectedCategory === category ? 'btn-primary' : 'btn-ghost'
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
                                    className={`badge badge-lg cursor-pointer ${selectedTag === tag ? 'badge-primary' : 'badge-outline'
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
    );
};

export default MobileFilterModal;