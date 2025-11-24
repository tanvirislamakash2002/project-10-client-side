import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      quote: "The approval process gave me peace of mind. I knew every listing was real and safe to visit alone. Found my perfect room in just two weeks!",
      name: "Sarah",
      location: "Seattle, WA",
      role: "Found a room in Capitol Hill",
      userType: "Seeker",
      rating: 5,
      avatar: "S",
      avatarColor: "from-blue-500 to-blue-600",
      moveInDate: "Moved in March 2024"
    },
    {
      id: 2,
      quote: "I found my perfect roommate in 2 weeks! The detailed profiles helped us know we'd be compatible before even meeting. Six months later, we're still great friends.",
      name: "Michael",
      location: "Portland, OR",
      role: "Found a roommate in Downtown",
      userType: "Provider",
      rating: 5,
      avatar: "M",
      avatarColor: "from-green-500 to-green-600",
      moveInDate: "Hosted since January 2024"
    },
    {
      id: 3,
      quote: "As a first-time renter, I appreciated how easy it was to filter for my budget and must-haves. The secure messaging kept my info private until I was ready.",
      name: "Emily",
      location: "San Francisco, CA",
      role: "Now living in Mission District",
      userType: "Seeker",
      rating: 5,
      avatar: "E",
      avatarColor: "from-purple-500 to-purple-600",
      moveInDate: "Moved in April 2024"
    },
    {
      id: 4,
      quote: "The quality of applicants I received was outstanding. The verification process really attracts serious, respectful people. Found my ideal roommate in days!",
      name: "David",
      location: "Austin, TX",
      role: "Host in East Austin",
      userType: "Provider",
      rating: 5,
      avatar: "D",
      avatarColor: "from-orange-500 to-orange-600",
      moveInDate: "Hosted since February 2024"
    },
    {
      id: 5,
      quote: "Compared to Craigslist and Facebook, this was night and day. Real verified listings, no spam, and I felt safe throughout the entire process.",
      name: "Jessica",
      location: "Denver, CO",
      role: "Found a room in LoDo",
      userType: "Seeker",
      rating: 5,
      avatar: "J",
      avatarColor: "from-pink-500 to-pink-600",
      moveInDate: "Moved in May 2024"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  return (
    <div className="bg-base-100 dark:bg-base-300 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-content px-4 py-2 rounded-full shadow-md mb-6">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Verified Experiences
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content dark:text-base-content mb-4">
            Real Matches, Real Stories
          </h2>
          
          <p className="text-lg text-neutral dark:text-neutral-content max-w-2xl mx-auto">
            Hear from roommates who found their perfect match through our platform
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div 
          className="relative max-w-5xl mx-auto mb-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Testimonial Card */}
          <div className="bg-gradient-to-br from-base-200 to-base-300 dark:from-base-200 dark:to-base-300 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="w-24 h-24 text-primary dark:text-primary" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-warning text-warning" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-base-content dark:text-base-content mb-8 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonials[currentIndex].avatarColor} flex items-center justify-center text-primary-content text-2xl font-bold shadow-lg`}>
                  {testimonials[currentIndex].avatar}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xl font-bold text-base-content dark:text-base-content">
                      {testimonials[currentIndex].name}
                    </h4>
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-xs bg-success/20 text-success-content px-2 py-1 rounded-full font-semibold">
                      Verified User
                    </span>
                  </div>
                  <p className="text-neutral dark:text-neutral-content font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-sm text-neutral/70 dark:text-neutral-content/70">
                    {testimonials[currentIndex].location} • {testimonials[currentIndex].moveInDate}
                  </p>
                </div>

                {/* User Type Badge */}
                <div className={`hidden sm:block px-4 py-2 rounded-full text-sm font-semibold ${
                  testimonials[currentIndex].userType === 'Seeker' 
                    ? 'bg-primary/20 text-primary-content'
                    : 'bg-success/20 text-success-content'
                }`}>
                  {testimonials[currentIndex].userType === 'Seeker' ? 'Room Seeker' : 'Room Provider'}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-base-100 dark:bg-base-200 hover:bg-base-200 dark:hover:bg-base-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-base-content dark:text-base-content" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-base-100 dark:bg-base-200 hover:bg-base-200 dark:hover:bg-base-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-base-content dark:text-base-content" />
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-gradient-to-r from-primary to-accent'
                    : 'w-3 h-3 bg-base-300 dark:bg-base-content/30 hover:bg-base-content/50 dark:hover:bg-base-content/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Supporting Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-base-100 dark:bg-base-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                currentIndex === index ? 'ring-2 ring-primary dark:ring-primary' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-neutral dark:text-neutral-content mb-4 line-clamp-3">
                "{testimonial.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-primary-content text-sm font-bold`}>
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-base-content dark:text-base-content text-sm truncate">
                      {testimonial.name}
                    </p>
                    <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                  </div>
                  <p className="text-xs text-neutral/70 dark:text-neutral-content/70 truncate">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="text-center mt-12">
          <p className="text-neutral dark:text-neutral-content text-lg">
            Join thousands of satisfied users who found their perfect match
          </p>
        </div>
      </div>
    </div>
  );
}