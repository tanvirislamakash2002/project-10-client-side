import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, X, ChevronDown, MapPin, DollarSign, Calendar, Home, Users, Shield, Heart } from 'lucide-react';
import { ListingCard } from './Components/ListingCard';
import { FilterSidebar } from './Components/FilterSidebar';
import { useListingsFilter } from '../../../../hooks/useListingsFilter';
import useAxios from '../../../../hooks/useAxios';

export default function BrowsePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 5000,
    location: '',
    roomType: [],
    propertyType: [],
    gender: 'any',
    amenities: [],
    verifiedOnly: false,
    ageMin: 18,
    ageMax: 65,
  });


  const axiosInstance = useAxios()
  const { data: RoomData = [], isLoading, error } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/v1/listings`)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  console.log('new 1-29', RoomData);

  const filteredListings = useListingsFilter(RoomData, filters);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 5000,
      location: '',
      roomType: [],
      propertyType: [],
      gender: 'any',
      amenities: [],
      verifiedOnly: false,
      ageMin: 18,
      ageMax: 65,
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Find Your Room</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FilterSidebar props={{ filters, handleFilterChange, handleArrayFilter, clearFilters }} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Showing {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 animate-pulse" />
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
                Failed to load listings. Please try again later.
              </div>
            )}

            {/* Listings Grid */}
            {!isLoading && filteredListings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard key={listing?._id} listing={listing} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredListings.length === 0 && (
              <div className="text-center py-12">
                <Home size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No listings found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
            <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
              <h2 className="font-bold dark:text-white">Filters</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar props={{ filters, handleFilterChange, handleArrayFilter, clearFilters }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}