import { Heart, MapPin, Shield, Calendar, Eye, Users, Home, Building2 } from "lucide-react";
import { Link } from "react-router";
import { useFavorite } from "../../../../../hooks/useFavorite";
import useAuth from "../../../../../hooks/useAuth";

export const ListingCard = ({ listing }) => {
    const { user } = useAuth();
    const id = listing?._id;
    const { isFavorite, toggleFavorite, isLoading } = useFavorite(id, user?.email);

    return (
        <Link to={`/details/${listing._id}`} className="block h-full">
            <div className="group bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-base-300 hover:border-primary/40">
                {/* Image Section */}
                <div className="relative w-full h-52 bg-base-200 overflow-hidden">
                    {listing.images?.[0] ? (
                        <img 
                            src={listing.images[0]} 
                            alt={listing.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-base-300 text-base-content/30">
                            <Home size={48} strokeWidth={1.5} />
                        </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Verified Badge */}
                    {listing.isVerified && (
                        <div className="absolute top-3 left-3 bg-verified-badge text-verified-badge-content px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm">
                            <Shield size={14} fill="currentColor" />
                            Verified
                        </div>
                    )}
                    
                    {/* Favorite Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite();
                        }}
                        disabled={isLoading}
                        className={`
                            absolute top-3 right-3 rounded-full p-2.5 transition-all duration-300 shadow-lg backdrop-blur-sm
                            ${isFavorite
                                ? 'bg-error text-error-content scale-110'
                                : 'bg-base-100/90 text-base-content/70 hover:bg-base-100 hover:text-error hover:scale-110'
                            }
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <Heart
                            size={18}
                            className={`transition-all duration-300 ${isFavorite ? "fill-current" : ""}`}
                            strokeWidth={2}
                        />
                    </button>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-grow flex flex-col">
                    {/* Title */}
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 text-base-content group-hover:text-primary transition-colors">
                        {listing.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-text-muted mb-4 text-sm">
                        <MapPin size={16} strokeWidth={2} className="flex-shrink-0" />
                        <span className="line-clamp-1">{listing.location.type}</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4 pb-4 border-b border-base-300">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-primary">${listing.rent}</span>
                            <span className="text-sm text-text-muted font-medium">/month</span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-start gap-2">
                            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <Home size={16} className="text-accent-content" strokeWidth={2} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-text-muted mb-0.5">Type</p>
                                <p className="font-semibold text-base-content text-sm truncate">
                                    {listing.roomType}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                <Building2 size={16} className="text-secondary" strokeWidth={2} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-text-muted mb-0.5">Property</p>
                                <p className="font-semibold text-base-content text-sm truncate">
                                    {listing.propertyType}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-9 h-9 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                                <Users size={16} className="text-info" strokeWidth={2} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-text-muted mb-0.5">Gender</p>
                                <p className="font-semibold text-base-content text-sm truncate">
                                    {listing.preferredGender}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                                <Calendar size={16} className="text-warning" strokeWidth={2} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-text-muted mb-0.5">Age Range</p>
                                <p className="font-semibold text-base-content text-sm truncate">
                                    {listing?.preferences?.ageRange?.min}-{listing?.preferences?.ageRange?.max}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Available From */}
                    <div className="bg-base-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-text-muted font-medium">Available From</span>
                            <span className="text-sm font-semibold text-base-content">
                                {new Date(listing.availableFrom).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-text-muted pt-3 border-t border-base-300 mt-auto">
                        <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>
                                {new Date(listing.createdAt).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}
                            </span>
                        </div>
                        {listing.viewCount && (
                            <div className="flex items-center gap-1">
                                <Eye size={12} />
                                <span>{listing.viewCount} views</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="p-4 border-t border-base-300 bg-base-200">
                    <button className="w-full bg-primary text-primary-content py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
}