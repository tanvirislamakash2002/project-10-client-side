import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Eye,
  CreditCard,
  Settings,
  Search,
  ChevronRight,
  Camera,
  Save,
  AlertCircle,
  MessageSquare,
  HelpCircle,
  Accessibility,
  Filter
} from 'lucide-react';
// Import and export all section components
import {  SupportSection } from './components/SettingsSections3';
import useUser from '../../../../../hooks/useUser';
import { PreferencesSection } from './components/PreferencesSection';
import { PrivacySection } from './components/PrivacySection';
import { NotificationsSection } from './components/NotificationsSection';
import { SecuritySection } from './components/SecuritySection';
import { CommunicationSection } from './components/CommunicationSection';
import { SubscriptionSection } from './components/SubscriptionSection';
import { AccessibilitySection } from './components/AccessibilitySection';
import { AccountSection } from './components/AccountSection';
// Mock settings data
const mockSettings = {
  profile: {
    photo: 'https://i.pravatar.cc/150?img=33',
    fullName: 'Alex Thompson',
    bio: 'UX Designer looking for a roommate',
    age: 27,
    gender: 'prefer-not-to-say',
    occupation: 'UX Designer',
    email: 'alex.thompson@email.com',
    phone: '+1 (555) 123-4567',
    phoneVisible: false,
    socialLinks: {
      linkedin: '',
      instagram: ''
    }
  },
  preferences: {
    roommate: {
      genderPreference: 'any',
      ageRange: [25, 35],
      smokingOk: false,
      petsOk: true,
      lifestyleMatch: 'moderate'
    },
    housing: {
      budgetMin: 800,
      budgetMax: 1500,
      locations: ['Mission District', 'SOMA', 'Castro'],
      roomType: 'private',
      moveInDate: '2026-04-01',
      searchRadius: 10
    },
    amenities: {
      mustHave: ['WiFi', 'Laundry', 'Parking'],
      niceToHave: ['Gym', 'Pool', 'Balcony']
    }
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    activityStatus: 'active',
    viewableBy: {
      seekers: ['name', 'bio', 'preferences'],
      providers: ['name', 'bio', 'preferences', 'verifications']
    }
  },
  notifications: {
    email: {
      newListings: true,
      matches: true,
      messages: true,
      applicationUpdates: true,
      digest: 'daily'
    },
    push: {
      enabled: true,
      messages: true,
      matches: true,
      newListings: false
    },
    sms: {
      enabled: false,
      critical: false
    }
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: '2025-12-15',
    activeSessions: 2,
    loginHistory: [
      { device: 'Chrome on MacOS', location: 'San Francisco, CA', time: '2 hours ago' },
      { device: 'Mobile App on iPhone', location: 'San Francisco, CA', time: '1 day ago' }
    ]
  },
  communication: {
    messagePreferences: 'in-app',
    autoReply: false,
    autoReplyMessage: '',
    blockedUsers: [],
    preferredHours: {
      start: '09:00',
      end: '21:00'
    }
  },
  subscription: {
    plan: 'free',
    features: [],
    billingCycle: null,
    nextBilling: null,
    paymentMethod: null
  },
  accessibility: {
    theme: 'system',
    textSize: 'medium',
    reducedMotion: false,
    highContrast: false
  }
};

const SeekerSettings = () => {
  const [settings, setSettings] = useState(mockSettings);
  const [activeSection, setActiveSection] = useState('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);


  const updateSetting = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const updateNestedSetting = (section, subsection, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    // API call to save settings
    console.log('Saving settings:', settings);
    setHasUnsavedChanges(false);
    // Show success toast
  };

  const settingsSections = [
    { id: 'profile', label: 'Profile Management', icon: User },
    { id: 'preferences', label: 'Preferences & Filters', icon: Filter },
    { id: 'privacy', label: 'Privacy & Visibility', icon: Eye },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Account Security', icon: Shield },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'subscription', label: 'Subscription & Billing', icon: CreditCard },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'account', label: 'Account Management', icon: Settings },
    { id: 'support', label: 'Help & Support', icon: HelpCircle }
  ];

  const filteredSections = settingsSections.filter(section =>
    section.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-base-100)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Settings</h1>
              <p className="text-[var(--color-primary-content)] opacity-90">
                Manage your account and preferences
              </p>
            </div>

            {hasUnsavedChanges && (
              <button
                onClick={saveSettings}
                className="btn btn-lg bg-white text-[var(--color-primary)] hover:bg-[var(--color-base-200)] border-none shadow-xl gap-2"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-4 sticky top-4">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-sm input-bordered w-full pl-10 bg-[var(--color-base-100)]"
                />
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {filteredSections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeSection === section.id
                      ? 'bg-[var(--color-primary)] text-white shadow-md'
                      : 'hover:bg-[var(--color-base-100)] dark:hover:bg-[var(--color-base-300)] text-[var(--color-base-content)]'
                      }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="text-sm font-medium flex-1 text-left">{section.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-8">
              {activeSection === 'profile' && <ProfileSection settings={settings} updateSetting={updateSetting} updateNestedSetting={updateNestedSetting} />}
              {activeSection === 'preferences' && <PreferencesSection settings={settings} updateNestedSetting={updateNestedSetting} />}
              {activeSection === 'privacy' && <PrivacySection settings={settings} updateSetting={updateSetting} updateNestedSetting={updateNestedSetting} />}
              {activeSection === 'notifications' && <NotificationsSection settings={settings} updateNestedSetting={updateNestedSetting} />}
              {activeSection === 'security' && <SecuritySection settings={settings} />}
              {activeSection === 'communication' && <CommunicationSection settings={settings} updateNestedSetting={updateNestedSetting} />}
              {activeSection === 'subscription' && <SubscriptionSection settings={settings} />}
              {activeSection === 'accessibility' && <AccessibilitySection settings={settings} updateNestedSetting={updateNestedSetting} />}
              {activeSection === 'account' && <AccountSection />}
              {activeSection === 'support' && <SupportSection />}
            </div>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6 bg-[var(--color-warning)] text-[var(--color-warning-content)] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slideUp">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">You have unsaved changes</span>
          <button
            onClick={saveSettings}
            className="btn btn-sm bg-white/20 hover:bg-white/30 border-none ml-4"
          >
            Save Now
          </button>
        </div>
      )}
    </div>
  );
};

// Profile Management Section
const ProfileSection = ({ settings, updateSetting, updateNestedSetting }) => {
  const [photoPreview, setPhotoPreview] = useState(settings.profile.photo);
  const userInfo = useUser()
  const user = userInfo?.user;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        updateSetting('profile', 'photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Profile Management</h2>
        <p className="text-[var(--color-text-muted)]">Update your personal information and profile photo</p>
      </div>

      {/* Profile Photo */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Profile Photo</h3>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover ring-4 ring-[var(--color-primary)]/20"
            />
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <label className="btn btn-primary gap-2 cursor-pointer">
              <Camera className="w-4 h-4" />
              Upload New Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              JPG, PNG or GIF. Max size 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Personal Details</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              value={user?.name}
              onChange={(e) => updateSetting('profile', 'fullName', e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Age</span>
            </label>
            <input
              type="number"
              value={settings.profile.age}
              onChange={(e) => updateSetting('profile', 'age', parseInt(e.target.value))}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Gender</span>
            </label>
            <select
              value={settings.profile.gender}
              onChange={(e) => updateSetting('profile', 'gender', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Occupation</span>
            </label>
            <input
              type="text"
              value={settings.profile.occupation}
              onChange={(e) => updateSetting('profile', 'occupation', e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium">About Me</span>
          </label>
          <textarea
            value={settings.profile.bio}
            onChange={(e) => updateSetting('profile', 'bio', e.target.value)}
            className="textarea textarea-bordered w-full h-24"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Contact Information</h3>

        <div>
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={user?.email}
              onChange={(e) => updateSetting('profile', 'email', e.target.value)}
              className="input input-bordered flex-1"
            />
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={settings.profile.emailVisible}
                  onChange={(e) => updateSetting('profile', 'emailVisible', e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">Visible</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium">Phone</span>
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) => updateSetting('profile', 'phone', e.target.value)}
              className="input input-bordered flex-1"
            />
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={settings.profile.phoneVisible}
                  onChange={(e) => updateSetting('profile', 'phoneVisible', e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">Visible</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Social Media Links (Optional)</h3>

        <div>
          <label className="label">
            <span className="label-text font-medium">LinkedIn</span>
          </label>
          <input
            type="url"
            value={settings.profile.socialLinks.linkedin}
            onChange={(e) => updateNestedSetting('profile', 'socialLinks', 'linkedin', e.target.value)}
            className="input input-bordered w-full"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium">Instagram</span>
          </label>
          <input
            type="url"
            value={settings.profile.socialLinks.instagram}
            onChange={(e) => updateNestedSetting('profile', 'socialLinks', 'instagram', e.target.value)}
            className="input input-bordered w-full"
            placeholder="https://instagram.com/yourhandle"
          />
        </div>
      </div>
    </div>
  );
};

export default SeekerSettings;
