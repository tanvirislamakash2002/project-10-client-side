import { useMemo } from "react";

export const useListingsFilter = (listings, filters) => {
  const filteredListings = useMemo(() => {
    if (!Array.isArray(listings)) return [];
    
    console.log('=== STARTING FILTER ===');
    console.log('Total listings:', listings.length);
    console.log('Current filters:', filters);

    const result = listings.filter(listing => {
      console.log(`\n--- Checking listing: ${listing.title} ---`);
      console.log('Full listing data:', listing);

      // Only show accepted listings
      if (listing.status !== 'accepted') {
        console.log('❌ FILTERED OUT: status is not "accepted"', listing.status);
        return false;
      }
      console.log('✅ PASSED: status check');

      // Price filter
      const rent = Number(listing.rent);
      if (rent < filters.priceMin || rent > filters.priceMax) {
        console.log('❌ FILTERED OUT: price out of range', { rent, min: filters.priceMin, max: filters.priceMax });
        return false;
      }
      console.log('✅ PASSED: price check');

      // Location filter
      if (filters.location) {
        const searchTerm = filters.location.toLowerCase();
        const cityMatch = listing.address?.city?.toLowerCase().includes(searchTerm);
        const stateMatch = listing.address?.state?.toLowerCase().includes(searchTerm);
        const streetMatch = listing.address?.street?.toLowerCase().includes(searchTerm);
        
        console.log('Location check:', { 
          searchTerm, 
          city: listing.address?.city, 
          state: listing.address?.state,
          street: listing.address?.street,
          matches: { cityMatch, stateMatch, streetMatch }
        });
        
        if (!cityMatch && !stateMatch && !streetMatch) {
          console.log('❌ FILTERED OUT: location mismatch');
          return false;
        }
      }
      console.log('✅ PASSED: location check');

      // Room type filter
      if (filters.roomType.length > 0 && !filters.roomType.includes(listing.roomType)) {
        console.log('❌ FILTERED OUT: room type mismatch', { 
          listingRoomType: listing.roomType, 
          filterRoomTypes: filters.roomType 
        });
        return false;
      }
      console.log('✅ PASSED: room type check');

      // Property type filter
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(listing.propertyType)) {
        console.log('❌ FILTERED OUT: property type mismatch', { 
          listingPropertyType: listing.propertyType, 
          filterPropertyTypes: filters.propertyType 
        });
        return false;
      }
      console.log('✅ PASSED: property type check');

      // Gender preference filter
      console.log('Gender check:', { 
        filterGender: filters.gender, 
        listingGender: listing.preferredGender 
      });
      if (filters.gender !== 'any' && 
          listing.preferredGender !== 'No Preference' && 
          listing.preferredGender !== filters.gender) {
        console.log('❌ FILTERED OUT: gender mismatch');
        return false;
      }
      console.log('✅ PASSED: gender check');

      // Verified filter
      console.log('Verified check:', { 
        verifiedOnly: filters.verifiedOnly, 
        posterVerified: listing.poster?.verified 
      });
      if (filters.verifiedOnly && !listing.poster?.verified) {
        console.log('❌ FILTERED OUT: not verified');
        return false;
      }
      console.log('✅ PASSED: verified check');

      // Age range filter
      console.log('Age range check:', { 
        filterAge: { min: filters.ageMin, max: filters.ageMax },
        listingAge: listing.preferredAgeRange 
      });
      if (listing.preferredAgeRange?.min && listing.preferredAgeRange?.max) {
        if (filters.ageMax < listing.preferredAgeRange.min || filters.ageMin > listing.preferredAgeRange.max) {
          console.log('❌ FILTERED OUT: age range mismatch');
          return false;
        }
      }
      console.log('✅ PASSED: age range check');

      // Amenities filter
      console.log('Amenities check:', { 
        filterAmenities: filters.amenities,
        listingAmenities: listing.amenities 
      });
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity =>
          listing.amenities?.includes(amenity)
        );
        if (!hasAllAmenities) {
          console.log('❌ FILTERED OUT: amenities missing');
          return false;
        }
      }
      console.log('✅ PASSED: amenities check');

      console.log('🎉 LISTING PASSED ALL FILTERS!');
      return true;
    });

    console.log('=== FILTERING COMPLETE ===');
    console.log('Final results:', result.length, 'listings');
    console.log('Results:', result);
    return result;
  }, [listings, filters]);

  return filteredListings;
};