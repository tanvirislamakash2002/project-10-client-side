export const ListingCard = ({ props }) => {
    const {handleSelectListing, handleCompare, listing, selectedListings,getStatusBadge,compareListings}=props
    return (<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center text-6xl">
          {listing.image}
        </div>
        <button 
          onClick={() => handleSelectListing(listing.id)}
          className={`absolute top-3 left-3 p-2 rounded-full ${selectedListings.includes(listing.id) ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'} shadow-md hover:scale-110 transition`}
        >
          <CheckCircle className="w-5 h-5" />
        </button>
        <button className="absolute top-3 right-3 p-2 bg-white text-red-500 rounded-full shadow-md hover:bg-red-50 transition">
          <Heart className="w-5 h-5 fill-current" />
        </button>
        {listing.status === 'applied' && (
          <div className="absolute bottom-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Applied {listing.appliedDate}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{listing.title}</h3>
          {getStatusBadge(listing.status)}
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {listing.location}
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Available: {listing.availability}
          </p>
          <p className="text-xl font-bold text-green-600">
            ${listing.price}<span className="text-sm text-gray-600 font-normal">/month</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.map((amenity, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Last viewed: {listing.lastViewed}
          </span>
          <span className="flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            Saved: {listing.savedDate}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {listing.status === 'available' && !listing.applied ? (
            <button className="bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center">
              <Send className="w-4 h-4 mr-1" />
              Apply Now
            </button>
          ) : listing.status === 'applied' ? (
            <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-semibold cursor-not-allowed flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Applied
            </button>
          ) : (
            <button className="bg-gray-100 text-gray-400 py-2 px-3 rounded-lg text-sm font-semibold cursor-not-allowed flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Unavailable
            </button>
          )}
          
          <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-gray-200 transition flex items-center justify-center">
            <Eye className="w-4 h-4 mr-1" />
            View
          </button>
        </div>

        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
          <button 
            onClick={() => handleCompare(listing)}
            className={`flex-1 ${compareListings.find(l => l.id === listing.id) ? 'bg-purple-100 text-purple-700' : 'bg-gray-50 text-gray-600'} py-2 px-3 rounded-lg text-xs font-semibold hover:bg-purple-50 transition flex items-center justify-center`}
          >
            <GitCompare className="w-3 h-3 mr-1" />
            Compare
          </button>
          <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-100 transition flex items-center justify-center">
            <Share2 className="w-3 h-3 mr-1" />
            Share
          </button>
        </div>
      </div>
    </div>)
 }