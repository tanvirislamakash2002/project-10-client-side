import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';

const RightPanel = ({ props }) => {
    const { handleSignInWithGoogle, googleLoginMutation, handleSubmit, onSubmit, register, errors, showPassword, setShowPassword, emailLoginMutation, activeDemo, currentEmail, currentPassword } = props
    return (
        <div className="lg:col-span-3 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-base-content/60">
                        Sign in to continue to your account
                    </p>
                </div>

                {/* Google Sign In */}
                <button
                    type="button"
                    onClick={handleSignInWithGoogle}
                    disabled={googleLoginMutation.isPending}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-base-300 hover:border-primary/30 hover:bg-base-200/50 transition-all duration-200 mb-6"
                >
                    {googleLoginMutation.isPending ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                        <FaGoogle className="w-5 h-5 text-[#EA4335]" />
                    )}
                    <span className="font-medium text-base-content">
                        {googleLoginMutation.isPending ? 'Connecting...' : 'Continue with Google'}
                    </span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-base-300"></div>
                    <span className="text-sm text-base-content/50 font-medium">or sign in with email</span>
                    <div className="flex-1 h-px bg-base-300"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter a valid email"
                                    }
                                })}
                                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-base-200/50 border-2 transition-all duration-200 outline-none ${errors.email
                                    ? 'border-error focus:border-error'
                                    : 'border-transparent focus:border-primary focus:bg-base-100'
                                    }`}
                                placeholder="you@email.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-error flex items-center gap-1">
                                <span className="inline-block w-1 h-1 bg-error rounded-full"></span>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-base-content">
                                Password
                            </label>
                            <a
                                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                Forgot password?
                            </a>
                            {/* <Link
                                to="/forgot-password"
                                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                Forgot password?
                            </Link> */}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                className={`w-full pl-12 pr-12 py-3 rounded-xl bg-base-200/50 border-2 transition-all duration-200 outline-none ${errors.password
                                    ? 'border-error focus:border-error'
                                    : 'border-transparent focus:border-primary focus:bg-base-100'
                                    }`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-error flex items-center gap-1">
                                <span className="inline-block w-1 h-1 bg-error rounded-full"></span>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Remember Me */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-primary rounded"
                        />
                        <span className="text-sm text-base-content/70 group-hover:text-base-content transition-colors">
                            Keep me signed in
                        </span>
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={emailLoginMutation.isPending}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {emailLoginMutation.isPending ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center mt-8 text-base-content/60">
                    New to RoomEase?{' '}
                    <Link
                        to="/register"
                        state={location.state}
                        className="text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                        Create an account
                    </Link>
                </p>

                {/* Demo Credentials Display */}
                {activeDemo && currentEmail && (
                    <div className="mt-6 p-4 rounded-xl bg-success/10 border border-success/20">
                        <div className="flex items-center gap-2 text-success mb-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm font-semibold">Demo credentials loaded</span>
                        </div>
                        <div className="text-xs text-base-content/60 space-y-1">
                            <p>📧 {currentEmail}</p>
                            <p>🔐 {'•'.repeat(currentPassword?.length || 0)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RightPanel;