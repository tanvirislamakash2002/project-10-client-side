import React, { useState } from 'react';
import {
  Filter,
  MapPin,
  DollarSign,
  Home,
  Calendar,
  Users,
  Eye,
  EyeOff,
  Bell,
  Mail,
  Smartphone,
  Shield,
  Lock,
  Key,
  Monitor,
  MessageSquare,
  Clock,
  X,
  CreditCard,
  Download,
  Trash2,
  AlertCircle,
  Check,
  Moon,
  Sun,
  Palette,
  Accessibility,
  Volume2,
  HelpCircle,
  FileText,
  Send,
  Star,
  ChevronDown,
  ChevronUp,
  Plus,
  Zap
} from 'lucide-react';

// Preferences & Filters Section
export const PreferencesSection = ({ settings, updateNestedSetting }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Preferences & Filters</h2>
        <p className="text-[var(--color-text-muted)]">Set your roommate and housing preferences</p>
      </div>

      {/* Roommate Preferences */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--color-primary)]" />
          Roommate Preferences
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Gender Preference</span>
            </label>
            <select
              value={settings.preferences.roommate.genderPreference}
              onChange={(e) => updateNestedSetting('preferences', 'roommate', 'genderPreference', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Age Range</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={settings.preferences.roommate.ageRange[0]}
                onChange={(e) => updateNestedSetting('preferences', 'roommate', 'ageRange', [parseInt(e.target.value), settings.preferences.roommate.ageRange[1]])}
                className="input input-bordered w-20"
                min="18"
                max="99"
              />
              <span className="text-[var(--color-text-muted)]">to</span>
              <input
                type="number"
                value={settings.preferences.roommate.ageRange[1]}
                onChange={(e) => updateNestedSetting('preferences', 'roommate', 'ageRange', [settings.preferences.roommate.ageRange[0], parseInt(e.target.value)])}
                className="input input-bordered w-20"
                min="18"
                max="99"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg cursor-pointer hover:shadow-md transition-shadow">
            <span className="font-medium text-[var(--color-base-content)]">Smoking OK</span>
            <input 
              type="checkbox"
              checked={settings.preferences.roommate.smokingOk}
              onChange={(e) => updateNestedSetting('preferences', 'roommate', 'smokingOk', e.target.checked)}
              className="toggle toggle-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg cursor-pointer hover:shadow-md transition-shadow">
            <span className="font-medium text-[var(--color-base-content)]">Pets OK</span>
            <input 
              type="checkbox"
              checked={settings.preferences.roommate.petsOk}
              onChange={(e) => updateNestedSetting('preferences', 'roommate', 'petsOk', e.target.checked)}
              className="toggle toggle-primary"
            />
          </label>

          <div>
            <label className="label">
              <span className="label-text font-medium">Lifestyle Match</span>
            </label>
            <select
              value={settings.preferences.roommate.lifestyleMatch}
              onChange={(e) => updateNestedSetting('preferences', 'roommate', 'lifestyleMatch', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="strict">Strict Match</option>
              <option value="moderate">Moderate</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Housing Requirements */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-[var(--color-primary)]" />
          Housing Requirements
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Budget Range</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input
                  type="number"
                  value={settings.preferences.housing.budgetMin}
                  onChange={(e) => updateNestedSetting('preferences', 'housing', 'budgetMin', parseInt(e.target.value))}
                  className="input input-bordered w-full pl-9"
                  placeholder="Min"
                />
              </div>
              <span className="text-[var(--color-text-muted)]">to</span>
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                <input
                  type="number"
                  value={settings.preferences.housing.budgetMax}
                  onChange={(e) => updateNestedSetting('preferences', 'housing', 'budgetMax', parseInt(e.target.value))}
                  className="input input-bordered w-full pl-9"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Room Type</span>
            </label>
            <select
              value={settings.preferences.housing.roomType}
              onChange={(e) => updateNestedSetting('preferences', 'housing', 'roomType', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="private">Private Room</option>
              <option value="shared">Shared Room</option>
              <option value="studio">Studio</option>
              <option value="any">Any</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Move-in Date</span>
            </label>
            <input
              type="date"
              value={settings.preferences.housing.moveInDate}
              onChange={(e) => updateNestedSetting('preferences', 'housing', 'moveInDate', e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Search Radius (miles)</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="50"
                value={settings.preferences.housing.searchRadius}
                onChange={(e) => updateNestedSetting('preferences', 'housing', 'searchRadius', parseInt(e.target.value))}
                className="range range-primary flex-1"
              />
              <span className="font-bold text-[var(--color-primary)] w-12 text-right">
                {settings.preferences.housing.searchRadius}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text font-medium">Preferred Locations</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {settings.preferences.housing.locations.map((location, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-lg flex items-center gap-2"
              >
                <MapPin className="w-3 h-3" />
                {location}
                <button className="hover:text-[var(--color-error)]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <button className="btn btn-sm btn-outline gap-2">
            <Plus className="w-4 h-4" />
            Add Location
          </button>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-[var(--color-primary)]" />
          Amenities Priority
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">
              <span className="label-text font-medium text-[var(--color-success)]">Must-Haves</span>
            </label>
            <div className="space-y-2">
              {settings.preferences.amenities.mustHave.map((amenity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[var(--color-success)]/10 rounded-lg">
                  <span className="text-[var(--color-base-content)]">{amenity}</span>
                  <button className="text-[var(--color-error)] hover:text-[var(--color-error)]/80">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium text-[var(--color-info)]">Nice-to-Haves</span>
            </label>
            <div className="space-y-2">
              {settings.preferences.amenities.niceToHave.map((amenity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[var(--color-info)]/10 rounded-lg">
                  <span className="text-[var(--color-base-content)]">{amenity}</span>
                  <button className="text-[var(--color-error)] hover:text-[var(--color-error)]/80">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Privacy & Visibility Section
export const PrivacySection = ({ settings, updateSetting, updateNestedSetting }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Privacy & Visibility</h2>
        <p className="text-[var(--color-text-muted)]">Control who can see your information</p>
      </div>

      {/* Profile Visibility */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Profile Visibility</h3>
        
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-[var(--color-primary)]" />
              <div>
                <div className="font-medium text-[var(--color-base-content)]">Public Profile</div>
                <div className="text-sm text-[var(--color-text-muted)]">Visible to everyone</div>
              </div>
            </div>
            <input 
              type="radio" 
              name="visibility"
              checked={settings.privacy.profileVisibility === 'public'}
              onChange={() => updateNestedSetting('privacy', 'profileVisibility', null, 'public')}
              className="radio radio-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[var(--color-warning)]" />
              <div>
                <div className="font-medium text-[var(--color-base-content)]">Logged-in Users Only</div>
                <div className="text-sm text-[var(--color-text-muted)]">Visible to registered users</div>
              </div>
            </div>
            <input 
              type="radio" 
              name="visibility"
              checked={settings.privacy.profileVisibility === 'logged-in'}
              onChange={() => updateNestedSetting('privacy', 'profileVisibility', null, 'logged-in')}
              className="radio radio-primary"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <EyeOff className="w-5 h-5 text-[var(--color-error)]" />
              <div>
                <div className="font-medium text-[var(--color-base-content)]">Private</div>
                <div className="text-sm text-[var(--color-text-muted)]">Only providers you contact</div>
              </div>
            </div>
            <input 
              type="radio" 
              name="visibility"
              checked={settings.privacy.profileVisibility === 'private'}
              onChange={() => updateNestedSetting('privacy', 'profileVisibility', null, 'private')}
              className="radio radio-primary"
            />
          </label>
        </div>
      </div>

      {/* Contact Visibility */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Contact Information Visibility</h3>
        
        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-medium text-[var(--color-base-content)]">Show Email</span>
          </div>
          <input 
            type="checkbox"
            checked={settings.privacy.showEmail}
            onChange={(e) => updateNestedSetting('privacy', 'showEmail', null, e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-[var(--color-primary)]" />
            <span className="font-medium text-[var(--color-base-content)]">Show Phone</span>
          </div>
          <input 
            type="checkbox"
            checked={settings.privacy.showPhone}
            onChange={(e) => updateNestedSetting('privacy', 'showPhone', null, e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>
      </div>

      {/* Activity Status */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Activity Status</h3>
        
        <select
          value={settings.privacy.activityStatus}
          onChange={(e) => updateNestedSetting('privacy', 'activityStatus', null, e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="active">🟢 Active - Looking for roommate</option>
          <option value="paused">🟡 Paused - Not actively searching</option>
          <option value="inactive">⚫ Inactive - Profile hidden</option>
        </select>
      </div>
    </div>
  );
};

// Notifications Section
export const NotificationsSection = ({ settings, updateNestedSetting }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Notifications</h2>
        <p className="text-[var(--color-text-muted)]">Manage how you receive updates</p>
      </div>

      {/* Email Notifications */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[var(--color-primary)]" />
          Email Notifications
        </h3>
        
        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div>
            <div className="font-medium text-[var(--color-base-content)]">New Listings</div>
            <div className="text-sm text-[var(--color-text-muted)]">Get notified when new rooms match your preferences</div>
          </div>
          <input 
            type="checkbox"
            checked={settings.notifications.email.newListings}
            onChange={(e) => updateNestedSetting('notifications', 'email', 'newListings', e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div>
            <div className="font-medium text-[var(--color-base-content)]">Matches</div>
            <div className="text-sm text-[var(--color-text-muted)]">When you match with a provider</div>
          </div>
          <input 
            type="checkbox"
            checked={settings.notifications.email.matches}
            onChange={(e) => updateNestedSetting('notifications', 'email', 'matches', e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div>
            <div className="font-medium text-[var(--color-base-content)]">Messages</div>
            <div className="text-sm text-[var(--color-text-muted)]">When you receive a new message</div>
          </div>
          <input 
            type="checkbox"
            checked={settings.notifications.email.messages}
            onChange={(e) => updateNestedSetting('notifications', 'email', 'messages', e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div>
            <div className="font-medium text-[var(--color-base-content)]">Application Updates</div>
            <div className="text-sm text-[var(--color-text-muted)]">Status changes on your applications</div>
          </div>
          <input 
            type="checkbox"
            checked={settings.notifications.email.applicationUpdates}
            onChange={(e) => updateNestedSetting('notifications', 'email', 'applicationUpdates', e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>

        <div className="pt-4 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-medium">Email Digest Frequency</span>
          </label>
          <select
            value={settings.notifications.email.digest}
            onChange={(e) => updateNestedSetting('notifications', 'email', 'digest', e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="realtime">Real-time</option>
            <option value="daily">Daily Digest</option>
            <option value="weekly">Weekly Digest</option>
            <option value="never">Never</option>
          </select>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-[var(--color-primary)]" />
          Push Notifications
        </h3>
        
        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <span className="font-medium text-[var(--color-base-content)]">Enable Push Notifications</span>
          <input 
            type="checkbox"
            checked={settings.notifications.push.enabled}
            onChange={(e) => updateNestedSetting('notifications', 'push', 'enabled', e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>

        {settings.notifications.push.enabled && (
          <div className="space-y-3 pl-4 border-l-2 border-[var(--color-primary)]">
            <label className="flex items-center justify-between p-3 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
              <span className="text-[var(--color-base-content)]">Messages</span>
              <input 
                type="checkbox"
                checked={settings.notifications.push.messages}
                onChange={(e) => updateNestedSetting('notifications', 'push', 'messages', e.target.checked)}
                className="toggle toggle-sm toggle-primary"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
              <span className="text-[var(--color-base-content)]">Matches</span>
              <input 
                type="checkbox"
                checked={settings.notifications.push.matches}
                onChange={(e) => updateNestedSetting('notifications', 'push', 'matches', e.target.checked)}
                className="toggle toggle-sm toggle-primary"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
              <span className="text-[var(--color-base-content)]">New Listings</span>
              <input 
                type="checkbox"
                checked={settings.notifications.push.newListings}
                onChange={(e) => updateNestedSetting('notifications', 'push', 'newListings', e.target.checked)}
                className="toggle toggle-sm toggle-primary"
              />
            </label>
          </div>
        )}
      </div>

      {/* SMS Notifications */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-[var(--color-primary)]" />
          SMS Notifications
        </h3>
        
        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div>
            <div className="font-medium text-[var(--color-base-content)]">Enable SMS</div>
            <div className="text-sm text-[var(--color-text-muted)]">Standard messaging rates apply</div>
          </div>
          <input 
            type="checkbox"
            checked={settings.notifications.sms.enabled}
            onChange={(e) => updateNestedSetting('notifications', 'sms', 'enabled', e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>

        {settings.notifications.sms.enabled && (
          <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
            <span className="text-[var(--color-base-content)]">Critical Updates Only</span>
            <input 
              type="checkbox"
              checked={settings.notifications.sms.critical}
              onChange={(e) => updateNestedSetting('notifications', 'sms', 'critical', e.target.checked)}
              className="toggle toggle-sm toggle-primary"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default {
  PreferencesSection,
  PrivacySection,
  NotificationsSection
};
