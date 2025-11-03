// src/components/Blog/NewsletterSignup.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Send } from 'lucide-react';

const NewsletterSignup = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // In a real app, you would call your API here
    console.log('Subscribing:', data);
    setIsSubscribed(true);
  };

  if (isSubscribed) {
    return (
      <div className="card bg-success text-success-content shadow-xl mt-12">
        <div className="card-body text-center">
          <Send size={48} className="mx-auto mb-4" />
          <h3 className="card-title justify-center text-2xl">Welcome to our community!</h3>
          <p className="text-lg">
            Thank you for subscribing to our newsletter. You'll receive roommate tips and updates directly in your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl mt-12">
      <div className="card-body">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <Mail size={32} />
              <h3 className="card-title text-2xl">Roommate Tips Newsletter</h3>
            </div>
            <p className="text-lg opacity-90">
              Get weekly articles on finding great roommates, creating harmonious living spaces, 
              and making the most of your shared home experience.
            </p>
          </div>
          
          <div className="flex-shrink-0 w-full lg:w-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered flex-1 text-base-content"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                <button type="submit" className="btn btn-accent btn-lg">
                  Subscribe
                  <Send size={20} />
                </button>
              </div>
              {errors.email && (
                <p className="text-error text-sm">{errors.email.message}</p>
              )}
              <p className="text-xs opacity-80">
                No spam ever. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;