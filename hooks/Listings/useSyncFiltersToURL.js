// hooks/useSyncFiltersToURL.js
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { prepareFiltersForAPI } from '../../utils/filterUtils';

export const useSyncFiltersToURL = (filters) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Update URL when filters change
  useEffect(() => {
    const apiFilters = prepareFiltersForAPI(filters);
    setSearchParams(apiFilters);
  }, [filters, setSearchParams]);
  
  // Initialize filters from URL on mount
  useEffect(() => {
    const urlFilters = {};
    searchParams.forEach((value, key) => {
      urlFilters[key] = value;
    });
    // Set initial form values from URL
    // (You'll need to pass setValue from useForm)
  }, []);
};