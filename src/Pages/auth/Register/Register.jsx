import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import imageCompression from 'browser-image-compression';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

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
    mutationFn: async ({ name, email, password, photoURL, role = 'seeker' }) => {
      await createUser({ email, password });
      await updateUser({ displayName: name, photoURL });

      const response = await axiosInstance.post('/api/v1/auth/register-user', {
        name, email, photoURL, role
      });
      return response.data
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Welcome to RoomEase!',
        text: 'Your account has been created successfully',
        timer: 1400,
        icon: 'success'
      }).then(() => {
        navigate(from);
      });

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

      const res = await axiosInstance.post('/api/v1/image/upload-image', formData, {
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
        text: 'Successfully registered with Google',
        showConfirmButton: false,
        timer: 1500
      });
      navigate(from);
    },
    onError: () => toast.error("Google registration failed. Please try again.")
  });

  const handleSignInWithGoogle = () => googleLoginMutation.mutate();

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
            <LeftPanel></LeftPanel>

            {/* Right Panel - Form */}
            <RightPanel props={{ handleSignInWithGoogle, googleLoginMutation, handleSubmit, onSubmit, previewImage, uploading, uploadProgress, hostedImageUrl, handleImageUpload, processing, register, errors, selectedRole, showPassword, setShowPassword, password, passwordValidation, mutation }}></RightPanel>
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