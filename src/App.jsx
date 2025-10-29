// // pages/SavedListingsPage.jsx
// import React, { useState } from 'react';
// import { useFavorites } from '../../hooks/useFavorites';
// import useAuth from '../../hooks/useAuth';
// import { Trash2, Select, Check, Home, MapPin, DollarSign } from 'lucide-react';

// export default function SavedListingsPage() {
//   const { user } = useAuth();
//   const { favorites, isLoading, bulkRemoveFavorites, isBulkRemoving } = useFavorites(user?.email);
//   const [selectedFavorites, setSelectedFavorites] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);

//   // Toggle selection for a single favorite
//   const toggleSelection = (favoriteId) => {
//     const newSelected = new Set(selectedFavorites);
//     if (newSelected.has(favoriteId)) {
//       newSelected.delete(favoriteId);
//     } else {
//       newSelected.add(favoriteId);
//     }
//     setSelectedFavorites(newSelected);
//     setSelectAll(newSelected.size === favorites.length);
//   };

//   // Toggle select all
//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedFavorites(new Set());
//     } else {
//       const allIds = new Set(favorites.map(fav => fav._id));
//       setSelectedFavorites(allIds);
//     }
//     setSelectAll(!selectAll);
//   };

//   // Handle bulk remove
//   const handleBulkRemove = () => {
//     if (selectedFavorites.size === 0) return;
    
//     if (window.confirm(`Are you sure you want to remove ${selectedFavorites.size} favorite(s)?`)) {
//       bulkRemoveFavorites(Array.from(selectedFavorites));
//       setSelectedFavorites(new Set());
//       setSelectAll(false);
//     }
//   };

//   // Clear selection
//   const clearSelection = () => {
//     setSelectedFavorites(new Set());
//     setSelectAll(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="loading loading-spinner loading-lg"></div>
//         <span className="ml-2">Loading your favorites...</span>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Please Login</h2>
//           <p className="text-gray-600">Login to view your saved listings</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header with Bulk Actions */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Saved Listings</h1>
//             <p className="text-gray-600 mt-2">
//               {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
//             </p>
//           </div>

//           {/* Bulk Actions */}
//           {selectedFavorites.size > 0 && (
//             <div className="flex items-center gap-3 mt-4 sm:mt-0">
//               <span className="text-sm text-gray-600">
//                 {selectedFavorites.size} selected
//               </span>
//               <button
//                 onClick={clearSelection}
//                 className="text-sm text-gray-600 hover:text-gray-800"
//               >
//                 Clear
//               </button>
//               <button
//                 onClick={handleBulkRemove}
//                 disabled={isBulkRemoving}
//                 className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Trash2 size={16} />
//                 {isBulkRemoving ? 'Removing...' : `Remove (${selectedFavorites.size})`}
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Selection Controls */}
//         {favorites.length > 0 && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     checked={selectAll}
//                     onChange={toggleSelectAll}
//                     className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                   />
//                   {selectAll && (
//                     <Check size={14} className="absolute top-1 left-1 text-white pointer-events-none" />
//                   )}
//                 </div>
//                 <span className="text-sm font-medium text-gray-900">
//                   Select all {favorites.length} listings
//                 </span>
//               </label>
              
//               {selectedFavorites.size > 0 && (
//                 <button
//                   onClick={handleBulkRemove}
//                   disabled={isBulkRemoving}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium"
//                 >
//                   Remove selected
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Favorites Grid */}
//         {favorites.length === 0 ? (
//           <div className="text-center py-12">
//             <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved listings yet</h3>
//             <p className="text-gray-600">Start browsing and save your favorite rooms!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {favorites.map((favorite) => (
//               <FavoriteCard 
//                 key={favorite._id} 
//                 favorite={favorite}
//                 isSelected={selectedFavorites.has(favorite._id)}
//                 onToggleSelect={() => toggleSelection(favorite._id)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Updated Favorite Card Component with Selection
// function FavoriteCard({ favorite, isSelected, onToggleSelect }) {
//   const { listing } = favorite;

//   return (
//     <div className={`
//       bg-white rounded-lg shadow-sm border-2 overflow-hidden transition-all
//       ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:shadow-md'}
//     `}>
//       {/* Selection Checkbox */}
//       <div className="absolute top-3 left-3 z-10">
//         <label className="cursor-pointer">
//           <div className="relative">
//             <input
//               type="checkbox"
//               checked={isSelected}
//               onChange={onToggleSelect}
//               className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//             />
//             {isSelected && (
//               <Check size={14} className="absolute top-1 left-1 text-white pointer-events-none" />
//             )}
//           </div>
//         </label>
//       </div>

//       {/* Image */}
//       <div className="relative h-48 bg-gray-100">
//         {listing.images && listing.images.length > 0 ? (
//           <img
//             src={listing.images[0]}
//             alt={listing.title}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
//             <Home className="w-12 h-12 text-gray-400" />
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
//           {listing.title}
//         </h3>
        
//         <div className="flex items-center text-gray-600 mb-2">
//           <MapPin size={16} className="mr-1" />
//           <span className="text-sm">{listing.location || 'Location not specified'}</span>
//         </div>

//         <div className="flex items-center justify-between mt-4">
//           <div className="flex items-center text-green-600 font-semibold">
//             <DollarSign size={18} />
//             <span className="text-xl">{listing.rent || 'N/A'}</span>
//             <span className="text-sm text-gray-600 ml-1">/month</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
//           <span className="text-xs text-gray-500">
//             Added {new Date(favorite.createdAt).toLocaleDateString()}
//           </span>
//           <button 
//             onClick={onToggleSelect}
//             className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//           >
//             {isSelected ? 'Deselect' : 'Select'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }