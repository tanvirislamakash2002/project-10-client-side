import { ExternalLink } from 'lucide-react';
import React from 'react';

const HelpCategoriesGrid = ({ props }) => {
    const { filteredCategories, getCategoryColor } = props;
    return (
        <section id="categories" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Browse Help Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <div
                            key={category.id}
                            className={`card bg-gradient-to-br ${getCategoryColor(category.color)} border-2 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
                        >
                            <div className="card-body">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-14 h-14 bg-${category.color}/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-7 h-7 text-${category.color}`} />
                                    </div>
                                    <div className="badge badge-sm badge-ghost">
                                        {category.articles} articles
                                    </div>
                                </div>
                                <h3 className="card-title text-lg text-base-content mb-2">
                                    {category.title}
                                </h3>
                                <p className="text-sm text-text-muted">
                                    {category.description}
                                </p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-ghost btn-sm gap-1">
                                        Learn More
                                        <ExternalLink className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default HelpCategoriesGrid;