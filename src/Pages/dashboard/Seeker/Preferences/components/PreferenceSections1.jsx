import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Map,
  Clock,
  Home,
  Bed,
  Bath,
  Zap,
  Car,
  Utensils,
  Wind,
  Building,
  Dog,
  Wifi,
  Users,
  User,
  Briefcase,
  GraduationCap,
  Heart,
  Moon,
  Sun,
  Sparkles,
  Music,
  Volume2,
  Coffee,
  Target,
  Bell,
  Mail,
  Filter,
  Star,
  Shield,
  Award,
  CheckCircle,
  X,
  Plus,
  TrendingUp,
  Sliders
} from 'lucide-react';

// Location & Area Section
export const LocationSection = ({ preferences, updatePreference }) => {
  const [newArea, setNewArea] = useState('');

  const addArea = () => {
    if (newArea && !preferences.location.areas.includes(newArea)) {
      const newAreas = [...preferences.location.areas, newArea];
      updatePreference('location', 'areas', newAreas);
      setNewArea('');
    }
  };

  const removeArea = (area) => {
    const newAreas = preferences.location.areas.filter(a => a !== area);
    updatePreference('location', 'areas', newAreas);
  };

  return (
    <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[var(--color-secondary)]/10 p-3 rounded-xl">
          <MapPin className="w-6 h-6 text-[var(--color-secondary)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-base-content)]">Location & Area</h2>
          <p className="text-[var(--color-text-muted)]">Choose your preferred neighborhoods and commute</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Preferred Locations */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-lg">Preferred Neighborhoods</span>
          </label>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {preferences.location.areas.map((area, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 text-[var(--color-primary)] rounded-full flex items-center gap-2 border border-[var(--color-primary)]/20"
              >
                <MapPin className="w-4 h-4" />
                {area}
                <button 
                  onClick={() => removeArea(area)}
                  className="hover:text-[var(--color-error)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addArea()}
              className="input input-bordered flex-1"
              placeholder="Add neighborhood (e.g., Downtown)"
            />
            <button 
              onClick={addArea}
              className="btn btn-primary gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Max Commute Time */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--color-primary)]" />
              Maximum Commute Time
            </span>
          </label>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="15"
              max="90"
              step="15"
              value={preferences.location.maxCommute}
              onChange={(e) => updatePreference('location', 'maxCommute', parseInt(e.target.value))}
              className="range range-primary flex-1"
            />
            <div className="bg-[var(--color-primary)]/10 px-6 py-3 rounded-xl min-w-[120px] text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">
                {preferences.location.maxCommute}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">minutes</div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-[var(--color-text-muted)] mt-2">
            <span>15 min</span>
            <span>30 min</span>
            <span>45 min</span>
            <span>60 min</span>
            <span>90+ min</span>
          </div>
        </div>

        {/* Area Type */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg">Area Type Preference</span>
          </label>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { value: 'quiet_residential', label: 'Quiet Residential', icon: Home },
              { value: 'vibrant_downtown', label: 'Vibrant Downtown', icon: Building },
              { value: 'suburban', label: 'Suburban', icon: Users },
              { value: 'mixed', label: 'Mixed', icon: Sparkles }
            ].map(type => (
              <label 
                key={type.value}
                className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  preferences.location.areaType === type.value
                    ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] shadow-md'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] border-transparent hover:border-[var(--color-primary)]/30'
                }`}
              >
                <type.icon className={`w-8 h-8 mb-2 ${
                  preferences.location.areaType === type.value
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)]'
                }`} />
                <span className="font-medium text-sm text-[var(--color-base-content)] text-center">
                  {type.label}
                </span>
                <input
                  type="radio"
                  name="areaType"
                  value={type.value}
                  checked={preferences.location.areaType === type.value}
                  onChange={(e) => updatePreference('location', 'areaType', e.target.value)}
                  className="radio radio-primary radio-sm mt-2"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Room & Apartment Section
export const RoomApartmentSection = ({ preferences, updatePreference }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'must_have':
        return 'bg-[var(--color-approved)] text-[var(--color-approved-content)]';
      case 'nice_to_have':
        return 'bg-[var(--color-pending)] text-[var(--color-pending-content)]';
      case 'dont_care':
        return 'bg-[var(--color-draft)] text-[var(--color-draft-content)]';
      default:
        return 'bg-[var(--color-base-200)]';
    }
  };

  return (
    <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[var(--color-accent)]/10 p-3 rounded-xl">
          <Home className="w-6 h-6 text-[var(--color-accent-content)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-base-content)]">Room & Apartment Requirements</h2>
          <p className="text-[var(--color-text-muted)]">Specify your room and amenity preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Room Specifications */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-lg">Room Type</span>
            <span className="label-text-alt text-[var(--color-error)]">Required</span>
          </label>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              { value: 'private', label: 'Private Room', icon: Bed },
              { value: 'shared', label: 'Shared Room', icon: Users },
              { value: 'entire', label: 'Entire Apartment', icon: Home }
            ].map(type => (
              <label 
                key={type.value}
                className={`flex flex-col items-center p-6 rounded-xl cursor-pointer transition-all border-2 ${
                  preferences.room.type === type.value
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-xl scale-105'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] border-transparent hover:border-[var(--color-primary)]/30'
                }`}
              >
                <type.icon className="w-10 h-10 mb-3" />
                <span className="font-semibold">{type.label}</span>
                <input
                  type="radio"
                  name="roomType"
                  value={type.value}
                  checked={preferences.room.type === type.value}
                  onChange={(e) => updatePreference('room', 'type', e.target.value)}
                  className="radio radio-sm mt-3"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Bathroom & Furnishing */}
        <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-[var(--color-section-border)]">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Bathroom</span>
            </label>
            <select
              value={preferences.room.bathroom}
              onChange={(e) => updatePreference('room', 'bathroom', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="private">Private Bathroom</option>
              <option value="shared">Shared Bathroom</option>
              <option value="dont_care">Don't Care</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Furnishing</span>
            </label>
            <select
              value={preferences.room.furnished}
              onChange={(e) => updatePreference('room', 'furnished', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="semi">Semi-furnished</option>
              <option value="either">Either</option>
            </select>
          </div>
        </div>

        {/* Amenities Priority */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg">Amenities Priority</span>
          </label>

          <div className="space-y-3">
            {[
              { key: 'parking', label: 'Parking', icon: Car },
              { key: 'laundry', label: 'Laundry (in-unit/building)', icon: Sparkles },
              { key: 'kitchen', label: 'Kitchen Access', icon: Utensils },
              { key: 'ac', label: 'AC & Heating', icon: Wind },
              { key: 'elevator', label: 'Elevator', icon: Building },
              { key: 'petFriendly', label: 'Pet-Friendly', icon: Dog },
              { key: 'utilitiesIncluded', label: 'Utilities Included', icon: Zap }
            ].map(amenity => (
              <div 
                key={amenity.key}
                className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <amenity.icon className="w-5 h-5 text-[var(--color-primary)]" />
                  <span className="font-medium text-[var(--color-base-content)]">{amenity.label}</span>
                </div>
                
                <div className="flex gap-2">
                  {[
                    { value: 'must_have', label: 'Must-have' },
                    { value: 'nice_to_have', label: 'Nice-to-have' },
                    { value: 'dont_care', label: "Don't care" }
                  ].map(priority => (
                    <button
                      key={priority.value}
                      onClick={() => updatePreference('amenities', amenity.key, priority.value)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        preferences.amenities[amenity.key] === priority.value
                          ? getPriorityColor(priority.value) + ' scale-110'
                          : 'bg-[var(--color-base-200)] text-[var(--color-text-muted)] hover:bg-[var(--color-base-300)]'
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Ideal Roommate Section
export const RoommateSection = ({ preferences, updatePreference }) => {
  return (
    <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[var(--color-warning)]/10 p-3 rounded-xl">
          <Users className="w-6 h-6 text-[var(--color-warning)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-base-content)]">Ideal Roommate Profile</h2>
          <p className="text-[var(--color-text-muted)]">Define your ideal roommate characteristics</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Gender Preference */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-lg">Roommate Gender</span>
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'non_binary', label: 'Non-binary' },
              { value: 'no_preference', label: 'No Preference' }
            ].map(option => (
              <label 
                key={option.value}
                className={`flex items-center justify-center p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  preferences.roommate.gender === option.value
                    ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] shadow-md'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] border-transparent hover:border-[var(--color-primary)]/30'
                }`}
              >
                <div className="text-center">
                  <span className="font-medium text-sm text-[var(--color-base-content)]">
                    {option.label}
                  </span>
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={preferences.roommate.gender === option.value}
                    onChange={(e) => updatePreference('roommate', 'gender', e.target.value)}
                    className="radio radio-primary radio-sm mt-2"
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg">Age Range</span>
          </label>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <input
                type="range"
                min="18"
                max="65"
                value={preferences.roommate.ageRange[0]}
                onChange={(e) => updatePreference('roommate', 'ageRange', [parseInt(e.target.value), preferences.roommate.ageRange[1]])}
                className="range range-primary"
              />
            </div>
            <div className="bg-[var(--color-primary)]/10 px-4 py-2 rounded-lg min-w-[100px] text-center">
              <div className="text-lg font-bold text-[var(--color-primary)]">
                {preferences.roommate.ageRange[0]} - {preferences.roommate.ageRange[1]}
              </div>
            </div>
            <div className="flex-1">
              <input
                type="range"
                min="18"
                max="65"
                value={preferences.roommate.ageRange[1]}
                onChange={(e) => updatePreference('roommate', 'ageRange', [preferences.roommate.ageRange[0], parseInt(e.target.value)])}
                className="range range-primary"
              />
            </div>
          </div>
        </div>

        {/* Occupation Type */}
        <div className="pt-6 border-t border-[var(--color-section-border)]">
          <label className="label">
            <span className="label-text font-semibold text-lg">Occupation Type</span>
          </label>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { value: 'student', label: 'Student', icon: GraduationCap },
              { value: 'professional', label: 'Professional', icon: Briefcase },
              { value: 'remote', label: 'Remote Worker', icon: Wifi },
              { value: 'mixed', label: 'Mixed', icon: Users },
              { value: 'no_preference', label: 'No Preference', icon: Sparkles }
            ].map(type => (
              <label 
                key={type.value}
                className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  preferences.roommate.occupation === type.value
                    ? 'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)] shadow-md'
                    : 'bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] border-transparent hover:border-[var(--color-secondary)]/30'
                }`}
              >
                <type.icon className={`w-6 h-6 mb-2 ${
                  preferences.roommate.occupation === type.value
                    ? 'text-[var(--color-secondary)]'
                    : 'text-[var(--color-text-muted)]'
                }`} />
                <span className="font-medium text-sm text-[var(--color-base-content)] text-center">
                  {type.label}
                </span>
                <input
                  type="radio"
                  name="occupation"
                  value={type.value}
                  checked={preferences.roommate.occupation === type.value}
                  onChange={(e) => updatePreference('roommate', 'occupation', e.target.value)}
                  className="radio radio-sm mt-2"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  LocationSection,
  RoomApartmentSection,
  RoommateSection
};
