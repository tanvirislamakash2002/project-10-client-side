import { Check, Lock, LogOut, Monitor, Shield } from "lucide-react";
import { useState } from "react";

export const SecuritySection = ({ settings }) => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Account Security</h2>
        <p className="text-[var(--color-text-muted)]">Keep your account safe and secure</p>
      </div>

      {/* Change Password */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-base-content)] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[var(--color-primary)]" />
              Password
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Last changed: {settings.security.lastPasswordChange}
            </p>
          </div>
          <button 
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="btn btn-outline btn-sm"
          >
            {showPasswordChange ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {showPasswordChange && (
          <div className="space-y-4 pt-4 border-t border-[var(--color-section-border)]">
            <div>
              <label className="label">
                <span className="label-text font-medium">Current Password</span>
              </label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                className="input input-bordered w-full"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">New Password</span>
              </label>
              <input
                type="password"
                value={passwordForm.new}
                onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                className="input input-bordered w-full"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Confirm New Password</span>
              </label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                className="input input-bordered w-full"
                placeholder="Confirm new password"
              />
            </div>

            <button className="btn btn-primary gap-2">
              <Check className="w-4 h-4" />
              Update Password
            </button>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-[var(--color-primary)]/10 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--color-base-content)]">Two-Factor Authentication</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Add an extra layer of security to your account
              </p>
              {settings.security.twoFactorEnabled && (
                <div className="flex items-center gap-2 mt-2">
                  <Check className="w-4 h-4 text-[var(--color-success)]" />
                  <span className="text-sm text-[var(--color-success)] font-medium">Enabled</span>
                </div>
              )}
            </div>
          </div>
          <button className={`btn ${settings.security.twoFactorEnabled ? 'btn-error' : 'btn-primary'}`}>
            {settings.security.twoFactorEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-[var(--color-primary)]" />
          Active Sessions ({settings.security.activeSessions})
        </h3>
        
        <div className="space-y-3">
          {settings.security.loginHistory.map((session, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-[var(--color-text-muted)]" />
                <div>
                  <div className="font-medium text-[var(--color-base-content)]">{session.device}</div>
                  <div className="text-sm text-[var(--color-text-muted)]">
                    {session.location} • {session.time}
                  </div>
                </div>
              </div>
              {idx === 0 && (
                <span className="px-3 py-1 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-lg text-sm font-medium">
                  Current
                </span>
              )}
              {idx !== 0 && (
                <button className="btn btn-ghost btn-sm text-[var(--color-error)]">
                  End Session
                </button>
              )}
            </div>
          ))}
        </div>

        <button className="btn btn-outline btn-sm mt-4 gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out All Other Sessions
        </button>
      </div>
    </div>
  );
};