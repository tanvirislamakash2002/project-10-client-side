import { ChevronDown, ChevronUp, Eye, HelpCircle } from 'lucide-react';
import React from 'react';

const PopularFAQs = ({ props }) => {
    const { popularFAQs, setExpandedFAQ, expandedFAQ } = props;
    return (
        <section id="popular-faqs" className="mb-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
                <p className="text-text-muted">Quick answers to common questions</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {popularFAQs.map((faq) => (
                    <div
                        key={faq.id}
                        className="card bg-base-100 shadow-lg border border-section-border hover:shadow-xl transition-all"
                    >
                        <div className="card-body">
                            <div
                                className="flex items-start justify-between cursor-pointer"
                                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                                        <h3 className="font-bold text-base-content">{faq.question}</h3>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-text-muted">
                                        <span className="badge badge-ghost badge-sm">{faq.category}</span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {faq.views.toLocaleString()} views
                                        </span>
                                    </div>
                                </div>
                                {expandedFAQ === faq.id ? (
                                    <ChevronUp className="w-5 h-5 text-text-muted flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-text-muted flex-shrink-0" />
                                )}
                            </div>
                            {expandedFAQ === faq.id && (
                                <div className="mt-4 pt-4 border-t border-section-border">
                                    <p className="text-base-content leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularFAQs;