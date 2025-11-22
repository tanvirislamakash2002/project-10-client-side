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
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Camera,
  Upload,
  Search,
  Key,
  Users
} from 'lucide-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import imageCompression from 'browser-image-compression';

const Register = () => {
  const { updateUser, createUser, signInWithGoogle } = useAuth();
  const axiosInstance = useAxios();

  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [hostedImageUrl, setHostedImageUrl] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');
  const selectedRole = watch('role');

  const validatePassword = (value) => ({
    hasUpperCase: /[A-Z]/.test(value),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    hasMinLength: value?.length >= 6
  });

  const passwordValidation = password ? validatePassword(password) : {};

  const mutation = useMutation({
    mutationFn: async ({ name, email, password, photoURL, role }) => {
      await createUser({ email, password });
      await updateUser({ displayName: name, photoURL });
      return axiosInstance.post('/register-user', { 
        name, email, photoURL, role: role || 'seeker'
      });
    },
    onSuccess: () => {
      Swal.fire({ 
        title: 'Welcome to RoomEase!', 
        text: 'Your account has been created successfully',
        timer: 1400, 
        icon: 'success' 
      });
      navigate(from);
    },
    onError: (error) => {
      Swal.fire({
        title: 'Registration Failed',
        text: error?.response?.data?.error || error.message,
        icon: 'error'
      });
    }
  });

  const onSubmit = async (data) => {
    const { name, email, password, role } = data;
    mutation.mutate({ name, email, password, photoURL: hostedImageUrl, role });
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    try {
      const options = { maxSizeMB: 0.1, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(imageFile, options);
      setPreviewImage(URL.createObjectURL(compressedFile));
      setProcessing(true);
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('image', compressedFile);

      const res = await axiosInstance.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          }
        },
        timeout: 180000,
      });

      const url = res.data?.data?.url;
      if (!url) throw new Error('Image URL not returned');

      setHostedImageUrl(url);
      setProcessing(false);
      setUploading(false);
    } catch (err) {
      console.error('Upload error:', err);
      Swal.fire('Upload Failed', 'Could not upload image', 'error');
      setPreviewImage('');
      setHostedImageUrl('');
      setProcessing(false);
      setUploading(false);
      setUploadProgress(0);
    }
  };

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
        text: 'Successfully registered with Google',
        showConfirmButton: false,
        timer: 1500
      });
      navigate(from);
    },
    onError: () => toast.error("Google registration failed. Please try again.")
  });

  const handleSignInWithGoogle = () => googleLoginMutation.mutate();

  const RequirementItem = ({ met, text }) => (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-success' : 'text-base-content/50'}`}>
      {met ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
          <div className="grid lg:grid-cols-5">
            
            {/* Left Panel - Branding */}
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

            {/* Right Panel - Form */}
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
                        placeholder="John Doe"
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
                        placeholder="you@example.com"
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
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-base-content/40 mt-6">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-primary hover:underline">Terms</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;