import { Heart, MapPin, Shield } from "lucide-react";
import { Link } from "react-router";


export const ListingCard = ({ listing }) => {
    console.log(listing);
    return(
    
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            {listing.images?.[0] ? (
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                    No image
                </div>
            )}
            {listing.isVerified && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                    <Shield size={14} />
                    Verified
                </div>
            )}
            <button className="absolute top-2 left-2 bg-white rounded-full p-2 hover:bg-gray-100">
                <Heart size={18} />
            </button>
        </div>

        {/* Content Section */}
        <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{listing.title}</h3>

            <div className="flex items-center gap-1 text-gray-600 mb-3 text-sm">
                <MapPin size={16} />
                <span>{listing.location}</span>
            </div>

            {/* Price */}
            <div className="mb-3 pb-3 border-b">
                <p className="text-2xl font-bold text-blue-600">${listing.rent}/mo</p>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-3 text-sm">
                <p className="text-gray-700">
                    <span className="font-semibold">Type:</span> {listing.roomType} • {listing.propertyType}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Gender:</span> {listing.preferredGender}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Age:</span> {listing.ageMin}-{listing.ageMax}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Available:</span> {new Date(listing.availableFrom).toLocaleDateString()}
                </p>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t mt-auto">
                <span>Posted {new Date(listing.createdAt).toLocaleDateString()}</span>
                {listing.viewCount && <span>{listing.viewCount} views</span>}
            </div>
        </div>

        {/* CTA Button */}
        <div className="p-4 border-t bg-gray-50">
            <Link to={`/details/${listing._id}`}>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View Listing
            </button>
            </Link>
        </div>
    </div>
);}