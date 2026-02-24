import { AlertTriangle, CheckCircle, Download, FileText, PauseCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export const AccountSection = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Account Management</h2>
        <p className="text-[var(--color-text-muted)]">Manage your account data and settings</p>
      </div>

      {/* Download Personal Data */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="bg-[var(--color-primary)]/10 p-3 rounded-lg">
            <Download className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-2">
              Download Your Data
            </h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              Download a copy of your profile, applications, messages, and activity history. 
              The data will be provided in JSON format.
            </p>
            <button className="btn btn-primary gap-2">
              <Download className="w-4 h-4" />
              Request Data Download
            </button>
          </div>
        </div>
      </div>

      {/* Export Data */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="bg-[var(--color-secondary)]/10 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-[var(--color-secondary)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-2">
              Export Account Data
            </h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              Export specific data categories like applications, saved listings, or preferences.
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-outline btn-sm gap-2">
                <Download className="w-3 h-3" />
                Applications
              </button>
              <button className="btn btn-outline btn-sm gap-2">
                <Download className="w-3 h-3" />
                Saved Listings
              </button>
              <button className="btn btn-outline btn-sm gap-2">
                <Download className="w-3 h-3" />
                Messages
              </button>
              <button className="btn btn-outline btn-sm gap-2">
                <Download className="w-3 h-3" />
                Preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deactivate Account */}
      <div className="bg-[var(--color-warning)]/10 p-6 rounded-xl border border-[var(--color-warning)]/20">
        <div className="flex items-start gap-4">
          <div className="bg-[var(--color-warning)]/20 p-3 rounded-lg">
            <PauseCircle className="w-6 h-6 text-[var(--color-warning)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--color-warning)] mb-2">
              Deactivate Account Temporarily
            </h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              Hide your profile and pause your search without deleting your account. 
              You can reactivate anytime.
            </p>
            
            {!showDeactivateConfirm ? (
              <button 
                onClick={() => setShowDeactivateConfirm(true)}
                className="btn btn-outline btn-warning gap-2"
              >
                <PauseCircle className="w-4 h-4" />
                Deactivate Account
              </button>
            ) : (
              <div className="space-y-4 bg-white/50 dark:bg-[var(--color-base-200)]/50 p-4 rounded-lg">
                <p className="text-[var(--color-base-content)] font-medium">
                  Are you sure you want to deactivate your account?
                </p>
                <ul className="text-sm text-[var(--color-text-muted)] space-y-1 list-disc list-inside">
                  <li>Your profile will be hidden from search</li>
                  <li>Your applications will be paused</li>
                  <li>You won't receive notifications</li>
                  <li>You can reactivate anytime</li>
                </ul>
                <div className="flex gap-2">
                  <button className="btn btn-warning gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Yes, Deactivate
                  </button>
                  <button 
                    onClick={() => setShowDeactivateConfirm(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-[var(--color-error)]/10 p-6 rounded-xl border-2 border-[var(--color-error)]/30">
        <div className="flex items-start gap-4">
          <div className="bg-[var(--color-error)]/20 p-3 rounded-lg">
            <Trash2 className="w-6 h-6 text-[var(--color-error)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--color-error)] mb-2">
              Delete Account Permanently
            </h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>

            {!showDeleteConfirm ? (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="btn btn-error gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete My Account
              </button>
            ) : (
              <div className="space-y-4 bg-white/50 dark:bg-[var(--color-base-200)]/50 p-4 rounded-lg">
                <div className="flex items-start gap-3 p-3 bg-[var(--color-error)]/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-error)] mt-0.5" />
                  <div className="text-sm text-[var(--color-error)]">
                    <p className="font-bold mb-1">Warning: This action is permanent!</p>
                    <p>All your data including profile, applications, messages, and history will be permanently deleted.</p>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Type "DELETE" to confirm</span>
                  </label>
                  <input
                    type="text"
                    placeholder="DELETE"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-error gap-2">
                    <Trash2 className="w-4 h-4" />
                    Permanently Delete Account
                  </button>
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};