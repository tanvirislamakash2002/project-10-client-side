// hooks/useListingsQuery.js - FIXED VERSION
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react'; // Add useMemo
import useAxios from '../useAxios';

export const useListingsQuery = (filters = {}) => {
  const axiosInstance = useAxios();
  
  // ✅ MEMOIZE the API filters to prevent infinite re-renders
  const apiFilters = useMemo(() => {
    const prepared = {
      ...filters,
      // Convert boolean to string
      verified_only: filters.verified_only ? 'true' : 'false',
      // Remove empty strings (except numeric values)
    };
    
    // Clean up empty values
    Object.keys(prepared).forEach(key => {
      if (prepared[key] === '' || prepared[key] === null || prepared[key] === undefined) {
        delete prepared[key];
      }
    });
    
    return prepared;
  }, [
    filters.price_min,
    filters.price_max,
    filters.location,
    filters.room_type,
    filters.property_type,
    filters.gender,
    filters.amenities,
    filters.verified_only,
    filters.age_min,
    filters.age_max,
    filters.page,
    filters.limit,
    filters.sort_by,
    filters.sort_order
  ]); // Only recompute when these specific values change
  
  return useQuery({
    queryKey: ['listings', apiFilters], // Now stable
    queryFn: async () => {
      const response = await axiosInstance.get('/api/v1/listings', {
        params: apiFilters
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    keepPreviousData: true
  });
};