import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Home, 
  Search, 
  Filter,
  X,
  Clock,
  Eye,
  MessageSquare,
  MoreVertical,
  Archive,
  Trash2,
  ExternalLink,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Dog,
  Cigarette,
  Bed,
  Bath,
  Wifi,
  ParkingCircle,
  Users,
  ArrowUpDown,
  Send
} from 'lucide-react';

// Mock data - replace with actual API data
const mockApplications = [
  {
    _id: "698b3925f26ccd99b31dad85",
    listingId: "697cdc121aaf8f61c40c2dbf",
    applicantId: "69860b6c9b5a62d35f79733b",
    providerId: "6985e1bec4e46b59c27fa059",
    status: "pending",
    moveInDate: "2026-11-01",
    leaseDuration: "6 months",
    budget: 800,
    archived: false,
    message: "Hi, there! Your room looks amazing and matches exactly what I'm looking for.",
    contactMethod: "in-app",
    pets: "No",
    smoker: "No",
    createdAt: "2026-02-10T13:56:53.493Z",
    updatedAt: "2026-02-10T13:56:53.493Z",
    // Mock listing data
    listing: {
      title: "Cozy Private Room in Downtown",
      location: "Downtown, San Francisco",
      price: 850,
      roomType: "Private",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
      amenities: ["WiFi", "Parking", "Laundry"]
    },
    // Mock provider data
    provider: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      responseRate: 95,
      avgResponseTime: "2 hours"
    }
  },
  {
    _id: "698b3925f26ccd99b31dad86",
    listingId: "697cdc121aaf8f61c40c2dc0",
    applicantId: "69860b6c9b5a62d35f79733b",
    providerId: "6985e1bec4e46b59c27fa060",
    status: "approved",
    moveInDate: "2026-03-15",
    leaseDuration: "12 months",
    budget: 1200,
    archived: false,
    message: "I'm very interested in this room. I'm a quiet professional.",
    contactMethod: "phone",
    pets: "Yes",
    smoker: "No",
    createdAt: "2026-02-08T10:30:00.000Z",
    updatedAt: "2026-02-09T15:45:00.000Z",
    listing: {
      title: "Modern Studio Near Tech Hub",
      location: "Mission District, San Francisco",
      price: 1250,
      roomType: "Private",
      image: "https://images.unsplash.com/photo-1502672260066-6bc35f0a1e1e?w=400",
      amenities: ["WiFi", "Gym", "Pool"]
    },
    provider: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=12",
      responseRate: 88,
      avgResponseTime: "4 hours"
    }
  },
  {
    _id: "698b3925f26ccd99b31dad87",
    listingId: "697cdc121aaf8f61c40c2dc1",
    applicantId: "69860b6c9b5a62d35f79733b",
    providerId: "6985e1bec4e46b59c27fa061",
    status: "rejected",
    moveInDate: "2026-04-01",
    leaseDuration: "6 months",
    budget: 700,
    archived: false,
    message: "Looking for a budget-friendly option.",
    contactMethod: "email",
    pets: "No",
    smoker: "No",
    createdAt: "2026-02-05T08:20:00.000Z",
    updatedAt: "2026-02-06T12:00:00.000Z",
    listing: {
      title: "Shared Room in Sunset District",
      location: "Sunset District, San Francisco",
      price: 650,
      roomType: "Shared",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      amenities: ["WiFi", "Kitchen"]
    },
    provider: {
      name: "Emma Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=9",
      responseRate: 75,
      avgResponseTime: "1 day"
    }
  }
];

const MyApplications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dateRange, setDateRange] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'pending').length;
    const approved = applications.filter(a => a.status === 'approved').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;
    const archived = applications.filter(a => a.archived).length;
    const successRate = total > 0 ? ((approved / total) * 100).toFixed(0) : 0;
    
    return { total, pending, approved, rejected, archived, successRate };
  }, [applications]);

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = applications.filter(app => {
      // Status filter
      if (selectedStatus !== 'all' && app.status !== selectedStatus) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          app.listing.title.toLowerCase().includes(query) ||
          app.listing.location.toLowerCase().includes(query) ||
          app.provider.name.toLowerCase().includes(query)
        );
      }
      
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'moveInDate':
          return new Date(a.moveInDate) - new Date(b.moveInDate);
        case 'price':
          return b.budget - a.budget;
        default:
          return 0;
      }
    });

    return filtered;
  }, [applications, selectedStatus, searchQuery, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-[var(--color-pending)] text-[var(--color-pending-content)]';
      case 'approved':
        return 'bg-[var(--color-approved)] text-[var(--color-approved-content)]';
      case 'rejected':
        return 'bg-[var(--color-rejected)] text-[var(--color-rejected-content)]';
      default:
        return 'bg-[var(--color-draft)] text-[var(--color-draft-content)]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  };

  const toggleCardExpansion = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const toggleSelection = (id) => {
    setSelectedApplications(prev =>
      prev.includes(id) ? prev.filter(appId => appId !== id) : [...prev, id]
    );
  };

  const handleBulkArchive = () => {
    // Implement bulk archive logic
    console.log('Archiving:', selectedApplications);
    setSelectedApplications([]);
  };

  return (
    <div className="min-h-screen bg-[var(--color-base-100)]">
      {/* Hero Header with Gradient Overlay */}
      <div className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                My Applications
              </h1>
              <p className="text-[var(--color-primary-content)] text-lg opacity-90">
                Track and manage your roommate search journey
              </p>
            </div>
            
            <button className="btn btn-lg bg-white text-[var(--color-primary)] hover:bg-[var(--color-base-200)] border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 self-start lg:self-auto">
              <Search className="w-5 h-5" />
              Find New Rooms
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
              <div className="text-[var(--color-primary-content)] text-sm font-medium opacity-90">Total Applications</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-5 h-5 text-[var(--color-pending)]" />
                <div className="text-3xl font-bold text-white">{stats.pending}</div>
              </div>
              <div className="text-[var(--color-primary-content)] text-sm font-medium opacity-90">Pending</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-approved)]" />
                <div className="text-3xl font-bold text-white">{stats.approved}</div>
              </div>
              <div className="text-[var(--color-primary-content)] text-sm font-medium opacity-90">Approved</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="w-5 h-5 text-[var(--color-rejected)]" />
                <div className="text-3xl font-bold text-white">{stats.rejected}</div>
              </div>
              <div className="text-[var(--color-primary-content)] text-sm font-medium opacity-90">Rejected</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
                <div className="text-3xl font-bold text-white">{stats.successRate}%</div>
              </div>
              <div className="text-[var(--color-primary-content)] text-sm font-medium opacity-90">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Search Section */}
        <div className="bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)] p-6 mb-8">
          {/* Search & Filter Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search by room title, location, or provider..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-12 pr-4 bg-[var(--color-base-100)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-base-content)]"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'} gap-2`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t border-[var(--color-section-border)] animate-fadeIn">
              {/* Status Filters */}
              <div>
                <label className="block text-sm font-semibold text-[var(--color-base-content)] mb-3">
                  Filter by Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'pending', 'approved', 'rejected', 'archived'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        selectedStatus === status
                          ? 'bg-[var(--color-primary)] text-white shadow-md scale-105'
                          : 'bg-[var(--color-base-100)] text-[var(--color-base-content)] hover:bg-[var(--color-base-200)] border border-[var(--color-section-border)]'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-semibold text-[var(--color-base-content)] mb-3">
                  Sort By
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'newest', label: 'Newest First' },
                    { value: 'oldest', label: 'Oldest First' },
                    { value: 'moveInDate', label: 'Move-in Date' },
                    { value: 'price', label: 'Budget (High to Low)' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        sortBy === option.value
                          ? 'bg-[var(--color-secondary)] text-white shadow-md scale-105'
                          : 'bg-[var(--color-base-100)] text-[var(--color-base-content)] hover:bg-[var(--color-base-200)] border border-[var(--color-section-border)]'
                      }`}
                    >
                      <ArrowUpDown className="w-4 h-4 inline mr-1" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedApplications.length > 0 && (
          <div className="bg-[var(--color-accent)] text-[var(--color-accent-content)] rounded-xl p-4 mb-6 flex items-center justify-between shadow-lg animate-slideDown">
            <span className="font-semibold">
              {selectedApplications.length} application{selectedApplications.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button className="btn btn-sm bg-white/20 hover:bg-white/30 border-none text-[var(--color-accent-content)]">
                <Archive className="w-4 h-4" />
                Archive
              </button>
              <button className="btn btn-sm bg-white/20 hover:bg-white/30 border-none text-[var(--color-accent-content)]">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setSelectedApplications([])}
                className="btn btn-sm bg-white/20 hover:bg-white/30 border-none text-[var(--color-accent-content)]"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length === 0 ? (
            // Empty State
            <div className="text-center py-20 bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border border-[var(--color-section-border)]">
              <div className="mb-6">
                <div className="w-24 h-24 bg-[var(--color-base-200)] dark:bg-[var(--color-base-300)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-12 h-12 text-[var(--color-text-muted)]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">
                  {searchQuery || selectedStatus !== 'all' ? 'No applications found' : "You haven't applied yet"}
                </h3>
                <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
                  {searchQuery || selectedStatus !== 'all'
                    ? 'Try adjusting your filters or search terms'
                    : 'Start your roommate search by browsing available rooms and submitting applications'}
                </p>
              </div>
              <button className="btn btn-primary btn-lg gap-2">
                <Search className="w-5 h-5" />
                Browse Available Rooms
              </button>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
                expanded={expandedCard === application._id}
                selected={selectedApplications.includes(application._id)}
                onToggleExpand={() => toggleCardExpansion(application._id)}
                onToggleSelect={() => toggleSelection(application._id)}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                getTimeAgo={getTimeAgo}
              />
            ))
          )}
        </div>

        {/* Tips Section */}
        {filteredApplications.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-[var(--color-info)]/10 to-[var(--color-success)]/10 rounded-2xl p-8 border border-[var(--color-info)]/20">
            <div className="flex items-start gap-4">
              <div className="bg-[var(--color-info)] p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--color-base-content)] mb-2">
                  Tips to Improve Your Success Rate
                </h3>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                    <span>Personalize your application message for each listing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                    <span>Respond quickly to provider messages to show interest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                    <span>Complete your profile with verified information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Application Card Component
const ApplicationCard = ({
  application,
  expanded,
  selected,
  onToggleExpand,
  onToggleSelect,
  getStatusColor,
  getStatusIcon,
  getTimeAgo
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`bg-white dark:bg-[var(--color-base-200)] rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
        selected
          ? 'border-[var(--color-primary)] shadow-xl scale-[1.02]'
          : 'border-[var(--color-section-border)] hover:shadow-xl hover:border-[var(--color-primary)]/30'
      }`}
    >
      <div className="p-6">
        {/* Top Row: Checkbox, Image, Main Info, Status */}
        <div className="flex gap-4 mb-4">
          {/* Checkbox */}
          <div className="pt-1">
            <input
              type="checkbox"
              checked={selected}
              onChange={onToggleSelect}
              className="checkbox checkbox-primary"
            />
          </div>

          {/* Room Image */}
          <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden group">
            <img
              src={application.listing.image}
              alt={application.listing.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
              <button className="btn btn-xs btn-primary gap-1">
                <Eye className="w-3 h-3" />
                View
              </button>
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-[var(--color-base-content)] mb-1 truncate">
                  {application.listing.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)] mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {application.listing.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ${application.listing.price}/month
                  </span>
                  <span className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    {application.listing.roomType}
                  </span>
                </div>
                
                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {application.listing.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[var(--color-base-200)] dark:bg-[var(--color-base-300)] text-xs rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-end gap-2">
                <span className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md ${getStatusColor(application.status)}`}>
                  {getStatusIcon(application.status)}
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                
                {/* Actions Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowActions(!showActions)}
                    className="btn btn-sm btn-ghost btn-circle"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  {showActions && (
                    <div className="absolute right-0 top-full mt-2 bg-white dark:bg-[var(--color-base-300)] rounded-xl shadow-2xl border border-[var(--color-section-border)] py-2 w-48 z-10 animate-fadeIn">
                      <button className="w-full px-4 py-2 text-left hover:bg-[var(--color-base-100)] dark:hover:bg-[var(--color-base-200)] flex items-center gap-2 text-sm">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-[var(--color-base-100)] dark:hover:bg-[var(--color-base-200)] flex items-center gap-2 text-sm">
                        <ExternalLink className="w-4 h-4" />
                        View Listing
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-[var(--color-base-100)] dark:hover:bg-[var(--color-base-200)] flex items-center gap-2 text-sm">
                        <MessageSquare className="w-4 h-4" />
                        Message Provider
                      </button>
                      {application.status === 'pending' && (
                        <button className="w-full px-4 py-2 text-left hover:bg-[var(--color-base-100)] dark:hover:bg-[var(--color-base-200)] flex items-center gap-2 text-sm text-[var(--color-error)]">
                          <X className="w-4 h-4" />
                          Withdraw
                        </button>
                      )}
                      <button className="w-full px-4 py-2 text-left hover:bg-[var(--color-base-100)] dark:hover:bg-[var(--color-base-200)] flex items-center gap-2 text-sm">
                        <Archive className="w-4 h-4" />
                        Archive
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)] mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Applied {getTimeAgo(application.createdAt)}
              </span>
              {application.updatedAt !== application.createdAt && (
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Updated {getTimeAgo(application.updatedAt)}
                </span>
              )}
            </div>

            {/* Provider Info */}
            <div className="flex items-center gap-3 p-3 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-lg">
              <img
                src={application.provider.avatar}
                alt={application.provider.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="font-semibold text-sm text-[var(--color-base-content)]">
                  {application.provider.name}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {application.provider.responseRate}% response rate • Avg: {application.provider.avgResponseTime}
                </div>
              </div>
              <button className="btn btn-sm btn-primary gap-1">
                <MessageSquare className="w-4 h-4" />
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Toggle */}
        <button
          onClick={onToggleExpand}
          className="w-full mt-4 pt-4 border-t border-[var(--color-section-border)] flex items-center justify-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-medium transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-5 h-5" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" />
              Show Details
            </>
          )}
        </button>

        {/* Expanded Details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-[var(--color-section-border)] space-y-6 animate-fadeIn">
            {/* Application Details Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-bold text-[var(--color-base-content)] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                  Your Application Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Move-in Date:</span>
                    <span className="font-semibold text-[var(--color-base-content)]">
                      {new Date(application.moveInDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Lease Duration:</span>
                    <span className="font-semibold text-[var(--color-base-content)]">{application.leaseDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Your Budget:</span>
                    <span className="font-semibold text-[var(--color-base-content)]">${application.budget}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Contact Method:</span>
                    <span className="font-semibold text-[var(--color-base-content)]">{application.contactMethod}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-[var(--color-base-content)] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--color-primary)]" />
                  Lifestyle Preferences
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-lg">
                    <span className="flex items-center gap-2 text-[var(--color-text-muted)]">
                      <Dog className="w-4 h-4" />
                      Pets:
                    </span>
                    <span className={`font-semibold ${application.pets === 'Yes' ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`}>
                      {application.pets}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-lg">
                    <span className="flex items-center gap-2 text-[var(--color-text-muted)]">
                      <Cigarette className="w-4 h-4" />
                      Smoker:
                    </span>
                    <span className={`font-semibold ${application.smoker === 'Yes' ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-muted)]'}`}>
                      {application.smoker}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Message */}
            <div>
              <h4 className="font-bold text-[var(--color-base-content)] mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[var(--color-primary)]" />
                Your Message to Provider
              </h4>
              <div className="p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl border-l-4 border-[var(--color-primary)]">
                <p className="text-[var(--color-base-content)] italic">"{application.message}"</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary gap-2">
                <Eye className="w-4 h-4" />
                View Full Listing
              </button>
              <button className="btn btn-outline btn-primary gap-2">
                <Send className="w-4 h-4" />
                Send Follow-up
              </button>
              {application.status === 'approved' && (
                <button className="btn btn-success gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Viewing
                </button>
              )}
              {application.status === 'rejected' && (
                <button className="btn btn-outline gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Apply to Similar Rooms
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;