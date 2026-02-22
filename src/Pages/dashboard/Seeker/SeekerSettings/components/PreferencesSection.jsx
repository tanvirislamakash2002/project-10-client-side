import { DollarSign, Home, MapPin, Plus, Star, Users, X } from "lucide-react";

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