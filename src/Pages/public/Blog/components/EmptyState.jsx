import { X } from "lucide-react";

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

export default EmptyState;