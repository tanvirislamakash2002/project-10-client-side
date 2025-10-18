import { useMemo } from "react";

export const useListingsFilter = (RoomData, filters) => {
  // Filter listings
   const filteredListings = useMemo(() => {
    if (!Array.isArray(RoomData)) return [];

    return RoomData.filter(post => {
      // Only show accepted listings
      if (post.status !== 'accepted') return false;

      // Price filter
      if (post.rent < filters.priceMin || post.rent > filters.priceMax) return false;

      // Location filter
      if (filters.location && !post.location?.toLowerCase().includes(filters.location.toLowerCase())) return false;

      // Room type filter
      if (filters.roomType.length > 0 && !filters.roomType.includes(post.roomType)) return false;

      // Property type filter
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(post.propertyType)) return false;

      // Gender preference filter
      if (filters.gender !== 'any' && post.preferredGender !== 'any' && post.preferredGender !== filters.gender) return false;

      // Verified filter
      if (filters.verifiedOnly && !post.isVerified) return false;

      // Age range filter
      if (post.ageMin && post.ageMax) {
        if (filters.ageMax < post.ageMin || filters.ageMin > post.ageMax) return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity =>
          post.amenities?.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [RoomData, filters]);

  return filteredListings

}