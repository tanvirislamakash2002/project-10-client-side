import {
  Monitor,
  Moon,
  Sun,
  Palette,
} from 'lucide-react';

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
                <div className={`font-medium text-[var(--color-base-content)] mb-2 ${size === 'small' ? 'text-sm' :
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

