import { Accessibility, Globe, Mail } from 'lucide-react';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-base-200 border-t border-section-border py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li><a href="/blog" className="hover:text-primary">Blog</a></li>
                            <li><a href="/community" className="hover:text-primary">Community Guidelines</a></li>
                            <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
                            <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li><a href="#categories" className="hover:text-primary">Browse Categories</a></li>
                            <li><a href="#popular-faqs" className="hover:text-primary">Popular FAQs</a></li>
                            <li><a href="#support" className="hover:text-primary">Contact Support</a></li>
                            <li><a href="#system-status" className="hover:text-primary">System Status</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Accessibility</h4>
                        <div className="space-y-3">
                            <button className="btn btn-ghost btn-sm btn-block justify-start gap-2">
                                <Globe className="w-4 h-4" />
                                Language: English
                            </button>
                            <button className="btn btn-ghost btn-sm btn-block justify-start gap-2">
                                <Accessibility className="w-4 h-4" />
                                Accessibility Options
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Stay Updated</h4>
                        <p className="text-sm text-text-muted mb-3">Get help articles delivered to your inbox</p>
                        <div className="join w-full">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="input input-bordered input-sm join-item w-full"
                            />
                            <button className="btn btn-primary btn-sm join-item">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
                    <p>© 2024 RoommateFinder. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span>Last Updated: Feb 11, 2024</span>
                        <span className="badge badge-ghost badge-sm">v2.4.1</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;