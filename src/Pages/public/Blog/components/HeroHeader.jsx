import { Search } from 'lucide-react';
import React from 'react';

const HeroHeader = ({ props }) => {
    const { searchTerm, setSearchTerm } = props
    return (
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
    );
};

export default HeroHeader;