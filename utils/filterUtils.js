export const prepareFiltersForAPI = (filters) => {
  // Convert arrays to comma-separated strings
  const apiFilters = {
    ...filters,
    // Convert boolean to string 'true'/'false'
    verified_only: filters.verified_only ? 'true' : 'false',
    // Convert numbers to strings if needed
    price_min: String(filters.price_min),
    price_max: String(filters.price_max),
    age_min: String(filters.age_min),
    age_max: String(filters.age_max),
    page: String(filters.page),
    limit: String(filters.limit)
  };
  
  // Remove empty values
  Object.keys(apiFilters).forEach(key => {
    if (apiFilters[key] === '' || apiFilters[key] === false) {
      delete apiFilters[key];
    }
  });
  
  return apiFilters;
};

export const convertFromAPIFilters = (apiFilters) => {
  // Convert comma strings back to arrays for UI
  return {
    ...apiFilters,
    room_type: apiFilters.room_type ? apiFilters.room_type.split(',') : [],
    property_type: apiFilters.property_type ? apiFilters.property_type.split(',') : [],
    amenities: apiFilters.amenities ? apiFilters.amenities.split(',') : [],
    verified_only: apiFilters.verified_only === 'true'
  };
};