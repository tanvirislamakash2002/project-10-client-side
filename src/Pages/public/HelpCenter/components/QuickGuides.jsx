import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

const QuickGuides = ({ props }) => {
    const { quickGuides, setExpandedGuide, expandedGuide } = props;
    return (
        <section id="quick-guides" className="mb-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Step-by-Step Guides</h2>
                <p className="text-text-muted">Visual tutorials to get you started</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {quickGuides.map((guide) => {
                    const Icon = guide.icon;
                    return (
                        <div
                            key={guide.id}
                            className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-xl"
                        >
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-base-content">{guide.title}</h3>
                                        <span className="badge badge-sm badge-primary">
                                            For {guide.audience === 'both' ? 'Everyone' : guide.audience}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="cursor-pointer"
                                    onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                                >
                                    <div className="flex items-center justify-between py-2 px-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                                        <span className="font-semibold text-sm">
                                            {guide.steps.length} Steps
                                        </span>
                                        {expandedGuide === guide.id ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </div>
                                </div>

                                {expandedGuide === guide.id && (
                                    <div className="mt-4 space-y-3">
                                        {guide.steps.map((step, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-base-content">{step.title}</h4>
                                                    <p className="text-sm text-text-muted">{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default QuickGuides;