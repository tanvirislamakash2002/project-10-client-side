import React, { useState } from 'react';
import {
  HelpCircle,
  Send,
  ExternalLink,
  Mail,
  MessageSquare,
  Book
} from 'lucide-react';


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
              onChange={(e) => setFeedback({ ...feedback, type: e.target.value })}
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
              onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
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
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
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
  SupportSection
};
