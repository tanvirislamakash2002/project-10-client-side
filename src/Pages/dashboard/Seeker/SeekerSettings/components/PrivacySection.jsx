import { Eye, EyeOff, Mail, Smartphone, Users } from "lucide-react";

export const PrivacySection = ({ settings, updateNestedSetting }) => {
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