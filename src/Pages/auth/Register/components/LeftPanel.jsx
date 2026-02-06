import { Home, Key, Search, Shield, Sparkles } from 'lucide-react';
import React from 'react';

const LeftPanel = () => {
    return (
        <div className="lg:col-span-2 bg-gradient-to-br from-primary via-primary to-secondary p-8 lg:p-10 text-primary-content relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="absolute top-1/2 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12"></div>

            <div className="relative z-10 h-full flex flex-col">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Home className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">RoomEase</h1>
                        <p className="text-xs opacity-80">Find Your Perfect Match</p>
                    </div>
                </div>

                {/* Why Join */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Why Join RoomEase?</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">Find Roommates</h3>
                                <p className="text-xs opacity-70">Connect with verified roommates matching your lifestyle</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Key className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">List Your Space</h3>
                                <p className="text-xs opacity-70">Easily post rooms and find compatible roommates</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">Verified Profiles</h3>
                                <p className="text-xs opacity-70">All users go through our verification process</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold">10K+</div>
                            <div className="text-xs opacity-70">Active Users</div>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold">5K+</div>
                            <div className="text-xs opacity-70">Rooms Listed</div>
                        </div>
                    </div>
                    <div className="mt-4 p-4 bg-white/10 rounded-xl">
                        <p className="text-xs opacity-80 flex items-start gap-2">
                            <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            Join thousands who found their perfect living situation through RoomEase
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;