import { HelpCircle, Mail, Search } from 'lucide-react';
import React from 'react';

const HeroSection = ({ props }) => {
    const { searchQuery, setSearchQuery, setShowContactForm } = props;
    return (
        <div className="bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <HelpCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                        How can we help you?
                    </h1>
                    <p className="text-xl text-white/90 mb-8 font-medium">
                        Find answers, guides, and support for RoommateFinder
                    </p>

                    {/* Global Search Bar */}
                    <div id="search-bar" className="max-w-2xl mx-auto mb-6">
                        <div className="form-control">
                            <div className="input-group shadow-2xl">
                                <span className="bg-white px-6">
                                    <Search className="w-6 h-6 text-primary" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search for help articles, guides, FAQs..."
                                    className="input input-lg bg-white text-base-content w-full focus:outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        className="btn btn-ghost btn-lg"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Action */}
                    <button
                        onClick={() => setShowContactForm(true)}
                        className="btn btn-lg bg-white text-primary hover:bg-white/90 gap-2 shadow-xl"
                    >
                        <Mail className="w-5 h-5" />
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;