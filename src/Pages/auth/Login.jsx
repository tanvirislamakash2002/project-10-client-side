import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { 
  FaUser, 
  FaHome, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle,
  FaLock,
  FaEnvelope,
  FaUsers,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const axiosInstance = useAxios();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  
  // Demo accounts for different roles
  const demoAccounts = [
    {
      role: 'seeker',
      icon: <FaUser className="w-4 h-4" />,
      label: 'Roommate Seeker',
      email: 'seeker@example.com',
      password: 'RoomEase123',
      bgColor: 'bg-[#3182CE]',
      hoverColor: 'hover:bg-blue-600',
      description: 'Find your perfect roommate match'
    },
    {
      role: 'provider',
      icon: <FaHome className="w-4 h-4" />,
      label: 'Room Provider',
      email: 'provider@example.com',
      password: 'RoomEase123',
      bgColor: 'bg-[#E28436]',
      hoverColor: 'hover:bg-orange-600',
      description: 'List available rooms and find roommates'
    },
    {
      role: 'verified_provider',
      icon: <FaUsers className="w-4 h-4" />,
      label: 'Verified Provider',
      email: 'verified@example.com',
      password: 'RoomEase123',
      bgColor: 'bg-[#2E5941]',
      hoverColor: 'hover:bg-green-700',
      description: 'Premium provider with verified listings'
    },
    {
      role: 'admin',
      icon: <FaMapMarkerAlt className="w-4 h-4" />,
      label: 'Administrator',
      email: 'admin@example.com',
      password: 'RoomEase123',
      bgColor: 'bg-[#3D4451]',
      hoverColor: 'hover:bg-gray-700',
      description: 'Manage platform and user verification'
    }
  ];

  const handleAutofill = (account) => {
    setValue('email', account.email);
    setValue('password', account.password);
    toast.success(`Demo credentials loaded for ${account.label}`, {
      position: "top-center",
      autoClose: 2000,
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
        title: 'Welcome to RoomEase!',
        text: 'You have successfully logged in',
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
        message = "Password doesn't match";
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
          role: 'seeker' // Default role for Google signups
        });
      }
      await axiosInstance.post('/login', { email: data.user.email });
    },
    onSuccess: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Welcome to RoomEase!',
        text: 'You have successfully logged in with Google',
        showConfirmButton: false,
        timer: 1500
      });
      navigate(from);
    },
    onError: () => {
      toast.error("Something went wrong with Google login.");
    }
  });

  const onSubmit = (data) => {
    emailLoginMutation.mutate(data);
  };

  const handleSignInWithGoogle = () => {
    googleLoginMutation.mutate();
  };

  const currentEmail = watch('email');
  const currentPassword = watch('password');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9F9] to-[#E2E8F0] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        
        {/* Left Side - Branding & Demo Accounts */}
        <div className="bg-gradient-to-br from-[#10b981] to-[#059669] p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3">Welcome to RoomEase</h1>
              <p className="text-lg opacity-90 mb-6">
                Find your perfect roommate or fill your empty room with trusted matches
              </p>
              <div className="flex items-center gap-4 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <FaHome className="w-4 h-4" />
                  <span>Room Providers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  <span>Room Seekers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="w-4 h-4" />
                  <span>Verified Listings</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Try Demo Accounts</h3>
              <p className="text-sm opacity-90 mb-6">
                Click any role below to autofill demo credentials and explore the platform
              </p>
              
              <div className="grid gap-3">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => handleAutofill(account)}
                    className={`${account.bgColor} ${account.hoverColor} p-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-left group`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-white/20 p-2 rounded-lg group-hover:bg-opacity-30 transition-all">
                        {account.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{account.label}</div>
                        <div className="text-xs opacity-80 mt-1">{account.description}</div>
                        <div className="text-xs opacity-60 mt-2 font-mono">
                          {account.email}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Demo Mode:</strong> All demo accounts are pre-configured with sample data to showcase platform features.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 lg:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1A202C] mb-2">Sign In</h2>
            <p className="text-[#3D4451]">Welcome back! Find your perfect living situation</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[#1A202C]">Email Address</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3D4451] w-4 h-4" />
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="input input-bordered w-full pl-12 bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#10b981] focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-[#E53E3E] mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[#1A202C]">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3D4451] w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="input input-bordered w-full pl-12 pr-12 bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#10b981] focus:outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3D4451] hover:text-[#10b981]"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-[#E53E3E] mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span className="text-sm text-[#3D4451]">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-[#10b981] hover:text-[#059669] font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={emailLoginMutation.isPending}
              className="btn bg-[#10b981] hover:bg-[#059669] text-white border-none w-full h-12"
            >
              {emailLoginMutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="divider text-[#3D4451] text-sm">OR CONTINUE WITH</div>

            <button
              type="button"
              onClick={handleSignInWithGoogle}
              disabled={googleLoginMutation.isPending}
              className="btn btn-outline w-full h-12 border-[#E2E8F0] hover:bg-[#F9F9F9] hover:border-[#10b981]"
            >
              {googleLoginMutation.isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Connecting...
                </>
              ) : (
                <>
                  <FaGoogle className="w-4 h-4 text-[#EA4335]" />
                  Sign in with Google
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-[#3D4451]">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  state={location.state}
                  className="text-[#10b981] hover:text-[#059669] font-semibold hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Current Form Values Display (for demo) */}
            {(currentEmail || currentPassword) && (
              <div className="mt-6 p-4 bg-[#F0FDF4] border border-[#10b981] border-opacity-30 rounded-lg">
                <h4 className="text-sm font-semibold text-[#10b981] mb-2">Current Credentials:</h4>
                <div className="text-xs text-[#3D4451] space-y-1">
                  {currentEmail && <div>📧 Email: {currentEmail}</div>}
                  {currentPassword && <div>🔐 Password: {'•'.repeat(currentPassword.length)}</div>}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;