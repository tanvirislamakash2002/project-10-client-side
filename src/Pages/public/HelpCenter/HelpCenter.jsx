import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Book,
  Users,
  Calendar,
  DollarSign,
  Heart,
  AlertTriangle,
  FileText,
  CheckCircle,
  BarChart3,
  CreditCard,
  Lock,
  Smartphone,
  MessageSquare,
  Shield,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  XCircle,
  Activity,
  Download,
  ArrowUp,
  Star,
  Home,
  Eye,
  Edit,
  X,
  Info,
  Grid3x3,
  Camera,
  Image as ImageIcon,
  UserPlus
} from 'lucide-react';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import HelpCategoriesGrid from './components/HelpCategoriesGrid';
import PopularFAQs from './components/PopularFAQs';
import DetailedFAQs from './components/DetailedFAQs';

const HelpCenter = () => {
  const navigate = useNavigate();

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'seekers', 'providers', 'everyone'
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [expandedGuide, setExpandedGuide] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll detection
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Categories Data
  const categories = {
    seekers: [
      {
        id: 'finding-room',
        icon: Search,
        title: 'Finding a Room',
        description: 'Search tips, filters, saving listings',
        color: 'primary',
        articles: 8
      },
      {
        id: 'applying',
        icon: FileText,
        title: 'Applying',
        description: 'How to apply, application status, documents',
        color: 'secondary',
        articles: 12
      },
      {
        id: 'viewings',
        icon: Calendar,
        title: 'Viewings',
        description: 'Requesting viewings, what to ask, virtual tours',
        color: 'info',
        articles: 6
      },
      {
        id: 'payments-seekers',
        icon: DollarSign,
        title: 'Payments & Deposits',
        description: 'Rent, security deposits, fees',
        color: 'success',
        articles: 10
      },
      {
        id: 'matching',
        icon: Heart,
        title: 'Roommate Matching',
        description: 'Preferences, compatibility scores',
        color: 'accent',
        articles: 5
      },
      {
        id: 'issues-seekers',
        icon: AlertTriangle,
        title: 'Issues & Disputes',
        description: 'Reporting problems, mediation',
        color: 'warning',
        articles: 7
      }
    ],
    providers: [
      {
        id: 'creating-listings',
        icon: Edit,
        title: 'Creating Listings',
        description: 'How to post, photos, descriptions',
        color: 'primary',
        articles: 9
      },
      {
        id: 'approval',
        icon: CheckCircle,
        title: 'Approval Process',
        description: 'Pending, review, acceptance criteria',
        color: 'info',
        articles: 4
      },
      {
        id: 'managing-applicants',
        icon: Users,
        title: 'Managing Applicants',
        description: 'Reviewing, messaging, selecting',
        color: 'secondary',
        articles: 11
      },
      {
        id: 'scheduling',
        icon: Calendar,
        title: 'Scheduling Viewings',
        description: 'Setting availability, confirmations',
        color: 'accent',
        articles: 6
      },
      {
        id: 'analytics',
        icon: BarChart3,
        title: 'Understanding Analytics',
        description: 'Views, applications, insights',
        color: 'info',
        articles: 8
      },
      {
        id: 'payouts',
        icon: CreditCard,
        title: 'Payments & Payouts',
        description: 'Rent collection, fees, transfers',
        color: 'success',
        articles: 10
      }
    ],
    everyone: [
      {
        id: 'account',
        icon: Lock,
        title: 'Account & Security',
        description: 'Password, 2FA, privacy settings',
        color: 'primary',
        articles: 14
      },
      {
        id: 'mobile',
        icon: Smartphone,
        title: 'Mobile App',
        description: 'Download, features, troubleshooting',
        color: 'info',
        articles: 7
      },
      {
        id: 'messaging',
        icon: MessageSquare,
        title: 'Messaging',
        description: 'Sending messages, notifications, blocking',
        color: 'secondary',
        articles: 9
      },
      {
        id: 'policies',
        icon: Shield,
        title: 'Policies & Terms',
        description: 'Community guidelines, fair housing',
        color: 'accent',
        articles: 6
      },
      {
        id: 'emergency',
        icon: Phone,
        title: 'Emergency Support',
        description: 'Urgent issues, safety concerns',
        color: 'error',
        articles: 5
      }
    ]
  };

  // Popular FAQs
  const popularFAQs = [
    {
      id: 1,
      question: 'How long does listing approval take?',
      answer: 'Most listings are reviewed and approved within 24-48 hours. Our team carefully checks each listing to ensure quality and compliance with our community guidelines. You\'ll receive an email notification once your listing is approved or if any changes are needed.',
      category: 'providers',
      views: 2847
    },
    {
      id: 2,
      question: 'Can I apply to multiple rooms at once?',
      answer: 'Yes! You can apply to as many rooms as you like. Each application is independent, and providers won\'t know about your other applications. We recommend applying to 3-5 properties that match your criteria to increase your chances of finding the perfect room.',
      category: 'seekers',
      views: 2134
    },
    {
      id: 3,
      question: 'What happens if a provider doesn\'t respond?',
      answer: 'Providers are encouraged to respond within 48 hours. If you haven\'t heard back after 3 days, you\'ll receive an automated reminder. After 5 days of no response, the viewing request is automatically cancelled and the provider receives a negative response time rating.',
      category: 'seekers',
      views: 1923
    },
    {
      id: 4,
      question: 'How do I cancel a viewing request?',
      answer: 'Go to your Dashboard > Viewing Requests, find the request you want to cancel, and click "Cancel Request". Please note that cancelling within 24 hours of the scheduled time may affect your reliability score. Always try to give providers advance notice.',
      category: 'seekers',
      views: 1756
    },
    {
      id: 5,
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use bank-level encryption (256-bit SSL) to protect your data. Your contact information is never shared with others until you choose to connect. We\'re GDPR compliant and never sell your data to third parties. You can read our full Privacy Policy for more details.',
      category: 'everyone',
      views: 1621
    },
    {
      id: 6,
      question: 'What should I do if I suspect a scam?',
      answer: 'Report it immediately! Click the "Report" button on the listing or user profile, or contact our safety team at safety@roommatefinder.com. Never send money outside our platform, and be wary of deals that seem too good to be true. We have a dedicated fraud prevention team that investigates all reports.',
      category: 'everyone',
      views: 1498
    }
  ];

  // Quick Guides
  const quickGuides = [
    {
      id: 'photo-guide',
      title: 'How to take great room photos',
      audience: 'providers',
      icon: Camera,
      steps: [
        { title: 'Clean and declutter', description: 'Remove personal items and tidy up the space' },
        { title: 'Use natural light', description: 'Open curtains and shoot during daytime' },
        { title: 'Capture all angles', description: 'Take photos from each corner of the room' },
        { title: 'Show amenities', description: 'Include photos of bathroom, kitchen, common areas' },
        { title: 'Edit for clarity', description: 'Adjust brightness but keep colors natural' }
      ]
    },
    {
      id: 'application-guide',
      title: 'Write an application that stands out',
      audience: 'seekers',
      icon: FileText,
      steps: [
        { title: 'Introduce yourself warmly', description: 'Share a bit about your personality and interests' },
        { title: 'Explain why you\'re interested', description: 'Mention specific things you like about the listing' },
        { title: 'Address requirements', description: 'Show how you meet the provider\'s criteria' },
        { title: 'Be professional', description: 'Use proper grammar and respectful language' },
        { title: 'Include references', description: 'Offer contact info for previous landlords if possible' }
      ]
    },
    {
      id: 'profile-guide',
      title: 'Complete your profile for better matches',
      audience: 'both',
      icon: UserPlus,
      steps: [
        { title: 'Add a clear profile photo', description: 'Use a friendly, recent photo of yourself' },
        { title: 'Fill out all sections', description: 'Complete profiles get 3x more responses' },
        { title: 'Be honest about preferences', description: 'This helps find compatible roommates' },
        { title: 'Verify your identity', description: 'Verified users are trusted more' }
      ]
    },
    {
      id: 'viewing-guide',
      title: 'How to schedule your first viewing',
      audience: 'seekers',
      icon: Calendar,
      steps: [
        { title: 'Find a listing you like', description: 'Browse and save properties that interest you' },
        { title: 'Click "Request Viewing"', description: 'Button is on the listing detail page' },
        { title: 'Propose 2-3 time slots', description: 'Choose times that work for your schedule' },
        { title: 'Add a personal message', description: 'Briefly introduce yourself to the provider' },
        { title: 'Wait for confirmation', description: 'Provider will accept or propose alternative times' }
      ]
    }
  ];

  // Detailed FAQs by Topic
  const detailedFAQs = {
    account: [
      { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page, enter your email, and follow the reset link sent to your inbox.' },
      { q: 'Can I change my email address?', a: 'Yes, go to Settings > Account > Email Address. You\'ll need to verify the new email.' },
      { q: 'How do I delete my account?', a: 'Go to Settings > Account > Delete Account. Note: This action is permanent and cannot be undone.' },
      { q: 'How do I enable two-factor authentication (2FA)?', a: 'Go to Settings > Security > Two-Factor Authentication and follow the setup instructions.' }
    ],
    listings: [
      { q: 'Why is my listing still pending?', a: 'Listings are typically reviewed within 24-48 hours. Check your email for any feedback from our review team.' },
      { q: 'How do I edit a published listing?', a: 'Go to Provider Dashboard > My Listings, click on the listing, and select "Edit".' },
      { q: 'Can I temporarily hide my listing?', a: 'Yes! In your listing settings, toggle "Visibility" to "Hidden". You can reactivate it anytime.' },
      { q: 'What makes a listing get approved faster?', a: 'Complete listings with 5+ quality photos, detailed descriptions, and accurate information are approved fastest.' }
    ],
    applications: [
      { q: 'How do I withdraw an application?', a: 'Go to Dashboard > My Applications, find the application, and click "Withdraw Application".' },
      { q: 'Why was my application rejected?', a: 'Providers may have found a better match. Don\'t take it personally - keep applying to other properties!' },
      { q: 'Can I apply without creating a profile?', a: 'No, a complete profile is required. This helps providers evaluate your application and builds trust.' },
      { q: 'How long does it take to hear back?', a: 'Most providers respond within 3-5 days. You\'ll receive email notifications about your application status.' }
    ],
    viewings: [
      { q: 'How do I request a virtual viewing?', a: 'When requesting a viewing, check the "Virtual Viewing Preferred" option and mention it in your message.' },
      { q: 'What if the provider doesn\'t show up?', a: 'Wait 15 minutes, then contact them via our messaging system. If no response, report it to support.' },
      { q: 'Can I bring someone to the viewing?', a: 'It\'s courteous to ask the provider first. Mention this in your viewing request message.' },
      { q: 'How early should I arrive?', a: 'Aim to arrive 5 minutes early. Being punctual shows respect for the provider\'s time.' }
    ],
    payments: [
      { q: 'What payment methods are accepted?', a: 'We accept credit/debit cards, bank transfers, and digital wallets like PayPal and Venmo.' },
      { q: 'Is my payment information secure?', a: 'Yes, all payments are processed through PCI-compliant payment gateways with bank-level encryption.' },
      { q: 'How do I request a refund?', a: 'Contact support with your transaction ID and reason. Refunds are processed according to our Refund Policy.' },
      { q: 'When will I receive my deposit back?', a: 'Deposits are typically returned within 14-30 days after move-out, minus any deductions for damages.' }
    ],
    safety: [
      { q: 'How are providers verified?', a: 'We verify identity documents, phone numbers, and email addresses. Verified providers have a blue checkmark.' },
      { q: 'What should I do in case of emergency?', a: 'Call local emergency services (911). For platform-related emergencies, use our 24/7 Safety Hotline.' },
      { q: 'How do I report suspicious activity?', a: 'Click "Report" on any listing or profile, or email safety@roommatefinder.com with details and screenshots.' },
      { q: 'What information should I never share?', a: 'Never share your social security number, bank account details, or passwords. Legitimate providers won\'t ask for these.' }
    ]
  };

  // Support Options
  const supportTiers = [
    {
      tier: 'Self-Service',
      icon: Book,
      method: 'Search + Articles',
      responseTime: 'Instant',
      bestFor: 'Common questions',
      color: 'success',
      action: () => document.getElementById('search-bar')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      tier: 'Community',
      icon: Users,
      method: 'Discussion forums',
      responseTime: 'Within hours',
      bestFor: 'Tips, advice, experiences',
      color: 'info',
      action: () => window.open('/community', '_blank')
    },
    {
      tier: 'Live Support',
      icon: Mail,
      method: 'Email/Contact form',
      responseTime: '24-48 hours',
      bestFor: 'Account issues, disputes',
      color: 'primary',
      action: () => setShowContactForm(true)
    },
    {
      tier: 'Urgent',
      icon: Phone,
      method: 'Emergency reporting',
      responseTime: '4-8 hours',
      bestFor: 'Safety, harassment, fraud',
      color: 'error',
      action: () => setShowContactForm(true)
    }
  ];

  // Resources
  const resources = [
    {
      category: 'Templates',
      items: [
        { name: 'Cover Letter Template', icon: FileText, format: 'DOCX' },
        { name: 'Rental Application Checklist', icon: CheckCircle2, format: 'PDF' },
        { name: 'Move-in Inspection Form', icon: Eye, format: 'PDF' }
      ]
    },
    {
      category: 'Guides',
      items: [
        { name: 'First-Time Renter Guide', icon: Book, format: 'PDF' },
        { name: 'Landlord Best Practices', icon: Home, format: 'PDF' },
        { name: 'Roommate Agreement Template', icon: FileText, format: 'DOCX' }
      ]
    },
    {
      category: 'Checklists',
      items: [
        { name: 'Moving-in Checklist', icon: CheckCircle, format: 'PDF' },
        { name: 'Room Inspection Guide', icon: Eye, format: 'PDF' },
        { name: 'Safety & Security Checklist', icon: Shield, format: 'PDF' }
      ]
    }
  ];

  // System Status
  const systemStatus = {
    status: 'operational', // 'operational', 'degraded', 'down'
    services: [
      { name: 'Website', status: 'operational' },
      { name: 'Mobile App', status: 'operational' },
      { name: 'Messaging', status: 'operational' },
      { name: 'Payments', status: 'operational' },
      { name: 'Search', status: 'operational' }
    ],
    uptime: '99.97%',
    lastIncident: '14 days ago'
  };

  // Success Stories
  const successStories = [
    {
      id: 1,
      quote: 'We found our roommate in 3 days!',
      author: 'Sarah & Emma',
      role: 'Seekers',
      rating: 5,
      story: 'The matching algorithm was spot-on. We were looking for someone who shared our love for cooking and late-night movie marathons. Found the perfect match!'
    },
    {
      id: 2,
      quote: 'Renting rooms has never been easier',
      author: 'Michael Chen',
      role: 'Provider',
      rating: 5,
      story: 'As a landlord with 4 properties, this platform streamlined everything. The analytics help me optimize my listings, and I love the automated screening.'
    },
    {
      id: 3,
      quote: 'The virtual viewing feature saved me so much time',
      author: 'Jessica Martinez',
      role: 'Seeker',
      rating: 5,
      story: 'I was relocating from out of state and couldn\'t visit in person. Virtual viewings let me see 10 places in one afternoon. Found my dream room!'
    }
  ];

  // Filtered categories based on active filter
  const filteredCategories = useMemo(() => {
    if (activeCategory === 'all') {
      return [...categories.seekers, ...categories.providers, ...categories.everyone];
    }
    return categories[activeCategory] || [];
  }, [activeCategory]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    const results = {
      categories: [],
      faqs: [],
      guides: []
    };

    // Search categories
    Object.values(categories).flat().forEach(cat => {
      if (cat.title.toLowerCase().includes(query) || cat.description.toLowerCase().includes(query)) {
        results.categories.push(cat);
      }
    });

    // Search FAQs
    popularFAQs.forEach(faq => {
      if (faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)) {
        results.faqs.push(faq);
      }
    });

    // Search Guides
    quickGuides.forEach(guide => {
      if (guide.title.toLowerCase().includes(query)) {
        results.guides.push(guide);
      }
    });

    return results;
  }, [searchQuery]);

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert('Support request submitted! We\'ll get back to you within 24-48 hours.');
    setShowContactForm(false);
    setContactForm({ name: '', email: '', category: '', subject: '', message: '', priority: 'normal' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColor = (color) => {
    const colors = {
      primary: 'from-primary/20 to-primary/5 border-primary/30',
      secondary: 'from-secondary/20 to-secondary/5 border-secondary/30',
      accent: 'from-accent/20 to-accent/5 border-accent/30',
      info: 'from-info/20 to-info/5 border-info/30',
      success: 'from-success/20 to-success/5 border-success/30',
      warning: 'from-warning/20 to-warning/5 border-warning/30',
      error: 'from-error/20 to-error/5 border-error/30'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Hero Section */}
      <HeroSection props={{ searchQuery, setSearchQuery, setShowContactForm }}></HeroSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Results */}
        {searchResults && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Search className="w-6 h-6 text-primary" />
                Search Results for "{searchQuery}"
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-ghost btn-sm gap-2"
              >
                <X className="w-4 h-4" />
                Clear Search
              </button>
            </div>

            {searchResults.categories.length === 0 && searchResults.faqs.length === 0 && searchResults.guides.length === 0 ? (
              <div className="card bg-base-100 shadow-xl border border-section-border">
                <div className="card-body text-center py-16">
                  <Search className="w-16 h-16 text-text-muted mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">No results found</h3>
                  <p className="text-text-muted">Try different keywords or browse categories below</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Category Results */}
                {searchResults.categories.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-4">Categories ({searchResults.categories.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.categories.map(cat => {
                        const Icon = cat.icon;
                        return (
                          <div
                            key={cat.id}
                            className={`card bg-gradient-to-br ${getCategoryColor(cat.color)} border-2 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                          >
                            <div className="card-body p-5">
                              <Icon className={`w-8 h-8 text-${cat.color} mb-2`} />
                              <h4 className="font-bold text-base-content">{cat.title}</h4>
                              <p className="text-sm text-text-muted">{cat.description}</p>
                              <div className="badge badge-sm badge-ghost mt-2">{cat.articles} articles</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* FAQ Results */}
                {searchResults.faqs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-4">FAQs ({searchResults.faqs.length})</h3>
                    <div className="space-y-3">
                      {searchResults.faqs.map(faq => (
                        <div
                          key={faq.id}
                          className="card bg-base-100 shadow-md border border-section-border hover:shadow-lg transition-all"
                        >
                          <div className="card-body p-5">
                            <h4 className="font-bold text-base-content">{faq.question}</h4>
                            <p className="text-sm text-text-muted">{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Category Filters */}
        {!searchQuery && (
          <>
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`btn ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline'} gap-2`}
              >
                <Grid3x3 className="w-4 h-4" />
                All Categories
              </button>
              <button
                onClick={() => setActiveCategory('seekers')}
                className={`btn ${activeCategory === 'seekers' ? 'btn-primary' : 'btn-outline'} gap-2`}
              >
                <Search className="w-4 h-4" />
                For Seekers
              </button>
              <button
                onClick={() => setActiveCategory('providers')}
                className={`btn ${activeCategory === 'providers' ? 'btn-primary' : 'btn-outline'} gap-2`}
              >
                <Home className="w-4 h-4" />
                For Providers
              </button>
              <button
                onClick={() => setActiveCategory('everyone')}
                className={`btn ${activeCategory === 'everyone' ? 'btn-primary' : 'btn-outline'} gap-2`}
              >
                <Users className="w-4 h-4" />
                For Everyone
              </button>
            </div>

            {/* Help Categories Grid */}

            <HelpCategoriesGrid props={{ filteredCategories, getCategoryColor }}></HelpCategoriesGrid>

            {/* Popular FAQs */}
            <PopularFAQs props={{ popularFAQs, setExpandedFAQ, expandedFAQ }}></PopularFAQs>

            {/* Quick Guides */}
            <section id="quick-guides" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Step-by-Step Guides</h2>
                <p className="text-text-muted">Visual tutorials to get you started</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {quickGuides.map((guide) => {
                  const Icon = guide.icon;
                  return (
                    <div
                      key={guide.id}
                      className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-xl"
                    >
                      <div className="card-body">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-base-content">{guide.title}</h3>
                            <span className="badge badge-sm badge-primary">
                              For {guide.audience === 'both' ? 'Everyone' : guide.audience}
                            </span>
                          </div>
                        </div>

                        <div
                          className="cursor-pointer"
                          onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                        >
                          <div className="flex items-center justify-between py-2 px-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                            <span className="font-semibold text-sm">
                              {guide.steps.length} Steps
                            </span>
                            {expandedGuide === guide.id ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>

                        {expandedGuide === guide.id && (
                          <div className="mt-4 space-y-3">
                            {guide.steps.map((step, idx) => (
                              <div key={idx} className="flex gap-4">
                                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-primary">
                                  {idx + 1}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-base-content">{step.title}</h4>
                                  <p className="text-sm text-text-muted">{step.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Contact & Support Options */}
            <section id="support" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Get Support</h2>
                <p className="text-text-muted">Choose the best way to reach us</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportTiers.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <div
                      key={tier.tier}
                      className={`card bg-gradient-to-br from-${tier.color}/10 to-${tier.color}/5 border-2 border-${tier.color}/30 shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                      onClick={tier.action}
                    >
                      <div className="card-body items-center text-center">
                        <div className={`w-16 h-16 bg-${tier.color}/20 rounded-full flex items-center justify-center mb-4`}>
                          <Icon className={`w-8 h-8 text-${tier.color}`} />
                        </div>
                        <h3 className="card-title text-lg mb-2">{tier.tier}</h3>
                        <div className="space-y-2 w-full">
                          <div className="text-sm">
                            <span className="font-semibold">Method:</span>
                            <p className="text-text-muted">{tier.method}</p>
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">Response:</span>
                            <p className="text-text-muted">{tier.responseTime}</p>
                          </div>
                          <div className="text-sm">
                            <span className="font-semibold">Best for:</span>
                            <p className="text-text-muted">{tier.bestFor}</p>
                          </div>
                        </div>
                        <button className={`btn btn-${tier.color} btn-sm mt-4 w-full`}>
                          Get Help
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* System Status */}
            <section id="system-status" className="mb-16">
              <div className="card bg-base-100 shadow-xl border border-section-border">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    Platform Status
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-4 h-4 rounded-full ${systemStatus.status === 'operational' ? 'bg-success' : 'bg-error'} animate-pulse`}></div>
                        <span className="text-lg font-bold">
                          {systemStatus.status === 'operational' ? 'All Systems Operational' : 'Service Issues Detected'}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {systemStatus.services.map((service, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                            <span className="font-medium">{service.name}</span>
                            <div className="flex items-center gap-2">
                              {service.status === 'operational' ? (
                                <>
                                  <CheckCircle2 className="w-5 h-5 text-success" />
                                  <span className="text-sm text-success">Operational</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-5 h-5 text-error" />
                                  <span className="text-sm text-error">Down</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="stats shadow w-full">
                        <div className="stat">
                          <div className="stat-title">Uptime (30 days)</div>
                          <div className="stat-value text-success">{systemStatus.uptime}</div>
                          <div className="stat-desc">Industry leading reliability</div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-info/10 border-l-4 border-info rounded-r-lg">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-info">Last Incident</p>
                            <p className="text-sm text-text-muted">{systemStatus.lastIncident}: Brief API slowdown (resolved in 12 minutes)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Resources */}
            <section id="resources" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Resources & Downloads</h2>
                <p className="text-text-muted">Templates, guides, and checklists to help you succeed</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((resource, idx) => (
                  <div key={idx} className="card bg-base-100 shadow-xl border border-section-border">
                    <div className="card-body">
                      <h3 className="card-title text-lg mb-4">{resource.category}</h3>
                      <div className="space-y-3">
                        {resource.items.map((item, itemIdx) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={itemIdx}
                              className="flex items-center justify-between p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-primary" />
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="badge badge-sm badge-ghost">{item.format}</span>
                                <Download className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Success Stories */}
            <section id="success-stories" className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Success Stories</h2>
                <p className="text-text-muted">See how others found their perfect match</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStories.map((story) => (
                  <div
                    key={story.id}
                    className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-xl"
                  >
                    <div className="card-body">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                        ))}
                      </div>
                      <p className="text-lg font-bold text-base-content mb-3 italic">
                        "{story.quote}"
                      </p>
                      <p className="text-sm text-text-muted mb-4">{story.story}</p>
                      <div className="flex items-center gap-3 pt-3 border-t border-section-border">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-10">
                            <span className="text-sm">{story.author.charAt(0)}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{story.author}</p>
                          <p className="text-xs text-text-muted">{story.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed FAQs by Topic */}
            <DetailedFAQs props={{ detailedFAQs }}></DetailedFAQs>
          </>
        )}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-2xl flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Contact Support
              </h3>
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={() => setShowContactForm(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="input input-bordered"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="input input-bordered"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={contactForm.category}
                    onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="account">Account Issues</option>
                    <option value="listing">Listing Problems</option>
                    <option value="application">Application Questions</option>
                    <option value="payment">Payment & Billing</option>
                    <option value="safety">Safety & Security</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Priority</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="Brief description of your issue"
                  className="input input-bordered"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Please provide details about your issue..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Attachments (optional)</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  multiple
                />
                <label className="label">
                  <span className="label-text-alt text-text-muted">
                    You can attach screenshots or relevant files
                  </span>
                </label>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary gap-2">
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setShowContactForm(false)}></div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="btn btn-primary btn-circle fixed bottom-8 right-8 shadow-2xl z-50 animate-bounce"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default HelpCenter;
