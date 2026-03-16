import { Download } from 'lucide-react';
import React from 'react';

const Resources = ({ props }) => {
    const { resources } = props;
    return (
        <section id="resources" className="mb-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Resources & Downloads</h2>
                <p className="text-text-muted">Templates, guides, and checklists to help you succeed</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((resource, idx) => (
                    <div key={idx} className="card bg-base-100 shadow-xl border border-section-border">
                        <div className="card-body">
                            <h3 className="card-title text-lg mb-4">{resource.category}</h3>
                            <div className="space-y-3">
                                {resource.items.map((item, itemIdx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={itemIdx}
                                            className="flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon className="w-5 h-5 text-primary" />
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="badge badge-sm badge-ghost">{item.format}</span>
                                                <Download className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Resources;