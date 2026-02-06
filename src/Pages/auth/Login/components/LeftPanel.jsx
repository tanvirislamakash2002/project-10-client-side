import { CheckCircle2, Home, User, Settings, Shield, Sparkles } from 'lucide-react';
import React from 'react';

const LeftPanel = ({ props }) => {
    const { handleAutofill, activeDemo } = props

    const demoAccounts = [
        {
            role: 'seeker',
            icon: User,
            label: 'Seeker',
            email: 'seeker@gmail.com',
            password: 'Password@',
            gradient: 'from-blue-500 to-blue-600',
            bgLight: 'bg-blue-50',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-200'
        },
        {
            role: 'provider',
            icon: Home,
            label: 'Provider',
            email: 'provider@gmail.com',
            password: 'Password@',
            gradient: 'from-amber-500 to-orange-500',
            bgLight: 'bg-amber-50',
            textColor: 'text-amber-600',
            borderColor: 'border-amber-200'
        },
        {
            role: 'verified',
            icon: Shield,
            label: 'Verified',
            email: 'verified@gmail.com',
            password: 'Password@',
            gradient: 'from-emerald-500 to-green-600',
            bgLight: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            borderColor: 'border-emerald-200'
        },
        {
            role: 'admin',
            icon: Settings,
            label: 'Admin',
            email: 'admin@gmail.com',
            password: 'Password@',
            gradient: 'from-slate-600 to-slate-700',
            bgLight: 'bg-slate-50',
            textColor: 'text-slate-600',
            borderColor: 'border-slate-200'
        }
    ];
    return (
        <div className="lg:col-span-2 bg-gradient-to-br from-primary via-primary to-secondary p-8 lg:p-10 text-primary-content relative">
            {/* Decorative Elements */}
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

                {/* Features */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm">Verified Listings</h3>
                            <p className="text-xs opacity-70">All rooms verified by our team</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Shield className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm">Secure Platform</h3>
                            <p className="text-xs opacity-70">Your data is always protected</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm">Smart Matching</h3>
                            <p className="text-xs opacity-70">AI-powered compatibility</p>
                        </div>
                    </div>
                </div>

                {/* Demo Accounts */}
                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">Quick Demo Access</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {demoAccounts.map((account) => {
                            const Icon = account.icon;
                            const isActive = activeDemo === account.role;
                            return (
                                <button
                                    key={account.role}
                                    onClick={() => handleAutofill(account)}
                                    className={`group flex items-center gap-2 p-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-white/25 ring-2 ring-white/50'
                                        : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${account.gradient} flex items-center justify-center shadow-sm`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium">{account.label}</span>
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-xs opacity-60 mt-3 text-center">
                        Click to auto-fill demo credentials
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;