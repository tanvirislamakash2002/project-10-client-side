import { X } from "lucide-react";

export const ComparisonPanel = ({ props }) => {
    const { compareListings, setShowComparison } = props;
    const { availableFrom, description, images, location, poster, preferences, rent, status, title, _id } = compareListings
    console.log(compareListings);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Compare Listings</h2>
                    <button onClick={() => setShowComparison(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-3 gap-6">
                        {compareListings.map((listing) => (
                            <div key={listing._id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center overflow-hidden">
                                    {listing?.images && listing?.images[0] ? (
                                        <img
                                            src={listing?.images[0]}
                                            alt={listing?.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-6xl">🏠</div>
                                    )}
                                </div>
                                <div className="p-4 space-y-3">
                                    <h3 className="font-bold text-gray-900">{listing?.title}</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Price:</span>
                                            <span className="font-semibold text-green-600">${listing?.rent}/mo</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Location:</span>
                                            <span className="font-semibold">{listing?.location}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Type:</span>
                                            <span className="font-semibold">{'roomType'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Available:</span>
                                            <span className="font-semibold">{'availability'}</span>
                                        </div>
                                        <div className="pt-2 border-t border-gray-200">
                                            <p className="text-gray-600 mb-2">Amenities:</p>
                                            {/* <div className="flex flex-wrap gap-1">
                                            {preferences.map((amenity, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div> */}
                                        </div>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-4">
                                        Choose This One
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}