import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Home, 
  User, 
  Shield, 
  Settings,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const axiosInstance = useAxios();

  const [showPassword, setShowPassword] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  
  const demoAccounts = [
    {
      role: 'seeker',
      icon: User,
      label: 'Seeker',
      email: 'seeker@example.com',
      password: 'RoomEase123',
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      role: 'provider',
      icon: Home,
      label: 'Provider',
      email: 'provider@example.com',
      password: 'RoomEase123',
      gradient: 'from-amber-500 to-orange-500',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-200'
    },
    {
      role: 'verified',
      icon: Shield,
      label: 'Verified',
      email: 'verified@example.com',
      password: 'RoomEase123',
      gradient: 'from-emerald-500 to-green-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-200'
    },
    {
      role: 'admin',
      icon: Settings,
      label: 'Admin',
      email: 'admin@example.com',
      password: 'RoomEase123',
      gradient: 'from-slate-600 to-slate-700',
      bgLight: 'bg-slate-50',
      textColor: 'text-slate-600',
      borderColor: 'border-slate-200'
    }
  ];

  const handleAutofill = (account) => {
    setValue('email', account.email);
    setValue('password', account.password);
    setActiveDemo(account.role);
    toast.success(`${account.label} credentials loaded`, {
      position: "top-center",
      autoClose: 1500,
      icon: "🔐"
    });
  };

  const emailLoginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await axiosInstance.get(`/check-user-email?email=${email}`);
      if (!res.data.exists) throw new Error("Email doesn't exist!");
      await signInUser(email, password);
      await axiosInstance.post('/login', { email });
    },
    onSuccess: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Welcome Back!',
        text: 'Successfully signed in to RoomEase',
        showConfirmButton: false,
        timer: 1500
      });
      navigate(from);
    },
    onError: (error) => {
      let message = "Login failed";
      if (error.code === 'auth/user-not-found') {
        message = "Email doesn't exist";
      } else if (['auth/wrong-password', 'auth/invalid-credential'].includes(error.code)) {
        message = "Invalid password";
      } else {
        message = error.message || "Something went wrong";
      }
      toast.error(message);
    }
  });
 
  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const data = await signInWithGoogle();
      const res = await axiosInstance.get(`/check-user-email?email=${data.user.email}`);
      if (!res.data.exists) {
        await axiosInstance.post('/register-user', {
          name: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
          role: 'seeker'
        });
      }
      await axiosInstance.post('/login', { email: data.user.email });
    },
    onSuccess: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Welcome to RoomEase!',
        text: 'Successfully signed in with Google',
        showConfirmButton: false,
        timer: 1500
      });
      navigate(from);
    },
    onError: () => {
      toast.error("Google sign-in failed. Please try again.");
    }
  });

  const onSubmit = (data) => emailLoginMutation.mutate(data);
  const handleSignInWithGoogle = () => googleLoginMutation.mutate();

  const currentEmail = watch('email');
  const currentPassword = watch('password');

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Main Card */}
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
          <div className="grid lg:grid-cols-5">
            
            {/* Left Panel - Branding */}
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
                          className={`group flex items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                            isActive 
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

            {/* Right Panel - Login Form */}
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
                        className={`w-full pl-12 pr-4 py-3 rounded-xl bg-base-200/50 border-2 transition-all duration-200 outline-none ${
                          errors.email 
                            ? 'border-error focus:border-error' 
                            : 'border-transparent focus:border-primary focus:bg-base-100'
                        }`}
                        placeholder="you@example.com"
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
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
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
                        className={`w-full pl-12 pr-12 py-3 rounded-xl bg-base-200/50 border-2 transition-all duration-200 outline-none ${
                          errors.password 
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
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-base-content/40 mt-6">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:underline">Terms</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;