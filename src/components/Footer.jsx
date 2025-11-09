import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Sun,
  Moon,
  Home,
  Shield,
  CheckCircle,
  Send
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isDark, setIsDark] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    // Add your newsletter signup logic here
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <footer className="bg-[--color-section-alt] dark:bg-base-200 border-t border-[--color-section-border] dark:border-base-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Section 1: Platform Overview & Value Proposition */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-base-content">RoomMatch</span>
            </div>
            <p className="text-lg font-semibold text-primary mb-2">
              Find Your Perfect Match, Not Just a Roommate
            </p>
            <p className="text-[--color-text-muted] dark:text-base-content/70 text-sm mb-4">
              Connecting seekers with ideal living spaces through our dual-role system. 
              All listings are admin-verified to ensure quality and safety.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-base-content font-medium">Trusted by 10,000+ Users</span>
            </div>
          </div>

          {/* Section 2: Quick Links for Seekers */}
          <div>
            <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-secondary" />
              Find a Room
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/listings" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Browse All Listings
                </a>
              </li>
              <li>
                <a href="/featured" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Featured Listings
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/matching-quiz" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Roommate Matching Quiz
                </a>
              </li>
              <li>
                <a href="/blog" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Blog & Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Quick Links for Providers */}
          <div>
            <h3 className="text-lg font-bold text-base-content mb-4">List a Space</h3>
            <ul className="space-y-2">
              <li>
                <a href="/post-listing" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Post a Listing
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Manage My Listings
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Pricing & Plans
                </a>
              </li>
              <li>
                <a href="/provider-tips" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Tips for Providers
                </a>
              </li>
            </ul>

            {/* Section 5: Safety & Community Guidelines */}
            <h3 className="text-lg font-bold text-base-content mb-4 mt-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-info" />
              Safety & Trust
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/community-guidelines" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="/safety-tips" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="/report" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Reporting & Support
                </a>
              </li>
              <li>
                <a href="/verification" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Verification Process
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Company & Legal + Section 6: Stay Connected */}
          <div>
            <h3 className="text-lg font-bold text-base-content mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <a href="/about" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Help Center / FAQ
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>

            {/* Section 6: Stay Connected */}
            <h3 className="text-lg font-bold text-base-content mb-4">Stay Updated</h3>
            <p className="text-sm text-[--color-text-muted] dark:text-base-content/70 mb-3">
              Get the latest room listings and tips sent to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="input input-bordered input-sm flex-1 bg-base-100 dark:bg-base-300 text-base-content"
                  required
                />
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm btn-ghost text-[--color-text-muted] hover:text-primary dark:text-base-content/70 dark:hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm btn-ghost text-[--color-text-muted] hover:text-primary dark:text-base-content/70 dark:hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm btn-ghost text-[--color-text-muted] hover:text-primary dark:text-base-content/70 dark:hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm btn-ghost text-[--color-text-muted] hover:text-primary dark:text-base-content/70 dark:hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 7: Final Bottom Bar */}
      <div className="border-t border-[--color-section-border] dark:border-base-300 bg-base-100 dark:bg-base-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[--color-text-muted] dark:text-base-content/70">
              © {new Date().getFullYear()} RoomMatch. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <a 
                href="/privacy" 
                className="text-sm text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <span className="text-[--color-text-muted] dark:text-base-content/70">|</span>
              <a 
                href="/terms" 
                className="text-sm text-[--color-text-muted] dark:text-base-content/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Terms
              </a>
              <span className="text-[--color-text-muted] dark:text-base-content/70">|</span>
              <button
                onClick={toggleTheme}
                className="btn btn-circle btn-sm btn-ghost text-[--color-text-muted] hover:text-primary dark:text-base-content/70 dark:hover:text-primary"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;