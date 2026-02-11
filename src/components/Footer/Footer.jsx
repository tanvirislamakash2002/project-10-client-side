import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Home,
  Shield,
  CheckCircle,
  Send,
  ArrowRight,
  Star,
  Users,
  Award
} from 'lucide-react';
import Logo from '../Logo';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    // Add your newsletter signup logic here
  };

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-sky-50 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700">
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Section 1: Platform Overview & Value Proposition - Spans 4 columns */}
          <div className="lg:col-span-4">
            <div className='mb-4'>
            <Logo></Logo>

            </div>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 leading-tight">
              Find Your Perfect Match, Not Just a Roommate
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              Connecting seekers with ideal living spaces through our innovative dual-role system. 
              Every listing is carefully admin-verified to ensure quality, safety, and peace of mind for our community.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-800 dark:text-slate-100 font-semibold text-sm">10,000+ Active Users</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Trusted community</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-slate-800 dark:text-slate-100 font-semibold text-sm">Admin-Verified Listings</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Quality guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Quick Links for Seekers - Spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Find a Room</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/listings" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Browse All Listings</span>
                </a>
              </li>
              <li>
                <a href="/featured" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Featured Listings</span>
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>How It Works</span>
                </a>
              </li>
              <li>
                <a href="/matching-quiz" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Matching Quiz</span>
                </a>
              </li>
              <li>
                <a href="/blog" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Blog & Tips</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Quick Links for Providers - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">List a Space</h3>
            <ul className="space-y-3">
              <li>
                <a href="/post-listing" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Post a Listing</span>
                </a>
              </li>
              <li>
                <a href="/dashboard" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Manage My Listings</span>
                </a>
              </li>
              <li>
                <a href="/pricing" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Pricing & Plans</span>
                </a>
              </li>
              <li>
                <a href="/provider-tips" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Tips for Providers</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Section 5: Safety & Community Guidelines - Spans 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Safety & Trust</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a href="/community-guidelines" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Community Guidelines</span>
                </a>
              </li>
              <li>
                <a href="/safety-tips" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Safety Tips</span>
                </a>
              </li>
              <li>
                <a href="/report" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Report & Support</span>
                </a>
              </li>
              <li>
                <a href="/verification" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Verification Process</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4 & 6: Company Links - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="/contact" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <Mail className="w-4 h-4" />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a href="/help" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Help Center / FAQ</span>
                </a>
              </li>
              <li>
                <a href="/privacy" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="/terms" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="/cookies" className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Cookie Policy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section - Full Width */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-600 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 rounded-2xl mb-5 shadow-lg">
              <Mail className="w-8 h-8 text-white dark:text-slate-900" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">Stay Updated</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Get the latest room listings, safety tips, and exclusive offers delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all"
                required
              />
              <button 
                onClick={handleNewsletterSubmit}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-emerald-500 dark:from-cyan-500 dark:to-emerald-400 text-white dark:text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <p className="text-sm text-slate-600 dark:text-slate-400 mr-2">Follow us:</p>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-sky-500 dark:hover:bg-sky-500 hover:border-sky-500 transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-600 dark:hover:to-pink-600 hover:border-transparent transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-blue-700 dark:hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 7: Final Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} RoomMatch. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a 
                href="/privacy" 
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="/cookies" 
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;