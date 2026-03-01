import React from 'react';

const ContactAndSupport = ({ props }) => {
    const { supportTiers } = props;
    return (
        <section id="support" className="mb-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Get Support</h2>
                <p className="text-text-muted">Choose the best way to reach us</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportTiers.map((tier) => {
                    const Icon = tier.icon;
                    return (
                        <div
                            key={tier.tier}
                            className={`card bg-gradient-to-br from-${tier.color}/10 to-${tier.color}/5 border-2 border-${tier.color}/30 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                            onClick={tier.action}
                        >
                            <div className="card-body items-center text-center">
                                <div className={`w-16 h-16 bg-${tier.color}/20 rounded-full flex items-center justify-center mb-4`}>
                                    <Icon className={`w-8 h-8 text-${tier.color}`} />
                                </div>
                                <h3 className="card-title text-lg mb-2">{tier.tier}</h3>
                                <div className="space-y-2 w-full">
                                    <div className="text-sm">
                                        <span className="font-semibold">Method:</span>
                                        <p className="text-text-muted">{tier.method}</p>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-semibold">Response:</span>
                                        <p className="text-text-muted">{tier.responseTime}</p>
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-semibold">Best for:</span>
                                        <p className="text-text-muted">{tier.bestFor}</p>
                                    </div>
                                </div>
                                <button className={`btn btn-${tier.color} btn-sm mt-4 w-full`}>
                                    Get Help
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ContactAndSupport;