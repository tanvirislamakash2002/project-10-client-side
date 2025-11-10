import { Heart, MapPin, Shield } from "lucide-react";
import { Link } from "react-router";
import { useFavorite } from "../../../../../hooks/useFavorite";
import useAuth from "../../../../../hooks/useAuth";


export const ListingCard = ({ listing }) => {
    const { user } = useAuth()

    const id = listing?._id

    const { isFavorite, toggleFavorite, isLoading } = useFavorite(id, user?.email);

    // console.log(isFavorite);
    return (

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
            {/* Image Section */}
            <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {listing.images?.[0] ? (
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                        No image
                    </div>
                )}
                {listing.isVerified && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
                        <Shield size={14} />
                        Verified
                    </div>
                )}
                <button
                    onClick={toggleFavorite}
                    className={`
    absolute top-4 right-4 rounded-full p-3 transition-all duration-300
    ${isFavorite
                            ? 'bg-red-500 text-white shadow-lg transform scale-110 animate-pulse'
                            : 'bg-white dark:bg-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-500 hover:text-red-500 border border-gray-200 dark:border-gray-500'
                        }
  `}
                >
                    <Heart
                        size={20}
                        className={`transition-all duration-300 ${isFavorite ? "fill-current" : ""}`}
                    />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-lg mb-1 line-clamp-2 dark:text-white">{listing.title}</h3>

                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-3 text-sm">
                    <MapPin size={16} />
                    <span>{listing.location}</span>
                </div>

                {/* Price */}
                <div className="mb-3 pb-3 border-b dark:border-gray-600">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${listing.rent}/mo</p>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-3 text-sm">
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Type:</span> {listing.roomType} • {listing.propertyType}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Gender:</span> {listing.preferences.gender}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Age:</span> {listing?.preferences?.ageRange?.min}-{listing?.preferences?.ageRange?.max}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Available:</span> {new Date(listing.availableFrom).toLocaleDateString()}
                    </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t dark:border-gray-600 mt-auto">
                    <span>Posted {new Date(listing.createdAt).toLocaleDateString()}</span>
                    {listing.viewCount && <span>{listing.viewCount} views</span>}
                </div>
            </div>

            {/* CTA Button */}
            <div className="p-4 border-t dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <Link to={`/details/${listing._id}`}>

                    <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                        See Details
                    </button>
                </Link>
            </div>
        </div>
    );
}