import React, { useState } from 'react';
import {
  Download,
  Trash2,
  AlertTriangle,
  PauseCircle,
  FileText,
  HelpCircle,
  Send,
  ExternalLink,
  Mail,
  MessageSquare,
  Book,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Account Management Section
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

// Help & Support Section
export const SupportSection = () => {
  const [feedback, setFeedback] = useState({
    type: 'suggestion',
    subject: '',
    message: ''
  });

  const handleSubmitFeedback = () => {
    console.log('Submitting feedback:', feedback);
    // Show success message
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Help & Support</h2>
        <p className="text-[var(--color-text-muted)]">Get help and share your feedback</p>
      </div>

      {/* Quick Help Links */}
      <div className="grid md:grid-cols-2 gap-4">
        <a 
          href="#"
          className="flex items-center gap-4 p-6 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl hover:shadow-lg transition-all duration-300 group"
        >
          <div className="bg-[var(--color-primary)]/10 p-4 rounded-lg group-hover:bg-[var(--color-primary)]/20 transition-colors">
            <Book className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--color-base-content)] group-hover:text-[var(--color-primary)] transition-colors">
              Help Center
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">Browse articles and guides</p>
          </div>
          <ExternalLink className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
        </a>

        <a 
          href="#"
          className="flex items-center gap-4 p-6 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl hover:shadow-lg transition-all duration-300 group"
        >
          <div className="bg-[var(--color-secondary)]/10 p-4 rounded-lg group-hover:bg-[var(--color-secondary)]/20 transition-colors">
            <HelpCircle className="w-6 h-6 text-[var(--color-secondary)]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--color-base-content)] group-hover:text-[var(--color-secondary)] transition-colors">
              FAQs
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">Find answers to common questions</p>
          </div>
          <ExternalLink className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-secondary)] transition-colors" />
        </a>

        <a 
          href="#"
          className="flex items-center gap-4 p-6 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl hover:shadow-lg transition-all duration-300 group"
        >
          <div className="bg-[var(--color-info)]/10 p-4 rounded-lg group-hover:bg-[var(--color-info)]/20 transition-colors">
            <MessageSquare className="w-6 h-6 text-[var(--color-info)]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--color-base-content)] group-hover:text-[var(--color-info)] transition-colors">
              Live Chat
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">Chat with support team</p>
          </div>
          <ExternalLink className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-info)] transition-colors" />
        </a>

        <a 
          href="mailto:support@roommate.com"
          className="flex items-center gap-4 p-6 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl hover:shadow-lg transition-all duration-300 group"
        >
          <div className="bg-[var(--color-accent)]/10 p-4 rounded-lg group-hover:bg-[var(--color-accent)]/20 transition-colors">
            <Mail className="w-6 h-6 text-[var(--color-accent-content)]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--color-base-content)] group-hover:text-[var(--color-accent-content)] transition-colors">
              Email Support
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">support@roommate.com</p>
          </div>
          <ExternalLink className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-content)] transition-colors" />
        </a>
      </div>

      {/* Report Issue / Feedback Form */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Send className="w-5 h-5 text-[var(--color-primary)]" />
          Send Feedback or Report Issue
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Type</span>
            </label>
            <select
              value={feedback.type}
              onChange={(e) => setFeedback({...feedback, type: e.target.value})}
              className="select select-bordered w-full"
            >
              <option value="bug">🐛 Bug Report</option>
              <option value="feature">✨ Feature Request</option>
              <option value="suggestion">💡 Suggestion</option>
              <option value="complaint">😞 Complaint</option>
              <option value="praise">❤️ Praise</option>
              <option value="other">📝 Other</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Subject</span>
            </label>
            <input
              type="text"
              value={feedback.subject}
              onChange={(e) => setFeedback({...feedback, subject: e.target.value})}
              className="input input-bordered w-full"
              placeholder="Brief description of your feedback"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Message</span>
            </label>
            <textarea
              value={feedback.message}
              onChange={(e) => setFeedback({...feedback, message: e.target.value})}
              className="textarea textarea-bordered w-full h-32"
              placeholder="Provide detailed information..."
            />
          </div>

          <button 
            onClick={handleSubmitFeedback}
            className="btn btn-primary gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Community & Resources */}
      <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 p-6 rounded-xl border border-[var(--color-section-border)]">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">
          Community & Resources
        </h3>
        
        <div className="space-y-3">
          <a href="#" className="flex items-center justify-between p-3 bg-white dark:bg-[var(--color-base-200)] rounded-lg hover:shadow-md transition-shadow group">
            <span className="text-[var(--color-base-content)] group-hover:text-[var(--color-primary)]">Community Forum</span>
            <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
          </a>
          <a href="#" className="flex items-center justify-between p-3 bg-white dark:bg-[var(--color-base-200)] rounded-lg hover:shadow-md transition-shadow group">
            <span className="text-[var(--color-base-content)] group-hover:text-[var(--color-primary)]">Safety Tips</span>
            <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
          </a>
          <a href="#" className="flex items-center justify-between p-3 bg-white dark:bg-[var(--color-base-200)] rounded-lg hover:shadow-md transition-shadow group">
            <span className="text-[var(--color-base-content)] group-hover:text-[var(--color-primary)]">Terms of Service</span>
            <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
          </a>
          <a href="#" className="flex items-center justify-between p-3 bg-white dark:bg-[var(--color-base-200)] rounded-lg hover:shadow-md transition-shadow group">
            <span className="text-[var(--color-base-content)] group-hover:text-[var(--color-primary)]">Privacy Policy</span>
            <ExternalLink className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default {
  AccountSection,
  SupportSection
};
