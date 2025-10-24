import React, { useState } from 'react';
import { Heart, Search, Filter, Grid, List, Share2, X, MapPin, Calendar, DollarSign, Eye, Send, Download, ChevronLeft, ChevronRight, ArrowUpDown, GitCompare, CheckCircle, Clock, AlertCircle, Home } from 'lucide-react';
import { ListingCard } from './components/ListingCard';
import { EmptyState } from './components/EmptyState';
import { ComparisonPanel } from './components/ComparisonPanel';

export default function SavedListings() {
    const [view, setView] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [selectedListings, setSelectedListings] = useState([]);
    const [showComparison, setShowComparison] = useState(false);
    const [compareListings, setCompareListings] = useState([]);

    // Mock data
    const savedListings = [
        {
            id: 1,
            title: "Spacious Room in Shared House",
            location: "Downtown, 2.3 miles away",
            price: 800,
            availability: "Nov 1, 2025",
            status: "available",
            lastViewed: "2 hours ago",
            image: "🏠",
            applied: false,
            amenities: ["WiFi", "Parking", "Laundry"],
            roomType: "Private Room",
            savedDate: "Oct 20, 2025"
        },
        {
            id: 2,
            title: "Private Studio Apartment",
            location: "Midtown, 1.8 miles away",
            price: 950,
            availability: "Oct 28, 2025",
            status: "applied",
            lastViewed: "1 day ago",
            image: "🏢",
            applied: true,
            appliedDate: "Oct 21, 2025",
            amenities: ["WiFi", "Gym", "Pool"],
            roomType: "Studio",
            savedDate: "Oct 18, 2025"
        },
        {
            id: 3,
            title: "Room with Private Bath",
            location: "Suburbs, 5.1 miles away",
            price: 650,
            availability: "Nov 15, 2025",
            status: "available",
            lastViewed: "3 days ago",
            image: "🏡",
            applied: false,
            amenities: ["WiFi", "Parking"],
            roomType: "Private Room",
            savedDate: "Oct 15, 2025"
        },
        {
            id: 4,
            title: "Modern Loft Downtown",
            location: "Downtown, 1.2 miles away",
            price: 1200,
            availability: "Dec 1, 2025",
            status: "unavailable",
            lastViewed: "1 week ago",
            image: "🏙️",
            applied: false,
            amenities: ["WiFi", "Gym", "Parking", "Laundry"],
            roomType: "Loft",
            savedDate: "Oct 10, 2025"
        },
        {
            id: 5,
            title: "Cozy Bedroom Near University",
            location: "University Area, 3.5 miles away",
            price: 720,
            availability: "Nov 5, 2025",
            status: "available",
            lastViewed: "5 hours ago",
            image: "🎓",
            applied: false,
            amenities: ["WiFi", "Study Room"],
            roomType: "Private Room",
            savedDate: "Oct 22, 2025"
        }
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case "available":
                return <span className="flex items-center gap-1 text-green-600 text-sm font-medium"><span className="w-2 h-2 bg-green-600 rounded-full"></span>Available</span>;
            case "applied":
                return <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium"><span className="w-2 h-2 bg-yellow-600 rounded-full"></span>Applied</span>;
            case "unavailable":
                return <span className="flex items-center gap-1 text-red-600 text-sm font-medium"><span className="w-2 h-2 bg-red-600 rounded-full"></span>No Longer Available</span>;
            default:
                return null;
        }
    };

    const filteredListings = savedListings.filter(listing => {
        const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const sortedListings = [...filteredListings].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'recent':
            default:
                return new Date(b.savedDate) - new Date(a.savedDate);
        }
    });

    const handleSelectListing = (id) => {
        setSelectedListings(prev =>
            prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
        );
    };

    const handleCompare = (listing) => {
        if (compareListings.find(l => l.id === listing.id)) {
            setCompareListings(prev => prev.filter(l => l.id !== listing.id));
        } else if (compareListings.length < 3) {
            setCompareListings(prev => [...prev, listing]);
        }
    };






    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">Saved Listings</h1>
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {savedListings.length}
                            </span>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center">
                                <Home className="w-4 h-4 mr-2" />
                                Continue Browsing
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center">
                                <Send className="w-4 h-4 mr-2" />
                                Apply to Selected ({selectedListings.length})
                            </button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search within saved listings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="available">Available</option>
                                <option value="applied">Applied</option>
                                <option value="unavailable">Expired</option>
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="recent">Recently Saved</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>

                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <Filter className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setView('grid')}
                                    className={`p-2 ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className={`p-2 ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bulk Actions Bar */}
                    {selectedListings.length > 0 && (
                        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                            <span className="text-blue-900 font-semibold">
                                {selectedListings.length} listing{selectedListings.length > 1 ? 's' : ''} selected
                            </span>
                            <div className="flex gap-2">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                                    Bulk Apply
                                </button>
                                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition border border-gray-300">
                                    Remove All
                                </button>
                                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition border border-gray-300 flex items-center">
                                    <Download className="w-4 h-4 mr-1" />
                                    Export
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Comparison Bar */}
                    {compareListings.length > 0 && (
                        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <GitCompare className="w-5 h-5 text-purple-600" />
                                <span className="text-purple-900 font-semibold">
                                    {compareListings.length} listing{compareListings.length > 1 ? 's' : ''} to compare
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowComparison(true)}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition"
                                >
                                    Compare Now
                                </button>
                                <button
                                    onClick={() => setCompareListings([])}
                                    className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition border border-gray-300"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {sortedListings.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                        {sortedListings.map((listing) => (
                            <ListingCard key={listing.id} props={{ handleSelectListing, handleCompare, selectedListings, getStatusBadge, compareListings,listing }}/>
                        ))}
                    </div>
                )}

                {/* Similar Listings Section */}
                {sortedListings.length > 0 && (
                    <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">You Might Also Like</h2>
                        <p className="text-gray-600 mb-4">Based on your saved preferences</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer">
                                    <div className="text-4xl mb-2">🏘️</div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Similar Listing {i}</h4>
                                    <p className="text-sm text-gray-600">Close to your saved locations</p>
                                    <p className="text-green-600 font-bold mt-2">$750/month</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showComparison && <ComparisonPanel props={{compareListings,setShowComparison}}/>}
        </div>
    );
}