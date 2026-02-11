import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Calendar,
  MapPin,
  Home,
  Users,
  Bed,
  Bath,
  Zap,
  Car,
  Wifi,
  Dog,
  Utensils,
  Wind,
  Building,
  Moon,
  Sun,
  Sparkles,
  Heart,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Target,
  Filter,
  Save,
  RotateCcw,
  Download,
  Eye,
  Bell,
  Mail,
  Clock,
  Coffee,
  Music,
  Volume2,
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Shield,
  Map,
  Navigation,
  Search,
  Sliders,
  Info
} from 'lucide-react';
import { LocationSection, RoomApartmentSection, RoommateSection } from './components/PreferenceSections1';
import { LifestyleSection, MatchingSettingsSection } from './components/PreferenceSections2';

// Mock preferences data
const mockPreferences = {
  budget: {
    min: 800,
    max: 1500,
    utilitiesIncluded: true
  },
  timeline: {
    moveInDate: '2026-04-01',
    flexibility: 'within_2_weeks'
  },
  location: {
    areas: ['Mission District', 'SOMA', 'Castro'],
    maxCommute: 30,
    areaType: 'vibrant_downtown'
  },
  room: {
    type: 'private',
    bathroom: 'private',
    furnished: 'furnished'
  },
  amenities: {
    parking: 'must_have',
    laundry: 'must_have',
    kitchen: 'must_have',
    ac: 'nice_to_have',
    elevator: 'dont_care',
    petFriendly: 'nice_to_have',
    utilitiesIncluded: 'must_have'
  },
  roommate: {
    gender: 'no_preference',
    ageRange: [25, 35],
    occupation: 'professional',
    relationshipStatus: 'no_preference'
  },
  lifestyle: {
    sleepSchedule: 'early_riser',
    cleanliness: 'very_tidy',
    socialStyle: 'balanced',
    guestPolicy: 'moderate',
    noiseTolerance: 'quiet'
  },
  values: {
    nonSmoking: true,
    alcoholFree: false,
    vegetarian: false,
    lgbtqFriendly: true,
    wfhFriendly: true,
    studyFocused: false
  },
  matching: {
    threshold: 80,
    dealBreakers: ['smoking', 'pets'],
    instantAlerts: true,
    dailyDigest: true,
    weeklyRoundup: false
  },
  listing: {
    minPhotos: 3,
    verifiedOnly: true,
    minRating: 4
  },
  household: {
    size: '1_roommate',
    currentOccupants: 'no_preference'
  }
};

const Preferences = () => {
  const [preferences, setPreferences] = useState(mockPreferences);
  const [completeness, setCompleteness] = useState(85);
  const [matchingListings, setMatchingListings] = useState(47);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('budget');

  const updatePreference = (section, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const savePreferences = () => {
    console.log('Saving preferences:', preferences);
    setHasChanges(false);
    // Show success toast
  };

  const resetToDefaults = () => {
    setPreferences(mockPreferences);
    setHasChanges(false);
  };

  const sections = [
    { id: 'budget', label: 'Budget & Timeline', icon: DollarSign },
    { id: 'location', label: 'Location & Area', icon: MapPin },
    { id: 'room', label: 'Room & Apartment', icon: Home },
    { id: 'roommate', label: 'Ideal Roommate', icon: Users },
    { id: 'lifestyle', label: 'Lifestyle & Habits', icon: Heart },
    { id: 'matching', label: 'Matching Settings', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-base-100)]">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Geometric Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Title */}
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
                My Roommate Preferences
              </h1>
              <p className="text-[var(--color-primary-content)] text-lg opacity-90 mb-6">
                Customize your search to find the perfect match
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-2xl font-bold text-white">{completeness}%</div>
                      <div className="text-xs text-[var(--color-primary-content)] opacity-90">Complete</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-2xl font-bold text-white">{matchingListings}</div>
                      <div className="text-xs text-[var(--color-primary-content)] opacity-90">Matches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.location.href = '/listings?matched=true'}
                className="btn btn-lg bg-white text-[var(--color-primary)] hover:bg-[var(--color-base-200)] border-none shadow-xl gap-2"
              >
                <Eye className="w-5 h-5" />
                See Matching Listings
              </button>

              {hasChanges && (
                <button
                  onClick={savePreferences}
                  className="btn btn-lg btn-success gap-2 animate-pulse"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-8 bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[var(--color-base-content)]">
              Profile Completeness
            </span>
            <span className="text-lg font-bold text-[var(--color-primary)]">{completeness}%</span>
          </div>
          <div className="w-full bg-[var(--color-base-200)] dark:bg-[var(--color-base-300)] rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-success)] h-full rounded-full transition-all duration-700"
              style={{ width: `${completeness}%` }}
            ></div>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">
            {completeness < 100 && "Complete all sections to see better matches!"}
            {completeness === 100 && "🎉 Your preferences are complete! You'll get the best matches."}
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                const element = document.getElementById(section.id);
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveSection(section.id);
              }}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${activeSection === section.id
                  ? 'bg-[var(--color-primary)] text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-[var(--color-base-200)] text-[var(--color-base-content)] hover:bg-[var(--color-primary)]/10 border border-[var(--color-section-border)]'
                }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Preference Sections */}
        <div className="space-y-8">
          {/* 1. Budget & Timeline */}
          <section id="budget" className="scroll-mt-4">
            <BudgetTimelineSection
              preferences={preferences}
              updatePreference={updatePreference}
            />
          </section>

          {/* 2. Location & Area */}
          <section id="location" className="scroll-mt-4">
            <LocationSection
              preferences={preferences}
              updatePreference={updatePreference}
            />
          </section>

          {/* 3. Room & Apartment */}
          <section id="room" className="scroll-mt-4">
            <RoomApartmentSection
              preferences={preferences}
              updatePreference={updatePreference}
            />
          </section>

          {/* 4. Ideal Roommate */}
          <section id="roommate" className="scroll-mt-4">
            <RoommateSection
              preferences={preferences}
              updatePreference={updatePreference}
            />
          </section>

          {/* 5. Lifestyle & Habits */}
          <section id="lifestyle" className="scroll-mt-4">
            <LifestyleSection
              preferences={preferences}
              updatePreference={updatePreference}
            />
          </section>

          {/* 6. Matching Settings */}
          <section id="matching" className="scroll-mt-4">
            <MatchingSettingsSection
              preferences={preferences}
              updatePreference={updatePreference}
            />
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <button
            onClick={savePreferences}
            className="btn btn-primary btn-lg gap-2"
          >
            <Save className="w-5 h-5" />
            Save & Continue
          </button>

          <button
            onClick={() => window.location.href = '/listings?matched=true'}
            className="btn btn-secondary btn-lg gap-2"
          >
            <Search className="w-5 h-5" />
            Browse Matches
          </button>

          <button
            onClick={resetToDefaults}
            className="btn btn-outline btn-lg gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Floating Save Button */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <button
            onClick={savePreferences}
            className="btn btn-success btn-lg shadow-2xl gap-2 animate-pulse"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

// Budget & Timeline Section
const BudgetTimelineSection = ({ preferences, updatePreference }) => {
  return (
    <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[var(--color-primary)]/10 p-3 rounded-xl">
          <DollarSign className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-base-content)]">Budget & Timeline</h2>
          <p className="text-[var(--color-text-muted)]">Set your budget and move-in timeline</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Budget Range */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-lg">Monthly Budget Range</span>
          </label>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">
                <span className="label-text">Minimum</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  type="number"
                  value={preferences.budget.min}
                  onChange={(e) => updatePreference('budget', 'min', parseInt(e.target.value))}
                  className="input input-bordered w-full pl-10 text-lg font-semibold"
                  min="0"
                  step="50"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Maximum</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  type="number"
                  value={preferences.budget.max}
                  onChange={(e) => updatePreference('budget', 'max', parseInt(e.target.value))}
                  className="input input-bordered w-full pl-10 text-lg font-semibold"
                  min="0"
                  step="50"
                />
              </div>
            </div>
          </div>

          {/* Range Visualization */}
          <div className="relative h-2 bg-[var(--color-base-200)] rounded-full">
            <div
              className="absolute h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
              style={{
                left: `${(preferences.budget.min / 3000) * 100}%`,
                width: `${((preferences.budget.max - preferences.budget.min) / 3000) * 100}%`
              }}
            ></div>
          </div>

          <div className="flex justify-between text-sm text-[var(--color-text-muted)] mt-2">
            <span>$0</span>
            <span className="font-bold text-[var(--color-primary)]">
              ${preferences.budget.min} - ${preferences.budget.max}
            </span>
            <span>$3,000+</span>
          </div>

          <label className="flex items-center gap-3 mt-4 p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl cursor-pointer hover:shadow-md transition-shadow">
            <input
              type="checkbox"
              checked={preferences.budget.utilitiesIncluded}
              onChange={(e) => updatePreference('budget', 'utilitiesIncluded', e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <div>
              <span className="font-medium text-[var(--color-base-content)]">Utilities Included</span>
              <p className="text-sm text-[var(--color-text-muted)]">Prefer rent that includes utilities</p>
            </div>
          </label>
        </div>

        {/* Move-in Date */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg">Move-in Date</span>
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Preferred Date</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                  type="date"
                  value={preferences.timeline.moveInDate}
                  onChange={(e) => updatePreference('timeline', 'moveInDate', e.target.value)}
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Flexibility</span>
              </label>
              <select
                value={preferences.timeline.flexibility}
                onChange={(e) => updatePreference('timeline', 'flexibility', e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="exact">Exact Date</option>
                <option value="within_2_weeks">Within 2 Weeks</option>
                <option value="within_month">Within Month</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
