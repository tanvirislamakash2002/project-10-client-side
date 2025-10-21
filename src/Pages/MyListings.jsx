import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Plus, Search, Filter, Eye, Edit, Copy, Trash2, TrendingUp,
    MapPin, DollarSign, Calendar, MessageSquare, Heart,
    MoreVertical, Download, CheckSquare, X, AlertCircle,
    Home, Layers, Grid, List, ArrowUpDown
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

export default function MyListingsPage() {
    const [selectedTab, setSelectedTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [selectedListings, setSelectedListings] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch listings
    const { data: RoomData = [], isLoading, error } = useQuery({
        queryKey: ['listings'],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_API_URL}/add-roommate`)
                .then(res => res.json())
    });


    const handleDelete = (id) => {
        Swal.fire({
            title: `Are you sure? you want to delete id: ${id}`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`${import.meta.env.VITE_API_URL}/add-roommate/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('after delete', data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    // Calculate statistics
    const stats = useMemo(() => {
        const listings = Array.isArray(RoomData) ? RoomData : [];
        return {
            total: listings.length,
            active: listings.filter(l => l.status === 'accepted').length,
            pending: listings.filter(l => l.status === 'pending').length,
            rejected: listings.filter(l => l.status === 'rejected').length,
            drafts: listings.filter(l => l.status === 'draft').length,
            totalViews: listings.reduce((sum, l) => sum + (l.viewCount || 0), 0),
            totalInquiries: listings.reduce((sum, l) => sum + (l.inquiries || 0), 0),
            totalFavorites: listings.reduce((sum, l) => sum + (l.favorites || 0), 0),
        };
    }, [RoomData]);

    // Filter and sort listings
    const filteredListings = useMemo(() => {
        let listings = Array.isArray(RoomData) ? [...RoomData] : [];

        // Filter by status
        if (selectedTab !== 'all') {
            listings = listings.filter(l => {
                if (selectedTab === 'active') return l.status === 'accepted';
                if (selectedTab === 'pending') return l.status === 'pending';
                if (selectedTab === 'rejected') return l.status === 'rejected';
                if (selectedTab === 'drafts') return l.status === 'draft';
                return true;
            });
        }

        // Search filter
        if (searchQuery) {
            listings = listings.filter(l =>
                l.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.location?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        switch (sortBy) {
            case 'newest':
                listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                listings.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'mostViews':
                listings.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
                break;
            case 'mostInquiries':
                listings.sort((a, b) => (b.inquiries || 0) - (a.inquiries || 0));
                break;
            case 'priceHigh':
                listings.sort((a, b) => (b.rent || 0) - (a.rent || 0));
                break;
            case 'priceLow':
                listings.sort((a, b) => (a.rent || 0) - (b.rent || 0));
                break;
        }

        return listings;
    }, [RoomData, selectedTab, searchQuery, sortBy]);

    const getStatusBadge = (status) => {
        const badges = {
            accepted: { label: 'Active', class: 'bg-green-100 text-green-700 border-green-200' },
            pending: { label: 'Pending', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
            rejected: { label: 'Rejected', class: 'bg-red-100 text-red-700 border-red-200' },
            draft: { label: 'Draft', class: 'bg-gray-100 text-gray-700 border-gray-200' },
        };
        return badges[status] || badges.draft;
    };

    const handleSelectListing = (id) => {
        setSelectedListings(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedListings.length === filteredListings.length) {
            setSelectedListings([]);
        } else {
            setSelectedListings(filteredListings.map(l => l.id));
        }
    };

    const StatCard = ({ icon: Icon, label, value, subValue, iconColor }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
                </div>
                <div className={`p-3 rounded-lg ${iconColor}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
        </div>
    );

    const ListingCard = ({ listing }) => {
        const status = getStatusBadge(listing.status);

        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {listing.images?.[0] ? (
                        <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                            <Home size={48} />
                        </div>
                    )}

                    {/* Checkbox */}
                    <div className="absolute top-3 left-3">
                        <input
                            type="checkbox"
                            checked={selectedListings.includes(listing.id)}
                            onChange={() => handleSelectListing(listing.id)}
                            className="w-5 h-5 rounded border-2 border-white shadow-lg cursor-pointer"
                        />
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.class}`}>
                            {status.label}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                        {listing.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                        <MapPin size={16} />
                        <span className="line-clamp-1">{listing.location}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-700">
                            <DollarSign size={16} className="text-green-600" />
                            <span className="font-bold text-green-600">${listing.rent}/mo</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                            <Calendar size={16} />
                            <span>{new Date(listing.availableDate).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Eye size={14} />
                            <span>{listing.viewCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                            <MessageSquare size={14} />
                            <span>{listing.inquiries || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Heart size={14} />
                            <span>{listing.favorites || 0}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                            <Edit size={16} />
                            Edit
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Eye size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Copy size={18} className="text-gray-600" />
                        </button>
                        <button onClick={() => handleDelete(listing._id)} className="p-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                            <Trash2 size={18} className="text-red-600" />
                        </button>
                    </div>

                    {/* Date Info */}
                    <p className="text-xs text-gray-500 mt-3">
                        Updated {new Date(listing.updatedAt || listing.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        );
    };

    const TableRow = ({ listing }) => {
        const status = getStatusBadge(listing.status);

        return (
            <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">
                    <input
                        type="checkbox"
                        checked={selectedListings.includes(listing.id)}
                        onChange={() => handleSelectListing(listing.id)}
                        className="w-4 h-4 rounded cursor-pointer"
                    />
                </td>
                <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            {listing.images?.[0] ? (
                                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Home size={24} className="text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 line-clamp-1">{listing.title}</p>
                            <p className="text-sm text-gray-600 line-clamp-1">{listing.location}</p>
                        </div>
                    </div>
                </td>
                <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${status.class}`}>
                        {status.label}
                    </span>
                </td>
                <td className="py-4 px-4 font-semibold text-green-600">
                    ${listing.rent}/mo
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(listing.availableDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-center text-sm text-gray-600">
                    {listing.viewCount || 0}
                </td>
                <td className="py-4 px-4 text-center text-sm text-gray-600">
                    {listing.inquiries || 0}
                </td>
                <td className="py-4 px-4 text-center text-sm text-gray-600">
                    {listing.favorites || 0}
                </td>
                <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-green-50 rounded-lg transition-colors">
                            <Edit size={16} className="text-green-600" />
                        </button>
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={16} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Copy size={16} className="text-gray-600" />
                        </button>
                        <button onClick={() => handleDelete(listing._id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} className="text-red-600" />
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your listings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
                <h3 className="text-xl font-bold text-red-900 mb-2">Failed to load listings</h3>
                <p className="text-red-700">Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                    <p className="text-gray-600 mt-1">Manage and track your room listings</p>
                </div>
                <Link to={'/dashboard/listings/new'}>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg shadow-green-600/30">
                        <Plus size={20} />
                        Create New Listing
                    </button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Layers}
                    label="Total Listings"
                    value={stats.total}
                    subValue={`${stats.active} active`}
                    iconColor="bg-blue-500"
                />
                <StatCard
                    icon={Eye}
                    label="Total Views"
                    value={stats.totalViews}
                    subValue="All time"
                    iconColor="bg-purple-500"
                />
                <StatCard
                    icon={MessageSquare}
                    label="Total Inquiries"
                    value={stats.totalInquiries}
                    subValue="Pending responses"
                    iconColor="bg-green-500"
                />
                <StatCard
                    icon={Heart}
                    label="Total Favorites"
                    value={stats.totalFavorites}
                    subValue="By seekers"
                    iconColor="bg-pink-500"
                />
            </div>

            {/* Status Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
                <div className="flex flex-wrap gap-2">
                    {[
                        { key: 'all', label: 'All', count: stats.total },
                        { key: 'active', label: 'Active', count: stats.active },
                        { key: 'pending', label: 'Pending', count: stats.pending },
                        { key: 'rejected', label: 'Rejected', count: stats.rejected },
                        { key: 'drafts', label: 'Drafts', count: stats.drafts },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setSelectedTab(tab.key)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedTab === tab.key
                                ? 'bg-green-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {tab.label}
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${selectedTab === tab.key ? 'bg-white/20' : 'bg-gray-300'
                                }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="mostViews">Most Views</option>
                        <option value="mostInquiries">Most Inquiries</option>
                        <option value="priceHigh">Price: High to Low</option>
                        <option value="priceLow">Price: Low to High</option>
                    </select>

                    {/* View Mode Toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg border transition-colors ${viewMode === 'grid'
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-lg border transition-colors ${viewMode === 'table'
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedListings.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                        <span className="text-sm font-medium text-green-900">
                            {selectedListings.length} listing(s) selected
                        </span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                Export
                            </button>
                            <button className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                Change Status
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                                Delete
                            </button>
                            <button
                                onClick={() => setSelectedListings([])}
                                className="p-1 hover:bg-white rounded transition-colors"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Listings Display */}
            {filteredListings.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Home size={40} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No listings found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchQuery
                                ? "Try adjusting your search or filters"
                                : "Get started by creating your first listing"}
                        </p>
                        <Link to={'/dashboard/listings/new'}>
                            <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2">
                                <Plus size={20} />
                                Create Your First Listing
                            </button>
                        </Link>
                        <div className="mt-8 text-left bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-900 mb-2">Tips for effective listings:</h4>
                            <ul className="space-y-1 text-sm text-blue-800">
                                <li>• Add high-quality photos (at least 5)</li>
                                <li>• Write detailed, honest descriptions</li>
                                <li>• Set competitive pricing</li>
                                <li>• Respond to inquiries within 24 hours</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="py-3 px-4 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedListings.length === filteredListings.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 rounded cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Listing</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Available</th>
                                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Views</th>
                                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Inquiries</th>
                                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Favorites</th>
                                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredListings.map(listing => (
                                    <TableRow key={listing.id} listing={listing} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}