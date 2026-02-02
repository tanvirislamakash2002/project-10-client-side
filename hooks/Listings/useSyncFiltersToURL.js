// hooks/useSyncFiltersToURL.js - FIXED VERSION
import { useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router';

export const useSyncFiltersToURL = (filters, setValue) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);
  const previousFilters = useRef(filters);

  // Default values to skip in URL
  const defaultFilters = {
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

  // Function to check if filter differs from default
  const isDifferentFromDefault = useCallback((key, value) => {
    return JSON.stringify(value) !== JSON.stringify(defaultFilters[key]);
  }, []);

  // Function to prepare URL params from filters
  const prepareURLParams = useCallback((currentFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (isDifferentFromDefault(key, value)) {
        if (typeof value === 'boolean') {
          params.set(key, value ? 'true' : 'false');
        } else if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(','));
          }
        } else if (value !== '' && value != null) {
          params.set(key, String(value));
        }
      }
    });
    
    return params;
  }, [isDifferentFromDefault]);

  // 1. Update URL when filters change (with comparison)
  useEffect(() => {
    // Skip initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Check if filters actually changed
    const hasChanged = Object.keys(filters).some(key => {
      return JSON.stringify(filters[key]) !== JSON.stringify(previousFilters.current[key]);
    });

    if (hasChanged) {
      const newParams = prepareURLParams(filters);
      const currentParamsString = searchParams.toString();
      const newParamsString = newParams.toString();
      
      // Only update URL if params actually changed
      if (currentParamsString !== newParamsString) {
        setSearchParams(newParams, { replace: true });
      }
      
      previousFilters.current = filters;
    }
  }, [filters, searchParams, setSearchParams, prepareURLParams]);

  // 2. Initialize filters from URL on mount ONLY
  useEffect(() => {
    // Only run on initial mount when URL has params
    if (searchParams.toString() && setValue) {
      const urlFilters = {};
      
      searchParams.forEach((value, key) => {
        // Parse values from string
        if (value === 'true' || value === 'false') {
          urlFilters[key] = value === 'true';
        } else if (!isNaN(value) && value.trim() !== '') {
          urlFilters[key] = Number(value);
        } else if (value.includes(',')) {
          urlFilters[key] = value; // Keep as comma-separated string
        } else {
          urlFilters[key] = value;
        }
      });
      
      // Merge with defaults
      const mergedFilters = { ...defaultFilters, ...urlFilters };
      
      // Update form values ONCE
      Object.entries(mergedFilters).forEach(([key, value]) => {
        if (setValue) {
          setValue(key, value, { shouldValidate: false });
        }
      });
    }
  }, []); // Empty dependency array - runs once on mount

  // Optional: Return helper functions
  const getCurrentURL = () => {
    return `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  };

  return { getCurrentURL };
};