import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'; // Add react-hook-form
import { Filter, X, Home } from 'lucide-react';
import { ListingCard } from './Components/ListingCard';
import { FilterSidebar } from './Components/FilterSidebar';
import useAxios from '../../../../hooks/useAxios';
import { useListingsQuery } from '../../../../hooks/useListingsQuery'; // Custom hook
import { prepareFiltersForAPI } from '../../../../utils/filterUtils';

export default function BrowsePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Initialize filters with react-hook-form
  const { control, watch, setValue, reset, handleSubmit } = useForm({
    defaultValues: {
      price_min: 0,
      price_max: 5000,
      location: '',
      room_type: '',
      property_type: '',
      gender: 'any',
      amenities: '',
      verified_only: false,
      age_min: 18,
      age_max: 65,
      page: 1,
      limit: 20,
      sort_by: 'createdAt',
      sort_order: 'desc'
    }
  });
  
  // Watch all form values
  const formValues = watch();
  
  // Use the custom query hook
  const { 
    data: listingsData = {}, 
    isLoading, 
    error,
    isFetching,
    isPreviousData 
  } = useListingsQuery(formValues);
  
  const listings = listingsData?.data || [];
  const pagination = listingsData?.pagination || {};
  
  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setValue(key, value);
    // Reset to page 1 when filters change
    if (key !== 'page') {
      setValue('page', 1);
    }
  };
  
  // Handle array filters (convert to comma string)
  const handleArrayFilter = (key, value) => {
    const currentValue = watch(key);
    const currentArray = currentValue ? currentValue.split(',').filter(Boolean) : [];
    
    let newArray;
    if (currentArray.includes(value)) {
      newArray = currentArray.filter(item => item !== value);
    } else {
      newArray = [...currentArray, value];
    }
    
    setValue(key, newArray.join(','));
    setValue('page', 1); // Reset page
  };
  
  const clearFilters = () => {
    reset({
      price_min: 0,
      price_max: 5000,
      location: '',
      room_type: '',
      property_type: '',
      gender: 'any',
      amenities: '',
      verified_only: false,
      age_min: 18,
      age_max: 65,
      page: 1,
      limit: 20
    });
  };
  
  // Pagination handlers
  const handleNextPage = () => {
    if (!isPreviousData && pagination.hasNext) {
      setValue('page', formValues.page + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (formValues.page > 1) {
      setValue('page', formValues.page - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-white">Find Your Room</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {pagination.total || 0} listings found
            </span>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FilterSidebar 
                control={control}
                watch={watch}
                setValue={setValue}
                handleFilterChange={handleFilterChange}
                handleArrayFilter={handleArrayFilter}
                clearFilters={clearFilters}
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            {/* Loading State */}
            {(isLoading || isFetching) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 animate-pulse" />
                ))}
              </div>
            )}
            
            {/* Error State */}
            {error && !isLoading && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
                Failed to load listings. Please try again later.
                <button 
                  onClick={() => window.location.reload()}
                  className="ml-4 text-sm underline"
                >
                  Retry
                </button>
              </div>
            )}
            
            {/* Listings Grid */}
            {!isLoading && listings.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map(listing => (
                    <ListingCard key={listing?._id} listing={listing} />
                  ))}
                </div>
                
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={formValues.page === 1 || isFetching}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    <span className="text-gray-700 dark:text-gray-300">
                      Page {formValues.page} of {pagination.totalPages}
                    </span>
                    
                    <button
                      onClick={handleNextPage}
                      disabled={!pagination.hasNext || isFetching}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
            
            {/* No Results */}
            {!isLoading && listings.length === 0 && (
              <div className="text-center py-12">
                <Home size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No listings found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Clear all filters
                </button>
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
              <FilterSidebar 
                control={control}
                watch={watch}
                setValue={setValue}
                handleFilterChange={handleFilterChange}
                handleArrayFilter={handleArrayFilter}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}