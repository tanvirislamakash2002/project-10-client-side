import React, { useState } from 'react';
import {
  User,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Heart,
  Home,
  DollarSign,
  Calendar,
  Shield,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  Edit,
  Download,
  Share2,
  Eye,
  Image,
  Video,
  Music,
  Coffee,
  Moon,
  Sun,
  Users,
  MessageSquare,
  ChevronRight,
  Upload,
  Settings,
  Award,
  TrendingUp,
  Camera,
  Film,
  Link2,
  ExternalLink,
  Dog,
  Cigarette,
  Wine,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';

// Import tab components
import { 
  LifestyleTab, 
  PreferencesTab, 
  ScheduleTab, 
  MediaTab, 
  ReferencesTab 
} from './components/ProfileTabs';

// Mock user data - replace with actual API data
const mockUserProfile = {
  _id: "user123",
  // Basic Info
  fullName: "Alex Thompson",
  preferredName: "Alex",
  location: "Downtown, San Francisco, CA",
  age: 27,
  memberSince: "2024-06-15",
  profilePhoto: "https://i.pravatar.cc/400?img=33",
  videoIntro: null,
  
  // Verification
  verifications: {
    email: true,
    phone: true,
    id: true,
    socialMedia: false
  },
  
  // Stats
  stats: {
    applicationsSubmitted: 12,
    responseRate: 85,
    avgRating: 4.7,
    profileCompleteness: 90
  },
  
  // About Me
  bio: "Hi! I'm a UX designer working remotely for a tech startup. I value a clean, peaceful living space and enjoy cooking, yoga, and weekend hikes. Looking for like-minded roommates who appreciate a balanced lifestyle.",
  
  occupation: {
    type: "professional", // professional, student, both
    title: "Senior UX Designer",
    company: "TechFlow Inc.",
    schedule: "remote"
  },
  
  // Lifestyle
  lifestyle: {
    personality: ["organized", "friendly", "quiet", "creative"],
    hobbies: ["cooking", "yoga", "hiking", "reading", "photography"],
    weekendActivities: "Morning yoga, farmers market visits, hiking trails, cooking new recipes",
    cleanliness: 9, // 1-10
    noiseTolerance: 6,
    social: 7,
    schedule: "early-bird" // early-bird, night-owl, flexible
  },
  
  // Schedule
  schedule: {
    wakeTime: "6:30 AM",
    bedTime: "10:30 PM",
    workFromHome: "full-time",
    cookingFrequency: "daily",
    gymSchedule: "morning, 3x/week"
  },
  
  // Roommate Preferences
  preferences: {
    roomType: "private",
    budgetMin: 800,
    budgetMax: 1500,
    preferredAreas: ["Mission District", "SOMA", "Castro"],
    moveInDate: "2026-04-01",
    leaseDuration: "12 months",
    householdType: ["professionals", "mixed"],
    genderPreference: "any",
    ageRange: [25, 35],
    maxRoommates: 3
  },
  
  // Must-haves & Deal-breakers
  mustHaves: {
    pets: "cat-friendly",
    petsOwned: [{ type: "cat", name: "Luna", age: 3 }],
    smoking: "non-smoking household",
    guests: "moderate - weekends ok",
    cleaning: "weekly shared schedule",
    sharedExpenses: "split equally"
  },
  
  // Smoking/Drinking
  habits: {
    smoking: "no",
    drinking: "socially",
    substances: "no"
  },
  
  // Social Preferences
  socialPreferences: {
    socializingLevel: 7, // 1-10
    roommateInteraction: "friendly but independent",
    guestPolicy: "advance notice appreciated",
    communicationStyle: "text/in-app preferred",
    conflictResolution: "direct but respectful",
    houseMeetings: "monthly"
  },
  
  // Financial
  financial: {
    employmentVerified: true,
    incomeVerified: false,
    budgetRange: [800, 1500],
    securityDepositReady: true
  },
  
  // Media
  photos: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=400"
  ],
  
  // References
  references: [
    {
      name: "Sarah Martinez",
      type: "Previous Roommate",
      rating: 5,
      comment: "Alex was an amazing roommate - clean, respectful, and easy to communicate with!"
    },
    {
      name: "John Davis",
      type: "Colleague",
      rating: 5,
      comment: "Reliable and professional. Great person to live with."
    }
  ],
  
  // Social Links
  socialLinks: {
    linkedin: "https://linkedin.com/in/alexthompson",
    instagram: null
  }
};

const SeekerProfile = () => {
  const [profile, setProfile] = useState(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const completionPercentage = profile.stats.profileCompleteness;

  const getVerificationCount = () => {
    return Object.values(profile.verifications).filter(Boolean).length;
  };

  return (
    <div className="min-h-screen bg-[var(--color-base-100)]">
      {/* Hero Header with Cover Pattern */}
      <div className="relative h-72 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Geometric Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3 z-10">
          <button className="btn btn-sm bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button className="btn btn-sm bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="btn btn-sm bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Profile Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-16">
        {/* Main Profile Card */}
        <div className="bg-white dark:bg-[var(--color-base-200)] rounded-3xl shadow-2xl border border-[var(--color-section-border)] overflow-hidden">
          
          {/* Profile Header Section */}
          <div className="p-8 border-b border-[var(--color-section-border)]">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Profile Photo/Video */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-[var(--color-base-300)] shadow-xl">
                  <img 
                    src={profile.profilePhoto} 
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer">
                  <div className="text-center text-white">
                    <Camera className="w-8 h-8 mx-auto mb-1" />
                    <div className="text-xs">Update Photo</div>
                  </div>
                </div>
                
                {/* Verification Badge */}
                {getVerificationCount() > 0 && (
                  <div className="absolute -bottom-2 -right-2 bg-[var(--color-verified-badge)] text-[var(--color-verified-badge-content)] rounded-full p-2 shadow-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h1 className="text-4xl font-bold text-[var(--color-base-content)] mb-1">
                        {profile.fullName}
                      </h1>
                      {profile.preferredName && profile.preferredName !== profile.fullName && (
                        <p className="text-lg text-[var(--color-text-muted)]">
                          "{profile.preferredName}"
                        </p>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn btn-primary gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>

                  {/* Location & Age */}
                  <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-muted)] mb-3">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </span>
                    {profile.age && (
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {profile.age} years old
                      </span>
                    )}
                  </div>

                  {/* Verification Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.verifications.email && (
                      <span className="px-3 py-1 bg-[var(--color-verified-badge)]/10 text-[var(--color-verified-badge)] rounded-lg text-sm font-medium flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Email Verified
                      </span>
                    )}
                    {profile.verifications.phone && (
                      <span className="px-3 py-1 bg-[var(--color-verified-badge)]/10 text-[var(--color-verified-badge)] rounded-lg text-sm font-medium flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Phone Verified
                      </span>
                    )}
                    {profile.verifications.id && (
                      <span className="px-3 py-1 bg-[var(--color-verified-badge)]/10 text-[var(--color-verified-badge)] rounded-lg text-sm font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        ID Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 p-4 rounded-xl border border-[var(--color-primary)]/20">
                    <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">
                      {new Date(profile.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">Member Since</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-secondary)]/5 p-4 rounded-xl border border-[var(--color-secondary)]/20">
                    <div className="text-2xl font-bold text-[var(--color-secondary)] mb-1">
                      {profile.stats.applicationsSubmitted}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">Applications</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 p-4 rounded-xl border border-[var(--color-accent)]/20">
                    <div className="text-2xl font-bold text-[var(--color-accent-content)] mb-1">
                      {profile.stats.responseRate}%
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">Response Rate</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[var(--color-warning)]/10 to-[var(--color-warning)]/5 p-4 rounded-xl border border-[var(--color-warning)]/20">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 text-[var(--color-warning)] fill-current" />
                      <span className="text-2xl font-bold text-[var(--color-warning)]">
                        {profile.stats.avgRating}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">Avg Rating</div>
                  </div>
                </div>

                {/* Profile Completeness */}
                <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--color-base-content)]">
                      Profile Completeness
                    </span>
                    <span className="text-sm font-bold text-[var(--color-primary)]">
                      {completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-[var(--color-base-200)] dark:bg-[var(--color-base-100)] rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] h-full rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                  {completionPercentage < 100 && (
                    <p className="text-xs text-[var(--color-text-muted)] mt-2">
                      Complete your profile to increase your chances of finding the perfect roommate!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-[var(--color-section-border)] overflow-x-auto">
            <div className="flex gap-1 px-8 min-w-max">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'lifestyle', label: 'Lifestyle', icon: Heart },
                { id: 'preferences', label: 'Preferences', icon: Target },
                { id: 'schedule', label: 'Schedule', icon: Clock },
                { id: 'media', label: 'Media', icon: Image },
                { id: 'references', label: 'References', icon: Award }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-base-content)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && <OverviewTab profile={profile} />}
            {activeTab === 'lifestyle' && <LifestyleTab profile={profile} />}
            {activeTab === 'preferences' && <PreferencesTab profile={profile} />}
            {activeTab === 'schedule' && <ScheduleTab profile={profile} />}
            {activeTab === 'media' && <MediaTab profile={profile} />}
            {activeTab === 'references' && <ReferencesTab profile={profile} />}
          </div>
        </div>

        {/* Side Actions Panel */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <button className="bg-white dark:bg-[var(--color-base-200)] p-6 rounded-2xl shadow-lg border border-[var(--color-section-border)] hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-4">
            <div className="bg-[var(--color-primary)]/10 p-4 rounded-xl">
              <Settings className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-[var(--color-base-content)]">Privacy Settings</div>
              <div className="text-sm text-[var(--color-text-muted)]">Control what others see</div>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>

          <button className="bg-white dark:bg-[var(--color-base-200)] p-6 rounded-2xl shadow-lg border border-[var(--color-section-border)] hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-4">
            <div className="bg-[var(--color-secondary)]/10 p-4 rounded-xl">
              <TrendingUp className="w-6 h-6 text-[var(--color-secondary)]" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-[var(--color-base-content)]">Compatibility Score</div>
              <div className="text-sm text-[var(--color-text-muted)]">See your matches</div>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>

          <button className="bg-white dark:bg-[var(--color-base-200)] p-6 rounded-2xl shadow-lg border border-[var(--color-section-border)] hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-4">
            <div className="bg-[var(--color-accent)]/10 p-4 rounded-xl">
              <Zap className="w-6 h-6 text-[var(--color-accent-content)]" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-[var(--color-base-content)]">Quick Apply</div>
              <div className="text-sm text-[var(--color-text-muted)]">Save application templates</div>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ profile }) => (
  <div className="space-y-8">
    {/* About Me Section */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
        <User className="w-6 h-6 text-[var(--color-primary)]" />
        About Me
      </h2>
      <p className="text-[var(--color-base-content)] leading-relaxed bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl border-l-4 border-[var(--color-primary)]">
        {profile.bio}
      </p>
    </section>

    {/* Occupation */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-[var(--color-primary)]" />
        Occupation
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <div className="text-sm text-[var(--color-text-muted)] mb-1">Job Title</div>
          <div className="text-lg font-semibold text-[var(--color-base-content)]">
            {profile.occupation.title}
          </div>
        </div>
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <div className="text-sm text-[var(--color-text-muted)] mb-1">Company</div>
          <div className="text-lg font-semibold text-[var(--color-base-content)]">
            {profile.occupation.company}
          </div>
        </div>
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <div className="text-sm text-[var(--color-text-muted)] mb-1">Work Schedule</div>
          <div className="text-lg font-semibold text-[var(--color-base-content)] capitalize">
            {profile.occupation.schedule}
          </div>
        </div>
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <div className="text-sm text-[var(--color-text-muted)] mb-1">Type</div>
          <div className="text-lg font-semibold text-[var(--color-base-content)] capitalize">
            {profile.occupation.type}
          </div>
        </div>
      </div>
    </section>

    {/* Personality & Hobbies */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-[var(--color-primary)]" />
        Personality & Interests
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] mb-3">Personality Traits</h3>
          <div className="flex flex-wrap gap-2">
            {profile.lifestyle.personality.map((trait, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 text-[var(--color-primary)] rounded-full font-medium text-sm border border-[var(--color-primary)]/20"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] mb-3">Hobbies & Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile.lifestyle.hobbies.map((hobby, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 bg-[var(--color-accent)]/10 text-[var(--color-accent-content)] rounded-full font-medium text-sm border border-[var(--color-accent)]/20"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <h3 className="text-sm font-semibold text-[var(--color-text-muted)] mb-2">Typical Weekend</h3>
          <p className="text-[var(--color-base-content)]">{profile.lifestyle.weekendActivities}</p>
        </div>
      </div>
    </section>

    {/* Living Preferences Tag Cloud */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
        <Home className="w-6 h-6 text-[var(--color-primary)]" />
        Living Style
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--color-base-content)]">Cleanliness</span>
            <span className="text-lg font-bold text-[var(--color-primary)]">{profile.lifestyle.cleanliness}/10</span>
          </div>
          <div className="w-full bg-[var(--color-base-200)] rounded-full h-2">
            <div 
              className="bg-[var(--color-primary)] h-2 rounded-full"
              style={{ width: `${profile.lifestyle.cleanliness * 10}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-secondary)]/5 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--color-base-content)]">Noise Tolerance</span>
            <span className="text-lg font-bold text-[var(--color-secondary)]">{profile.lifestyle.noiseTolerance}/10</span>
          </div>
          <div className="w-full bg-[var(--color-base-200)] rounded-full h-2">
            <div 
              className="bg-[var(--color-secondary)] h-2 rounded-full"
              style={{ width: `${profile.lifestyle.noiseTolerance * 10}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--color-base-content)]">Social Level</span>
            <span className="text-lg font-bold text-[var(--color-accent-content)]">{profile.lifestyle.social}/10</span>
          </div>
          <div className="w-full bg-[var(--color-base-200)] rounded-full h-2">
            <div 
              className="bg-[var(--color-accent)] h-2 rounded-full"
              style={{ width: `${profile.lifestyle.social * 10}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-warning)]/5 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--color-base-content)]">Schedule Type</span>
            <div className="flex items-center gap-2">
              {profile.lifestyle.schedule === 'early-bird' ? (
                <>
                  <Sun className="w-5 h-5 text-[var(--color-warning)]" />
                  <span className="font-bold text-[var(--color-warning)]">Early Bird</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-[var(--color-info)]" />
                  <span className="font-bold text-[var(--color-info)]">Night Owl</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default SeekerProfile;