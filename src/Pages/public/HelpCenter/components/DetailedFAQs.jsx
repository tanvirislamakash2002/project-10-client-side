import { Calendar, DollarSign, FileText, HelpCircle, Home, Lock, Shield } from 'lucide-react';
import React from 'react';

const DetailedFAQs = ({ props }) => {
    const { detailedFAQs } = props;
    return (
        <section id="detailed-faqs" className="mb-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">FAQs by Topic</h2>
                <p className="text-text-muted">Comprehensive answers organized by category</p>
            </div>
            <div className="space-y-4">
                {Object.entries(detailedFAQs).map(([topic, faqs]) => (
                    <div key={topic} className="collapse collapse-arrow bg-base-100 shadow-lg border border-section-border">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-bold flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                {topic === 'account' && <Lock className="w-5 h-5 text-primary" />}
                                {topic === 'listings' && <Home className="w-5 h-5 text-primary" />}
                                {topic === 'applications' && <FileText className="w-5 h-5 text-primary" />}
                                {topic === 'viewings' && <Calendar className="w-5 h-5 text-primary" />}
                                {topic === 'payments' && <DollarSign className="w-5 h-5 text-primary" />}
                                {topic === 'safety' && <Shield className="w-5 h-5 text-primary" />}
                            </div>
                            <span className="capitalize">{topic}</span>
                            <span className="badge badge-primary badge-sm ml-auto">{faqs.length} FAQs</span>
                        </div>
                        <div className="collapse-content">
                            <div className="space-y-4 pt-4">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="p-4 bg-base-200 rounded-lg">
                                        <h4 className="font-bold text-base-content mb-2 flex items-start gap-2">
                                            <HelpCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                                            {faq.q}
                                        </h4>
                                        <p className="text-sm text-text-muted pl-6">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DetailedFAQs;