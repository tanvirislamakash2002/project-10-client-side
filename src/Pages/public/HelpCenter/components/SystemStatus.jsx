import { Activity, CheckCircle2, Info, XCircle } from 'lucide-react';
import React from 'react';

const SystemStatus = ({ props }) => {
    const { systemStatus } = props;
    return (
        <section id="system-status" className="mb-16">
            <div className="card bg-base-100 shadow-xl border border-section-border">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-primary" />
                        Platform Status
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-4 h-4 rounded-full ${systemStatus.status === 'operational' ? 'bg-success' : 'bg-error'} animate-pulse`}></div>
                                <span className="text-lg font-bold">
                                    {systemStatus.status === 'operational' ? 'All Systems Operational' : 'Service Issues Detected'}
                                </span>
                            </div>
                            <div className="space-y-3">
                                {systemStatus.services.map((service, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                                        <span className="font-medium">{service.name}</span>
                                        <div className="flex items-center gap-2">
                                            {service.status === 'operational' ? (
                                                <>
                                                    <CheckCircle2 className="w-5 h-5 text-success" />
                                                    <span className="text-sm text-success">Operational</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-5 h-5 text-error" />
                                                    <span className="text-sm text-error">Down</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="stats shadow w-full">
                                <div className="stat">
                                    <div className="stat-title">Uptime (30 days)</div>
                                    <div className="stat-value text-success">{systemStatus.uptime}</div>
                                    <div className="stat-desc">Industry leading reliability</div>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-info/10 border-l-4 border-info rounded-r-lg">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-info">Last Incident</p>
                                        <p className="text-sm text-text-muted">{systemStatus.lastIncident}: Brief API slowdown (resolved in 12 minutes)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SystemStatus;