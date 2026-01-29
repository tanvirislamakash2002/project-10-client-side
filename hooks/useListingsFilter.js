import { useMemo } from "react";

export const useListingsFilter = (listings, filters) => {
  const filteredListings = useMemo(() => {
    if (!Array.isArray(listings)) return [];
    


    const result = listings.filter(listing => {


      // Only show accepted listings
      if (listing.status !== 'accepted') {

        return false;
      }

      // Price filter
      const rent = Number(listing.rent);
      if (rent < filters.priceMin || rent > filters.priceMax) {

        return false;
      }

      // Location filter
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        const cityMatch = listing.address?.city?.toLowerCase().includes(searchTerm);
        const stateMatch = listing.address?.state?.toLowerCase().includes(searchTerm);
        const streetMatch = listing.address?.street?.toLowerCase().includes(searchTerm);

        
        if (!cityMatch && !stateMatch && !streetMatch) {
          return false;
        }
      }

      // Room type filter
      if (filters.roomType.length > 0 && !filters.roomType.includes(listing.roomType)) {

        return false;
      }

      // Property type filter
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(listing.propertyType)) {
 
        return false;
      }

      // Gender preference filter

      if (filters.gender !== 'any' && 
          listing.preferredGender !== 'No Preference' && 
          listing.preferredGender !== filters.gender) {
        return false;
      }

      // Verified filter

      if (filters.verifiedOnly && !listing.poster?.verified) {
        
        return false;
      }

      // Age range filter

      if (listing.preferredAgeRange?.min && listing.preferredAgeRange?.max) {
        if (filters.ageMax < listing.preferredAgeRange.min || filters.ageMin > listing.preferredAgeRange.max) {
          return false;
        }
      }

      // Amenities filter

      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity =>
          listing.amenities?.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });


    return result;
  }, [listings, filters]);

  return filteredListings;
};