import React from 'react';
import {
  Heart,
  Moon,
  Sun,
  Sparkles,
  Music,
  Volume2,
  VolumeX,
  Coffee,
  Users,
  Target,
  Bell,
  Mail,
  Filter,
  Star,
  Shield,
  Award,
  CheckCircle,
  TrendingUp,
  Sliders,
  Zap,
  AlertCircle
} from 'lucide-react';

// Lifestyle & Habits Section
export const LifestyleSection = ({ preferences, updatePreference }) => {
  const getImportanceColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-[var(--color-error)] text-white';
      case 'medium':
        return 'bg-[var(--color-warning)] text-[var(--color-warning-content)]';
      case 'low':
        return 'bg-[var(--color-info)] text-white';
      default:
        return 'bg-[var(--color-base-200)]';
    }
  };

  return (
    <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[var(--color-success)]/10 p-3 rounded-xl">
          <Heart className="w-6 h-6 text-[var(--color-success)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-base-content)]">Lifestyle & Habits</h2>
          <p className="text-[var(--color-text-muted)]">Match importance: How critical is each factor?</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sleep Schedule */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-lg flex items-center gap-2">
              <Moon className="w-5 h-5 text-[var(--color-info)]" />
              Sleep Schedule
            </span>
          </label>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              { value: 'early_riser', label: 'Early Riser', subtitle: '6-8 AM', icon: Sun },
              { value: 'night_owl', label: 'Night Owl', subtitle: 'After 11 PM', icon: Moon },
              { value: 'flexible', label: 'Flexible', subtitle: 'No preference', icon: Sparkles }
            ].map(option => (
              <label 
                key={option.value}
                className={`flex flex-col items-center p-6 rounded-xl cursor-pointer transition-all border-2 ${
                  preferences.lifestyle.sleepSchedule === option.value
                    ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] shadow-md'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] border-transparent hover:border-[var(--color-primary)]/30'
                }`}
              >
                <option.icon className={`w-8 h-8 mb-2 ${
                  preferences.lifestyle.sleepSchedule === option.value
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)]'
                }`} />
                <span className="font-semibold text-[var(--color-base-content)]">{option.label}</span>
                <span className="text-sm text-[var(--color-text-muted)] mt-1">{option.subtitle}</span>
                <input
                  type="radio"
                  name="sleepSchedule"
                  value={option.value}
                  checked={preferences.lifestyle.sleepSchedule === option.value}
                  onChange={(e) => updatePreference('lifestyle', 'sleepSchedule', e.target.value)}
                  className="radio radio-primary radio-sm mt-2"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Cleanliness Level */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--color-success)]" />
              Cleanliness Level
            </span>
          </label>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              { value: 'very_tidy', label: 'Very Tidy', subtitle: 'Everything organized' },
              { value: 'moderately_clean', label: 'Moderately Clean', subtitle: 'Regular cleaning' },
              { value: 'relaxed', label: 'Relaxed', subtitle: 'Comfortable with mess' }
            ].map(option => (
              <label 
                key={option.value}
                className={`flex flex-col p-5 rounded-xl cursor-pointer transition-all border-2 ${
                  preferences.lifestyle.cleanliness === option.value
                    ? 'bg-[var(--color-success)]/10 border-[var(--color-success)] shadow-md'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] border-transparent hover:border-[var(--color-success)]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[var(--color-base-content)]">{option.label}</span>
                  <input
                    type="radio"
                    name="cleanliness"
                    value={option.value}
                    checked={preferences.lifestyle.cleanliness === option.value}
                    onChange={(e) => updatePreference('lifestyle', 'cleanliness', e.target.value)}
                    className="radio radio-success radio-sm"
                  />
                </div>
                <span className="text-sm text-[var(--color-text-muted)]">{option.subtitle}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Social Style */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--color-secondary)]" />
              Social Style
            </span>
          </label>

          <div className="grid md:grid-cols-4 gap-3">
            {[
              { value: 'outgoing', label: 'Social & Outgoing' },
              { value: 'quiet', label: 'Quiet & Private' },
              { value: 'balanced', label: 'Balanced' },
              { value: 'dont_care', label: "Don't Care" }
            ].map(option => (
              <label 
                key={option.value}
                className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  preferences.lifestyle.socialStyle === option.value
                    ? 'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)] shadow-md'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] border-transparent hover:border-[var(--color-secondary)]/30'
                }`}
              >
                <span className="font-medium text-sm text-[var(--color-base-content)] text-center">
                  {option.label}
                </span>
                <input
                  type="radio"
                  name="socialStyle"
                  value={option.value}
                  checked={preferences.lifestyle.socialStyle === option.value}
                  onChange={(e) => updatePreference('lifestyle', 'socialStyle', e.target.value)}
                  className="radio radio-sm mt-2"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Guest Policy & Noise Tolerance */}
        <div className="pt-6 border-t border-[var(--color-section-border)] grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Guest Policy</span>
            </label>
            <select
              value={preferences.lifestyle.guestPolicy}
              onChange={(e) => updatePreference('lifestyle', 'guestPolicy', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="rarely">Rarely Have Guests</option>
              <option value="moderate">Moderate - Occasional Guests</option>
              <option value="frequent">Frequent Guests</option>
              <option value="overnight">Overnight Guests OK</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Noise Tolerance
              </span>
            </label>
            <select
              value={preferences.lifestyle.noiseTolerance}
              onChange={(e) => updatePreference('lifestyle', 'noiseTolerance', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="quiet">Prefers Quiet</option>
              <option value="moderate">Moderate Noise OK</option>
              <option value="tolerant">Don't Mind Noise</option>
            </select>
          </div>
        </div>

        {/* Shared Values */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg">Shared Values</span>
            <span className="label-text-alt">Check all that apply</span>
          </label>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              { key: 'nonSmoking', label: 'Non-smoking Household', icon: Shield },
              { key: 'alcoholFree', label: 'Alcohol-free Environment', icon: Coffee },
              { key: 'vegetarian', label: 'Vegetarian/Vegan Household', icon: Heart },
              { key: 'lgbtqFriendly', label: 'LGBTQ+ Friendly', icon: Heart },
              { key: 'wfhFriendly', label: 'Work-from-home Friendly', icon: Coffee },
              { key: 'studyFocused', label: 'Study-focused Environment', icon: Shield }
            ].map(value => (
              <label 
                key={value.key}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                  preferences.values[value.key]
                    ? 'bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] hover:bg-[var(--color-base-200)]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={preferences.values[value.key]}
                  onChange={(e) => updatePreference('values', value.key, e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                <value.icon className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="font-medium text-[var(--color-base-content)]">{value.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Matching Settings Section
export const MatchingSettingsSection = ({ preferences, updatePreference }) => {
  return (
    <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[var(--color-info)]/10 p-3 rounded-xl">
          <Target className="w-6 h-6 text-[var(--color-info)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-base-content)]">Search & Matching Settings</h2>
          <p className="text-[var(--color-text-muted)]">Fine-tune how we match you with listings</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Match Strictness */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-lg">Compatibility Threshold</span>
          </label>

          <div className="bg-gradient-to-r from-[var(--color-warning)]/10 via-[var(--color-info)]/10 to-[var(--color-success)]/10 p-6 rounded-xl border border-[var(--color-section-border)]">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-[var(--color-text-muted)]">Flexible</span>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={preferences.matching.threshold}
                onChange={(e) => updatePreference('matching', 'threshold', parseInt(e.target.value))}
                className="range range-primary flex-1"
              />
              <span className="text-sm text-[var(--color-text-muted)]">Strict</span>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent mb-2">
                {preferences.matching.threshold}% Match Required
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                {preferences.matching.threshold < 70 && "You'll see many options, some may not be perfect matches"}
                {preferences.matching.threshold >= 70 && preferences.matching.threshold < 85 && "Balanced - Good variety of compatible options"}
                {preferences.matching.threshold >= 85 && "Only highly compatible matches will be shown"}
              </p>
            </div>
          </div>
        </div>

        {/* Deal-breakers */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[var(--color-error)]" />
              Deal-breakers
            </span>
            <span className="label-text-alt">Select absolute requirements</span>
          </label>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'smoking',
              'pets',
              'cleanliness',
              'noise',
              'guests',
              'budget',
              'location',
              'roomType'
            ].map(dealbreaker => (
              <label 
                key={dealbreaker}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  preferences.matching.dealBreakers?.includes(dealbreaker)
                    ? 'bg-[var(--color-error)]/10 border-[var(--color-error)]'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] border-transparent hover:border-[var(--color-error)]/30'
                }`}
              >
                <input
                  type="checkbox"
                  checked={preferences.matching.dealBreakers?.includes(dealbreaker)}
                  onChange={(e) => {
                    const current = preferences.matching.dealBreakers || [];
                    const updated = e.target.checked
                      ? [...current, dealbreaker]
                      : current.filter(d => d !== dealbreaker);
                    updatePreference('matching', 'dealBreakers', updated);
                  }}
                  className="checkbox checkbox-error"
                />
                <span className="font-medium text-[var(--color-base-content)] capitalize">
                  {dealbreaker.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-[var(--color-primary)]" />
              Notification Preferences
            </span>
          </label>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[var(--color-warning)]" />
                <div>
                  <div className="font-medium text-[var(--color-base-content)]">Instant Alerts for 95%+ Matches</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Get notified immediately for perfect matches</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.matching.instantAlerts}
                onChange={(e) => updatePreference('matching', 'instantAlerts', e.target.checked)}
                className="toggle toggle-warning"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-info)]" />
                <div>
                  <div className="font-medium text-[var(--color-base-content)]">Daily Digest</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Daily summary of new matching listings</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.matching.dailyDigest}
                onChange={(e) => updatePreference('matching', 'dailyDigest', e.target.checked)}
                className="toggle toggle-info"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
                <div>
                  <div className="font-medium text-[var(--color-base-content)]">Weekly Roundup</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Best matches of the week</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.matching.weeklyRoundup}
                onChange={(e) => updatePreference('matching', 'weeklyRoundup', e.target.checked)}
                className="toggle toggle-success"
              />
            </label>
          </div>
        </div>

        {/* Listing Quality Filters */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg flex items-center gap-2">
              <Filter className="w-5 h-5 text-[var(--color-primary)]" />
              Listing Quality Filters
            </span>
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Minimum Photos Required</span>
              </label>
              <select
                value={preferences.listing.minPhotos}
                onChange={(e) => updatePreference('listing', 'minPhotos', parseInt(e.target.value))}
                className="select select-bordered w-full"
              >
                <option value="1">1+ photo</option>
                <option value="3">3+ photos</option>
                <option value="5">5+ photos</option>
                <option value="10">10+ photos</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Minimum Rating</span>
              </label>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[var(--color-warning)]" />
                <select
                  value={preferences.listing.minRating}
                  onChange={(e) => updatePreference('listing', 'minRating', parseInt(e.target.value))}
                  className="select select-bordered w-full"
                >
                  <option value="0">Any Rating</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars Only</option>
                </select>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-3 p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl mt-4 cursor-pointer hover:shadow-md transition-shadow">
            <input
              type="checkbox"
              checked={preferences.listing.verifiedOnly}
              onChange={(e) => updatePreference('listing', 'verifiedOnly', e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--color-verified-badge)]" />
              <span className="font-medium text-[var(--color-base-content)]">Verified Listings Only</span>
            </div>
          </label>
        </div>

        {/* Household Size */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg">Household Preferences</span>
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Total Housemates Preferred</span>
              </label>
              <select
                value={preferences.household.size}
                onChange={(e) => updatePreference('household', 'size', e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="1_roommate">Just 1 Roommate</option>
                <option value="2_3_people">2-3 People</option>
                <option value="4_plus">4+ People</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Current Occupants</span>
              </label>
              <select
                value={preferences.household.currentOccupants}
                onChange={(e) => updatePreference('household', 'currentOccupants', e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="empty">Empty Room</option>
                <option value="existing">Joining Existing Household</option>
                <option value="no_preference">No Preference</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  LifestyleSection,
  MatchingSettingsSection
};
