import { DollarSign, Filter, MapPin, Shield, Users } from "lucide-react";
import { Controller } from 'react-hook-form';

export const FilterSidebar = ({ 
  control, 
  watch, 
  setValue, 
  handleFilterChange, 
  handleArrayFilter, 
  clearFilters 
}) => {
  const formValues = watch();
  
  // Convert comma strings back to arrays for checkbox logic
  const roomTypes = formValues.room_type ? formValues.room_type.split(',') : [];
  const propertyTypes = formValues.property_type ? formValues.property_type.split(',') : [];
  const amenities = formValues.amenities ? formValues.amenities.split(',') : [];
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 dark:text-white">
          <Filter size={20} />
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-4"
        >
          Clear all filters
        </button>
      </div>
      
      {/* Price Range */}
      <div>
        <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700 dark:text-gray-300">
          <DollarSign size={18} />
          Price Range
        </label>
        <div className="space-y-3">
          <Controller
            name="price_min"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={field.value}
                onChange={(e) => handleFilterChange('price_min', Number(e.target.value))}
                className="w-full"
              />
            )}
          />
          <Controller
            name="price_max"
            control={control}
            render={({ field }) => (
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={field.value}
                onChange={(e) => handleFilterChange('price_max', Number(e.target.value))}
                className="w-full"
              />
            )}
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>${formValues.price_min}</span>
            <span>${formValues.price_max}</span>
          </div>
        </div>
      </div>
      
      {/* Location */}
      <div>
        <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700 dark:text-gray-300">
          <MapPin size={18} />
          Location
        </label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="City or neighborhood"
              value={field.value}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          )}
        />
      </div>
      
      {/* Room Type */}
      <div>
        <label className="font-semibold mb-3 text-gray-700 dark:text-gray-300 block">
          Room Type
        </label>
        <div className="space-y-2">
          {['Private', 'Shared', 'Entire Place'].map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={roomTypes.includes(type)}
                onChange={() => handleArrayFilter('room_type', type)}
                className="w-4 h-4 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm dark:text-gray-300">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Property Type */}
      <div>
        <label className="font-semibold mb-3 text-gray-700 dark:text-gray-300 block">
          Property Type
        </label>
        <div className="space-y-2">
          {['Apartment', 'House', 'Condo', 'Studio'].map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={propertyTypes.includes(type)}
                onChange={() => handleArrayFilter('property_type', type)}
                className="w-4 h-4 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm dark:text-gray-300">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Gender Preference */}
      <div>
        <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700 dark:text-gray-300">
          <Users size={18} />
          Gender Preference
        </label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <select
              value={field.value}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
            </select>
          )}
        />
      </div>
      
      {/* Age Range */}
      <div>
        <label className="font-semibold mb-3 text-gray-700 dark:text-gray-300 block">
          Age Range
        </label>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400">
              Min Age: {formValues.age_min}
            </label>
            <Controller
              name="age_min"
              control={control}
              render={({ field }) => (
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={field.value}
                  onChange={(e) => handleFilterChange('age_min', Number(e.target.value))}
                  className="w-full"
                />
              )}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400">
              Max Age: {formValues.age_max}
            </label>
            <Controller
              name="age_max"
              control={control}
              render={({ field }) => (
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={field.value}
                  onChange={(e) => handleFilterChange('age_max', Number(e.target.value))}
                  className="w-full"
                />
              )}
            />
          </div>
        </div>
      </div>
      
      {/* Amenities */}
      <div>
        <label className="font-semibold mb-3 text-gray-700 dark:text-gray-300 block">
          Amenities
        </label>
        <div className="space-y-2">
          {['Pet-friendly', 'Parking', 'Furnished', 'WiFi'].map(amenity => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => handleArrayFilter('amenities', amenity)}
                className="w-4 h-4 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="text-sm dark:text-gray-300">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Verified Only */}
      <div>
        <Controller
          name="verified_only"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => handleFilterChange('verified_only', e.target.checked)}
                className="w-4 h-4 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="flex items-center gap-1 text-sm font-medium dark:text-gray-300">
                <Shield size={16} />
                Verified providers only
              </span>
            </label>
          )}
        />
      </div>
    </div>
  );
};