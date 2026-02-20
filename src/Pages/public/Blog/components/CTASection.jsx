import { ArrowRight, MessageCircle } from 'lucide-react';
import React from 'react';

const CTASection = () => {
    return (
        <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 shadow-lg mt-8 border border-primary/20 dark:border-primary/30">
            <div className="card-body text-center">
                <h3 className="text-2xl font-bold text-base-content dark:text-base-content mb-2">
                    Can't find what you're looking for?
                </h3>
                <p className="text-text-muted dark:text-text-muted mb-4">
                    We're always adding new content. Suggest a topic or reach out to us!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="btn btn-primary">
                        <MessageCircle size={18} />
                        Suggest a Topic
                    </button>
                    <button className="btn btn-outline btn-primary">
                        <ArrowRight size={18} />
                        Browse Listings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CTASection;