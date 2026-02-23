import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Key,
  Monitor,
  Smartphone,
  MessageSquare,
  Clock,
  X,
  Ban,
  CreditCard,
  Star,
  Download,
  FileText,
  Trash2,
  AlertCircle,
  Check,
  Moon,
  Sun,
  Palette,
  Accessibility,
  Volume2,
  VolumeX,
  HelpCircle,
  Send,
  ChevronRight,
  ExternalLink,
  Mail,
  AlertTriangle,
  LogOut,
  Zap,
  Crown
} from 'lucide-react';


// Subscription & Billing Section
export const SubscriptionSection = ({ settings }) => {
  const isPremium = settings.subscription.plan !== 'free';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Subscription & Billing</h2>
        <p className="text-[var(--color-text-muted)]">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 p-8 rounded-xl border-2 border-[var(--color-primary)]/20">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            {isPremium && <Crown className="w-8 h-8 text-[var(--color-warning)]" />}
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-base-content)] capitalize">
                {settings.subscription.plan} Plan
              </h3>
              {isPremium && (
                <p className="text-[var(--color-text-muted)] mt-1">
                  Next billing: {settings.subscription.nextBilling}
                </p>
              )}
            </div>
          </div>
          {!isPremium && (
            <button className="btn btn-primary gap-2">
              <Zap className="w-4 h-4" />
              Upgrade to Premium
            </button>
          )}
        </div>

        {isPremium ? (
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/50 dark:bg-[var(--color-base-200)]/50 p-4 rounded-lg">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Billing Cycle</div>
              <div className="text-lg font-bold text-[var(--color-base-content)]">
                {settings.subscription.billingCycle}
              </div>
            </div>
            <div className="bg-white/50 dark:bg-[var(--color-base-200)]/50 p-4 rounded-lg">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Payment Method</div>
              <div className="text-lg font-bold text-[var(--color-base-content)]">
                {settings.subscription.paymentMethod}
              </div>
            </div>
            <div className="bg-white/50 dark:bg-[var(--color-base-200)]/50 p-4 rounded-lg">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Status</div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[var(--color-success)]" />
                <span className="font-bold text-[var(--color-success)]">Active</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[var(--color-base-content)] font-medium">Upgrade to Premium for:</p>
            <ul className="space-y-2">
              {[
                'Unlimited applications',
                'Priority support',
                'Advanced filters',
                'See who viewed your profile',
                'Ad-free experience'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-[var(--color-base-content)]">
                  <Check className="w-4 h-4 text-[var(--color-success)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Payment Method */}
      {isPremium && (
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
            Payment Method
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-[var(--color-text-muted)]" />
              <div>
                <div className="font-medium text-[var(--color-base-content)]">•••• •••• •••• 4242</div>
                <div className="text-sm text-[var(--color-text-muted)]">Expires 12/2026</div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm">Update</button>
          </div>
        </div>
      )}

      {/* Billing History */}
      {isPremium && (
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--color-base-content)]">Billing History</h3>
            <button className="btn btn-ghost btn-sm gap-2">
              <Download className="w-4 h-4" />
              Download All
            </button>
          </div>
          
          <div className="space-y-2">
            {[
              { date: 'Feb 1, 2026', amount: '$9.99', status: 'Paid' },
              { date: 'Jan 1, 2026', amount: '$9.99', status: 'Paid' },
              { date: 'Dec 1, 2025', amount: '$9.99', status: 'Paid' }
            ].map((bill, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="w-5 h-5 text-[var(--color-text-muted)]" />
                  <div>
                    <div className="font-medium text-[var(--color-base-content)]">{bill.date}</div>
                    <div className="text-sm text-[var(--color-text-muted)]">{bill.status}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[var(--color-base-content)]">{bill.amount}</span>
                  <button className="btn btn-ghost btn-sm">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancel Subscription */}
      {isPremium && (
        <div className="bg-[var(--color-error)]/10 p-6 rounded-xl border border-[var(--color-error)]/20">
          <h3 className="text-lg font-semibold text-[var(--color-error)] mb-2">Cancel Subscription</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            Your subscription will remain active until {settings.subscription.nextBilling}
          </p>
          <button className="btn btn-outline btn-error gap-2">
            <X className="w-4 h-4" />
            Cancel Subscription
          </button>
        </div>
      )}
    </div>
  );
};

// Accessibility Section
export const AccessibilitySection = ({ settings, updateNestedSetting }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Accessibility</h2>
        <p className="text-[var(--color-text-muted)]">Customize your experience</p>
      </div>

      {/* Theme Preference */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-[var(--color-primary)]" />
          Theme Preference
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex flex-col items-center p-6 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-xl cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent has-[:checked]:border-[var(--color-primary)]">
            <Sun className="w-8 h-8 text-[var(--color-warning)] mb-3" />
            <span className="font-medium text-[var(--color-base-content)] mb-2">Light</span>
            <input 
              type="radio"
              name="theme"
              value="light"
              checked={settings.accessibility.theme === 'light'}
              onChange={(e) => updateNestedSetting('accessibility', 'theme', null, e.target.value)}
              className="radio radio-primary"
            />
          </label>

          <label className="flex flex-col items-center p-6 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-xl cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent has-[:checked]:border-[var(--color-primary)]">
            <Moon className="w-8 h-8 text-[var(--color-info)] mb-3" />
            <span className="font-medium text-[var(--color-base-content)] mb-2">Dark</span>
            <input 
              type="radio"
              name="theme"
              value="dark"
              checked={settings.accessibility.theme === 'dark'}
              onChange={(e) => updateNestedSetting('accessibility', 'theme', null, e.target.value)}
              className="radio radio-primary"
            />
          </label>

          <label className="flex flex-col items-center p-6 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-xl cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent has-[:checked]:border-[var(--color-primary)]">
            <Monitor className="w-8 h-8 text-[var(--color-primary)] mb-3" />
            <span className="font-medium text-[var(--color-base-content)] mb-2">System</span>
            <input 
              type="radio"
              name="theme"
              value="system"
              checked={settings.accessibility.theme === 'system'}
              onChange={(e) => updateNestedSetting('accessibility', 'theme', null, e.target.value)}
              className="radio radio-primary"
            />
          </label>
        </div>
      </div>

      {/* Text Size */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Text Size</h3>
        
        <div className="grid md:grid-cols-4 gap-3">
          {['small', 'medium', 'large', 'extra-large'].map(size => (
            <label key={size} className="flex items-center justify-center p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent has-[:checked]:border-[var(--color-primary)]">
              <div className="text-center">
                <div className={`font-medium text-[var(--color-base-content)] mb-2 ${
                  size === 'small' ? 'text-sm' :
                  size === 'medium' ? 'text-base' :
                  size === 'large' ? 'text-lg' :
                  'text-xl'
                }`}>
                  Aa
                </div>
                <div className="text-xs text-[var(--color-text-muted)] capitalize mb-2">{size.replace('-', ' ')}</div>
                <input 
                  type="radio"
                  name="textSize"
                  value={size}
                  checked={settings.accessibility.textSize === size}
                  onChange={(e) => updateNestedSetting('accessibility', 'textSize', null, e.target.value)}
                  className="radio radio-sm radio-primary"
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Motion & Visual Effects */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl space-y-4">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4">Motion & Visual Effects</h3>
        
        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div>
            <div className="font-medium text-[var(--color-base-content)]">Reduced Motion</div>
            <div className="text-sm text-[var(--color-text-muted)]">Minimize animations and transitions</div>
          </div>
          <input 
            type="checkbox"
            checked={settings.accessibility.reducedMotion}
            onChange={(e) => updateNestedSetting('accessibility', 'reducedMotion', null, e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
          <div>
            <div className="font-medium text-[var(--color-base-content)]">High Contrast</div>
            <div className="text-sm text-[var(--color-text-muted)]">Increase contrast for better visibility</div>
          </div>
          <input 
            type="checkbox"
            checked={settings.accessibility.highContrast}
            onChange={(e) => updateNestedSetting('accessibility', 'highContrast', null, e.target.checked)}
            className="toggle toggle-primary"
          />
        </label>
      </div>
    </div>
  );
};

export default {  
  SubscriptionSection,
  AccessibilitySection
};
