import { ArrowRight, Camera, Lock, CheckCircle2, Eye, EyeOff, Key, Mail, Search, Upload, User } from 'lucide-react';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router';

const RightPanel = ({ props }) => {
    const { handleSignInWithGoogle, googleLoginMutation, handleSubmit, onSubmit, previewImage, uploading, uploadProgress, hostedImageUrl, handleImageUpload, processing, register, errors, selectedRole, showPassword, setShowPassword, password, passwordValidation, mutation } = props;

    const RequirementItem = ({ met, text }) => (
        <div className={`flex items-center gap-2 text-xs ${met ? 'text-success' : 'text-base-content/50'}`}>
            {met ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
            <span>{text}</span>
        </div>
    );
    return (
        <div className="lg:col-span-3 p-8 lg:p-10 max-h-[90vh] overflow-y-auto">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">Create Account</h2>
                    <p className="text-base-content/60 text-sm">Join our community and find your perfect space</p>
                </div>

                {/* Google Sign Up */}
                <button
                    type="button"
                    onClick={handleSignInWithGoogle}
                    disabled={googleLoginMutation.isPending}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-base-300 hover:border-primary/30 hover:bg-base-200/50 transition-all duration-200 mb-5"
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
                <div className="flex items-center gap-4 mb-5">
                    <div className="flex-1 h-px bg-base-300"></div>
                    <span className="text-xs text-base-content/50 font-medium">or register with email</span>
                    <div className="flex-1 h-px bg-base-300"></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Profile Photo */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-16 h-16 rounded-full object-cover ring-4 ring-base-200" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-base-200 ring-4 ring-base-300 flex items-center justify-center">
                                    <User className="w-7 h-7 text-base-content/40" />
                                </div>
                            )}
                            {uploading && (
                                <div className="absolute inset-0 rounded-full bg-base-content/60 flex items-center justify-center">
                                    <span className="text-base-100 text-xs font-bold">{uploadProgress}%</span>
                                </div>
                            )}
                            {hostedImageUrl && !uploading && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center ring-2 ring-base-100">
                                    <CheckCircle2 className="w-3 h-3 text-success-content" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="photo-upload" disabled={uploading || processing} />
                            <label
                                htmlFor="photo-upload"
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-base-300 hover:border-primary hover:bg-base-200/50 transition-all cursor-pointer ${uploading || processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {uploading ? <Upload className="w-4 h-4 animate-pulse" /> : <Camera className="w-4 h-4" />}
                                <span className="text-sm font-medium">
                                    {uploading ? 'Uploading...' : processing ? 'Processing...' : 'Upload Photo'}
                                </span>
                            </label>
                            <p className="text-xs text-base-content/50 mt-1">JPG, PNG (max 5MB)</p>
                        </div>
                    </div>

                    {uploading && (
                        <div className="w-full bg-base-200 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full transition-all duration-300 rounded-full" style={{ width: `${uploadProgress}%` }} />
                        </div>
                    )}

                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                            <input
                                {...register('name', { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } })}
                                type="text"
                                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-base-200/50 border-2 transition-all duration-200 outline-none ${errors.name ? 'border-error' : 'border-transparent focus:border-primary focus:bg-base-100'}`}
                                placeholder="Your Name"
                            />
                        </div>
                        {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                            <input
                                {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                                type="email"
                                className={`w-full pl-12 pr-4 py-3 rounded-xl bg-base-200/50 border-2 transition-all duration-200 outline-none ${errors.email ? 'border-error' : 'border-transparent focus:border-primary focus:bg-base-100'}`}
                                placeholder="you@email.com"
                            />
                        </div>
                        {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content">I want to</label>
                        <div className="grid grid-cols-2 gap-3">
                            <label className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedRole === 'seeker' ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-primary/50'}`}>
                                <input {...register('role', { required: "Please select your role" })} type="radio" value="seeker" className="sr-only" />
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedRole === 'seeker' ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content/60'}`}>
                                    <Search className="w-5 h-5" />
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-sm">Find a Room</div>
                                    <div className="text-xs text-base-content/60">Looking for space</div>
                                </div>
                                {selectedRole === 'seeker' && (
                                    <div className="absolute top-2 right-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                            </label>
                            <label className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedRole === 'provider' ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-primary/50'}`}>
                                <input {...register('role', { required: "Please select your role" })} type="radio" value="provider" className="sr-only" />
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedRole === 'provider' ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content/60'}`}>
                                    <Key className="w-5 h-5" />
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-sm">List a Room</div>
                                    <div className="text-xs text-base-content/60">Have space to rent</div>
                                </div>
                                {selectedRole === 'provider' && (
                                    <div className="absolute top-2 right-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                            </label>
                        </div>
                        {errors.role && <p className="text-xs text-error">{errors.role.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Min 6 characters' },
                                    validate: {
                                        hasUpperCase: v => /[A-Z]/.test(v) || 'Needs uppercase',
                                        hasSpecialChar: v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Needs special char',
                                    },
                                })}
                                type={showPassword ? "text" : "password"}
                                className={`w-full pl-12 pr-12 py-3 rounded-xl bg-base-200/50 border-2 transition-all duration-200 outline-none ${errors.password ? 'border-error' : 'border-transparent focus:border-primary focus:bg-base-100'}`}
                                placeholder="Create a strong password"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content">
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {password && (
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                <RequirementItem met={passwordValidation.hasMinLength} text="6+ characters" />
                                <RequirementItem met={passwordValidation.hasUpperCase} text="Uppercase" />
                                <RequirementItem met={passwordValidation.hasSpecialChar} text="Special char" />
                            </div>
                        )}
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input {...register('terms', { required: "You must accept the terms" })} type="checkbox" className="checkbox checkbox-sm checkbox-primary rounded mt-0.5" />
                        <span className="text-sm text-base-content/70 leading-relaxed">
                            I agree to the{' '}
                            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </span>
                    </label>
                    {errors.terms && <p className="text-xs text-error">{errors.terms.message}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={mutation.isPending || uploading || processing || !hostedImageUrl}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                        {mutation.isPending ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                <span>Creating Account...</span>
                            </>
                        ) : uploading || processing ? (
                            <>
                                <Upload className="w-4 h-4 animate-pulse" />
                                <span>{uploading ? 'Uploading...' : 'Processing...'}</span>
                            </>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="text-center mt-6 text-base-content/60">
                    Already have an account?{' '}
                    <Link to="/login" state={location.state} className="text-primary hover:text-primary/80 font-semibold transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RightPanel;