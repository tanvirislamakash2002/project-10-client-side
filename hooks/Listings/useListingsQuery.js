// hooks/useListingsQuery.js - FIXED
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import useAxios from '../useAxios';

export const useListingsQuery = (filters = {}) => {
  const axiosInstance = useAxios();
  
  const apiFilters = useMemo(() => {
    if (!filters) return {};
    
    // Define what "empty/default" means for each field
    const defaults = {
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
    };
    
    const cleaned = {};
    
    // Only include NON-DEFAULT, NON-EMPTY values
    Object.entries(filters).forEach(([key, value]) => {
      const defaultValue = defaults[key];
      
      // Skip if empty string, null, or undefined
      if (value === '' || value === null || value === undefined) {
        return;
      }
      
      // Skip if matches default value
      const isDefault = JSON.stringify(value) === JSON.stringify(defaultValue);
      
      if (!isDefault) {
        // Convert boolean to string
        if (typeof value === 'boolean') {
          cleaned[key] = value ? 'true' : 'false';
        } else {
          cleaned[key] = value;
        }
      }
    });
    
    // ALWAYS include pagination (but not if it's page 1)
    if (filters.page && filters.page !== 1) {
      cleaned.page = filters.page;
    }
    
    if (filters.limit && filters.limit !== 20) {
      cleaned.limit = filters.limit;
    }
    
    console.log('🧹 Cleaned filters (sent to API):', cleaned);
    console.log('📤 URL will be:', `/api/v1/listings?${new URLSearchParams(cleaned).toString()}`);
    
    return cleaned;
  }, [filters]);
  
  return useQuery({
    queryKey: ['listings', apiFilters],
    queryFn: async () => {
      console.log('🚀 Making API call with cleaned filters:', apiFilters);
      
      const response = await axiosInstance.get('/api/v1/listings', {
        params: apiFilters
      });
      
      console.log('✅ API Response:', {
        success: response.data.success,
        count: response.data.data?.length,
        total: response.data.pagination?.total,
        firstListing: response.data.data?.[0]
      });
      
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    keepPreviousData: true
  });
};