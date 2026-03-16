import { Star } from 'lucide-react';
import React from 'react';

const SuccessStories = ({ props }) => {
    const { successStories} = props;
    return (
        <section id="success-stories" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Success Stories</h2>
                <p className="text-text-muted">See how others found their perfect match</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStories.map((story) => (
                  <div
                    key={story.id}
                    className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-xl"
                  >
                    <div className="card-body">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                        ))}
                      </div>
                      <p className="text-lg font-bold text-base-content mb-3 italic">
                        "{story.quote}"
                      </p>
                      <p className="text-sm text-text-muted mb-4">{story.story}</p>
                      <div className="flex items-center gap-3 pt-3 border-t border-section-border">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-10">
                            <span className="text-sm">{story.author.charAt(0)}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{story.author}</p>
                          <p className="text-xs text-text-muted">{story.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
    );
};

export default SuccessStories;