import { DollarSign, Filter, MapPin, Shield, Users } from "lucide-react";

export const FilterSidebar = ({ props }) => {
    const { filters, handleFilterChange, handleArrayFilter, clearFilters } = props
    return (

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Filter size={20} />
                    Filters
                </h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-4"
                >
                    Clear all filters
                </button>
            </div>

            {/* Price Range */}
            <div>
                <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700">
                    <DollarSign size={18} />
                    Price Range
                </label>
                <div className="space-y-3">
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={filters?.priceMin}
                        onChange={(e) => handleFilterChange('priceMin', Number(e.target.value))}
                        className="w-full"
                    />
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={filters?.priceMax}
                        onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>${filters?.priceMin}</span>
                        <span>${filters?.priceMax}</span>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div>
                <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700">
                    <MapPin size={18} />
                    Location
                </label>
                <input
                    type="text"
                    placeholder="City or neighborhood"
                    value={filters?.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                />
            </div>

            {/* Room Type */}
            <div>
                <label className="font-semibold mb-3 text-gray-700 block">Room Type</label>
                <div className="space-y-2">
                    {['Private', 'Shared', 'Entire Place'].map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters?.roomType.includes(type)}
                                onChange={() => handleArrayFilter('roomType', type)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Property Type */}
            <div>
                <label className="font-semibold mb-3 text-gray-700 block">Property Type</label>
                <div className="space-y-2">
                    {['Apartment', 'House', 'Condo', 'Studio'].map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters?.propertyType.includes(type)}
                                onChange={() => handleArrayFilter('propertyType', type)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Gender Preference */}
            <div>
                <label className="flex items-center gap-2 font-semibold mb-3 text-gray-700">
                    <Users size={18} />
                    Gender Preference
                </label>
                <select
                    value={filters?.gender}
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                </select>
            </div>

            {/* Age Range */}
            <div>
                <label className="font-semibold mb-3 text-gray-700 block">Age Range</label>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-gray-600">Min Age: {filters?.ageMin}</label>
                        <input
                            type="range"
                            min="18"
                            max="65"
                            value={filters?.ageMin}
                            onChange={(e) => handleFilterChange('ageMin', Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-600">Max Age: {filters?.ageMax}</label>
                        <input
                            type="range"
                            min="18"
                            max="65"
                            value={filters?.ageMax}
                            onChange={(e) => handleFilterChange('ageMax', Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Amenities */}
            <div>
                <label className="font-semibold mb-3 text-gray-700 block">Amenities</label>
                <div className="space-y-2">
                    {['Pet-friendly', 'Parking', 'Furnished', 'WiFi'].map(amenity => (
                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters?.amenities.includes(amenity)}
                                onChange={() => handleArrayFilter('amenities', amenity)}
                                className="w-4 h-4"
                            />
                            <span className="text-sm">{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Verified Only */}
            <div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={filters?.verifiedOnly}
                        onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
                        className="w-4 h-4"
                    />
                    <span className="flex items-center gap-1 text-sm font-medium">
                        <Shield size={16} />
                        Verified providers only
                    </span>
                </label>
            </div>
        </div>
    );
}
