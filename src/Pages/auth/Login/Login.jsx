import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxios from '../../../../hooks/useAxios';
import useAuth from '../../../../hooks/useAuth';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const axiosInstance = useAxios();

  const [showPassword, setShowPassword] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();



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
      const res = await axiosInstance.get(`/api/v1/auth/check-user-email?email=${email}`);
      if (!res.data.exists) throw new Error("Email doesn't exist!");
      await signInUser(email, password);
      await axiosInstance.post('/api/v1/auth/login', { email });
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
      const res = await axiosInstance.get(`/api/v1/auth/check-user-email?email=${data.user.email}`);
      if (!res.data.exists) {
        await axiosInstance.post('/api/v1/auth/register-user', {
          name: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
          role: 'seeker'
        });
      }
      await axiosInstance.post('/api/v1/auth/login', { email: data.user.email });
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
            <LeftPanel props={{ handleAutofill, activeDemo }}></LeftPanel>

            {/* Right Panel - Login Form */}
            <RightPanel props={{ handleSignInWithGoogle, googleLoginMutation, handleSubmit, onSubmit, register, errors, showPassword, setShowPassword, emailLoginMutation, activeDemo, currentEmail, currentPassword }}></RightPanel>
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