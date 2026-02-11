import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { 
  Calendar, 
  Clock, 
  User, 
  Home, 
  DollarSign, 
  Filter, 
  Search, 
  CheckCircle2, 
  XCircle, 
  CalendarClock, 
  MessageSquare, 
  Star,
  Mail,
  FileText,
  TrendingUp,
  AlertCircle,
  MoreVertical,
  ChevronDown,
  MapPin,
  Eye,
  Phone,
  RotateCcw,
  Ban,
  CheckCheck,
  UserCheck,
  Users,
  BarChart3,
  Settings
} from 'lucide-react';

const ViewingRequestsPage = () => {
  const queryClient = useQueryClient();
  
  // State Management
  const [activeTab, setActiveTab] = useState('all');
  const [selectedListing, setSelectedListing] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);

  // Fetch Viewing Requests
  const { data: requestsData, isLoading } = useQuery({
    queryKey: ['viewingRequests', activeTab, selectedListing, dateRange, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams({
        status: activeTab !== 'all' ? activeTab : undefined,
        listingId: selectedListing !== 'all' ? selectedListing : undefined,
        startDate: dateRange.start || undefined,
        endDate: dateRange.end || undefined,
        sort: sortBy
      });
      const { data } = await axios.get(`/api/provider/viewing-requests?${params}`);
      return data;
    }
  });

  // Fetch Provider Listings
  const { data: listingsData } = useQuery({
    queryKey: ['providerListings'],
    queryFn: async () => {
      const { data } = await axios.get('/api/provider/listings');
      return data;
    }
  });

  // Mutations
  const acceptRequestMutation = useMutation({
    mutationFn: async ({ requestId, confirmedTime }) => {
      const { data } = await axios.post(`/api/viewing-requests/${requestId}/accept`, {
        confirmedTime
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewingRequests']);
      toast.success('Viewing request accepted!');
    },
    onError: () => {
      toast.error('Failed to accept request');
    }
  });

  const declineRequestMutation = useMutation({
    mutationFn: async ({ requestId, reason }) => {
      const { data } = await axios.post(`/api/viewing-requests/${requestId}/decline`, {
        reason
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewingRequests']);
      toast.success('Request declined');
    }
  });

  const markCompletedMutation = useMutation({
    mutationFn: async (requestId) => {
      const { data } = await axios.post(`/api/viewing-requests/${requestId}/complete`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewingRequests']);
      toast.success('Marked as completed');
    }
  });

  const proposeNewTimeMutation = useMutation({
    mutationFn: async ({ requestId, proposedTimes }) => {
      const { data } = await axios.post(`/api/viewing-requests/${requestId}/propose-time`, {
        proposedTimes
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['viewingRequests']);
      toast.success('New time proposed');
    }
  });

  // Handlers
  const handleAcceptRequest = async (request) => {
    const { value: selectedTime } = await Swal.fire({
      title: 'Confirm Viewing Time',
      html: `
        <div class="text-left space-y-3">
          <p class="text-sm text-gray-600 mb-4">Select from seeker's proposed times:</p>
          ${request.proposedTimes.map((time, idx) => `
            <label class="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 cursor-pointer">
              <input type="radio" name="time" value="${idx}" class="radio radio-primary" ${idx === 0 ? 'checked' : ''}>
              <div>
                <div class="font-medium">${new Date(time).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                <div class="text-sm text-gray-600">${new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </label>
          `).join('')}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm Viewing',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-ghost'
      },
      preConfirm: () => {
        const selected = document.querySelector('input[name="time"]:checked');
        return selected ? selected.value : null;
      }
    });

    if (selectedTime !== undefined) {
      const confirmedTime = request.proposedTimes[parseInt(selectedTime)];
      acceptRequestMutation.mutate({ requestId: request._id, confirmedTime });
    }
  };

  const handleDeclineRequest = async (requestId) => {
    const { value: reason } = await Swal.fire({
      title: 'Decline Request',
      input: 'textarea',
      inputLabel: 'Reason (optional)',
      inputPlaceholder: 'Let the seeker know why...',
      showCancelButton: true,
      confirmButtonText: 'Decline',
      confirmButtonColor: '#EF4444',
      customClass: {
        confirmButton: 'btn btn-error',
        cancelButton: 'btn btn-ghost'
      }
    });

    if (reason !== undefined) {
      declineRequestMutation.mutate({ requestId, reason });
    }
  };

  const handleProposeNewTime = async (requestId) => {
    const { value: formValues } = await Swal.fire({
      title: 'Propose Alternative Times',
      html: `
        <div class="text-left space-y-3">
          <div>
            <label class="label"><span class="label-text">Date & Time 1</span></label>
            <input type="datetime-local" id="time1" class="input input-bordered w-full">
          </div>
          <div>
            <label class="label"><span class="label-text">Date & Time 2 (optional)</span></label>
            <input type="datetime-local" id="time2" class="input input-bordered w-full">
          </div>
          <div>
            <label class="label"><span class="label-text">Date & Time 3 (optional)</span></label>
            <input type="datetime-local" id="time3" class="input input-bordered w-full">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Propose Times',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-ghost'
      },
      preConfirm: () => {
        const times = [];
        const time1 = document.getElementById('time1').value;
        const time2 = document.getElementById('time2').value;
        const time3 = document.getElementById('time3').value;
        
        if (time1) times.push(time1);
        if (time2) times.push(time2);
        if (time3) times.push(time3);
        
        if (times.length === 0) {
          Swal.showValidationMessage('Please select at least one time');
          return false;
        }
        
        return times;
      }
    });

    if (formValues) {
      proposeNewTimeMutation.mutate({ requestId, proposedTimes: formValues });
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedRequests.length === 0) {
      toast.error('No requests selected');
      return;
    }

    const result = await Swal.fire({
      title: `${action} ${selectedRequests.length} request(s)?`,
      text: 'This action will be applied to all selected requests',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      customClass: {
        confirmButton: action === 'Accept' ? 'btn btn-success' : 'btn btn-error',
        cancelButton: 'btn btn-ghost'
      }
    });

    if (result.isConfirmed) {
      // Bulk action logic here
      toast.success(`${selectedRequests.length} requests ${action.toLowerCase()}ed`);
      setSelectedRequests([]);
    }
  };

  // Filtered and Sorted Data
  const filteredRequests = useMemo(() => {
    if (!requestsData?.requests) return [];
    
    let filtered = [...requestsData.requests];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.seeker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.listing.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [requestsData, searchTerm]);

  // Tab counts
  const tabCounts = useMemo(() => {
    if (!requestsData?.requests) return {};
    
    return {
      all: requestsData.requests.length,
      pending: requestsData.requests.filter(r => r.status === 'pending').length,
      confirmed: requestsData.requests.filter(r => r.status === 'confirmed').length,
      completed: requestsData.requests.filter(r => r.status === 'completed').length,
      declined: requestsData.requests.filter(r => r.status === 'declined' || r.status === 'cancelled').length
    };
  }, [requestsData]);

  // Metrics
  const metrics = useMemo(() => {
    if (!requestsData?.metrics) return null;
    return requestsData.metrics;
  }, [requestsData]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'badge-warning',
      confirmed: 'badge-success',
      completed: 'badge-info',
      declined: 'badge-error',
      cancelled: 'badge-error'
    };
    return colors[status] || 'badge-ghost';
  };

  const isPriorityRequest = (request) => {
    const hoursSinceRequest = (Date.now() - new Date(request.requestDate)) / (1000 * 60 * 60);
    return request.status === 'pending' && hoursSinceRequest > 24;
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-section-border backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                Viewing Requests
              </h1>
              <p className="text-text-muted mt-1 font-medium">
                Manage appointment requests from potential tenants
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="btn btn-outline btn-sm gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm gap-2">
                  <MoreVertical className="w-4 h-4" />
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-section-border">
                  <li><a><Calendar className="w-4 h-4" /> Calendar View</a></li>
                  <li><a><Mail className="w-4 h-4" /> Notification Settings</a></li>
                  <li><a><BarChart3 className="w-4 h-4" /> View Analytics</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Pending Responses */}
          <div className="card bg-gradient-to-br from-warning/10 to-warning/5 border-2 border-warning/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-warning-content/70 uppercase tracking-wider">
                    Pending Responses
                  </p>
                  <h3 className="text-4xl font-bold text-warning mt-2">
                    {metrics?.pendingCount || 0}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">Need your attention</p>
                </div>
                <div className="w-16 h-16 bg-warning/20 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-warning" />
                </div>
              </div>
            </div>
          </div>

          {/* Today's Viewings */}
          <div className="card bg-gradient-to-br from-info/10 to-info/5 border-2 border-info/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-info-content/70 uppercase tracking-wider">
                    Today's Viewings
                  </p>
                  <h3 className="text-4xl font-bold text-info mt-2">
                    {metrics?.todayCount || 0}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">Confirmed appointments</p>
                </div>
                <div className="w-16 h-16 bg-info/20 rounded-2xl flex items-center justify-center">
                  <CalendarClock className="w-8 h-8 text-info" />
                </div>
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="card bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-success-content/70 uppercase tracking-wider">
                    This Week
                  </p>
                  <h3 className="text-4xl font-bold text-success mt-2">
                    {metrics?.weekCount || 0}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">Upcoming viewings</p>
                </div>
                <div className="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-secondary-content/70 uppercase tracking-wider">
                    Conversion Rate
                  </p>
                  <h3 className="text-4xl font-bold text-secondary mt-2">
                    {metrics?.conversionRate || 0}%
                  </h3>
                  <p className="text-xs text-text-muted mt-1">Viewings → Applications</p>
                </div>
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Tabs */}
        <div className="card bg-base-100 shadow-xl border border-section-border mb-6">
          <div className="card-body p-6">
            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-section-border">
              <button
                onClick={() => setActiveTab('all')}
                className={`btn btn-sm gap-2 ${activeTab === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              >
                All Requests
                <span className="badge badge-sm">{tabCounts.all || 0}</span>
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`btn btn-sm gap-2 ${activeTab === 'pending' ? 'btn-warning' : 'btn-ghost'}`}
              >
                Pending
                {tabCounts.pending > 0 && (
                  <span className="badge badge-warning badge-sm">{tabCounts.pending}</span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('confirmed')}
                className={`btn btn-sm gap-2 ${activeTab === 'confirmed' ? 'btn-success' : 'btn-ghost'}`}
              >
                Confirmed
                <span className="badge badge-sm">{tabCounts.confirmed || 0}</span>
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`btn btn-sm gap-2 ${activeTab === 'completed' ? 'btn-info' : 'btn-ghost'}`}
              >
                Completed
                <span className="badge badge-sm">{tabCounts.completed || 0}</span>
              </button>
              <button
                onClick={() => setActiveTab('declined')}
                className={`btn btn-sm gap-2 ${activeTab === 'declined' ? 'btn-error' : 'btn-ghost'}`}
              >
                Declined/Cancelled
                <span className="badge badge-sm">{tabCounts.declined || 0}</span>
              </button>
            </div>

            {/* Search & Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="form-control">
                <div className="input-group">
                  <span className="bg-base-200">
                    <Search className="w-5 h-5 text-text-muted" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search seeker or property..."
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Listing Filter */}
              <div className="form-control">
                <select
                  className="select select-bordered w-full"
                  value={selectedListing}
                  onChange={(e) => setSelectedListing(e.target.value)}
                >
                  <option value="all">All Listings</option>
                  {listingsData?.listings?.map(listing => (
                    <option key={listing._id} value={listing._id}>
                      {listing.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div className="form-control">
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  placeholder="Start Date"
                />
              </div>

              {/* Sort */}
              <div className="form-control">
                <select
                  className="select select-bordered w-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="urgent">Urgent First</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedRequests.length > 0 && (
              <div className="alert alert-info mt-4">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">
                    {selectedRequests.length} request(s) selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBulkAction('Accept')}
                      className="btn btn-success btn-sm"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={() => handleBulkAction('Decline')}
                      className="btn btn-error btn-sm"
                    >
                      Decline All
                    </button>
                    <button
                      onClick={() => setSelectedRequests([])}
                      className="btn btn-ghost btn-sm"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="card bg-base-100 shadow-xl border border-section-border">
              <div className="card-body py-16 text-center">
                <Users className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-base-content">No requests found</h3>
                <p className="text-text-muted">
                  {activeTab === 'all' 
                    ? "You don't have any viewing requests yet" 
                    : `No ${activeTab} requests at the moment`}
                </p>
              </div>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request._id}
                className={`card bg-base-100 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl ${
                  isPriorityRequest(request)
                    ? 'border-warning bg-warning/5'
                    : 'border-section-border hover:border-primary/30'
                } ${expandedRequest === request._id ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="card-body p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mt-1"
                        checked={selectedRequests.includes(request._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRequests([...selectedRequests, request._id]);
                          } else {
                            setSelectedRequests(selectedRequests.filter(id => id !== request._id));
                          }
                        }}
                      />

                      {/* Seeker Info */}
                      <div className="avatar">
                        <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          {request.seeker.photo ? (
                            <img src={request.seeker.photo} alt={request.seeker.name} />
                          ) : (
                            <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                              {request.seeker.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-base-content">
                            {request.seeker.name}
                          </h3>
                          {request.seeker.verified && (
                            <div className="badge badge-sm gap-1 bg-verified-badge text-verified-badge-content border-0">
                              <CheckCheck className="w-3 h-3" />
                              Verified
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-text-muted">
                          Requested {getTimeAgo(request.requestDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isPriorityRequest(request) && (
                        <div className="badge badge-warning gap-1 font-semibold">
                          <AlertCircle className="w-3 h-3" />
                          Urgent
                        </div>
                      )}
                      <div className={`badge ${getStatusColor(request.status)} badge-lg font-semibold`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="bg-base-200 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Home className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Property</p>
                            <p className="font-semibold text-base-content">{request.listing.title}</p>
                            <p className="text-sm text-text-muted flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {request.listing.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <DollarSign className="w-4 h-4 text-secondary" />
                          </div>
                          <div>
                            <p className="text-xs text-text-muted">Rent</p>
                            <p className="font-bold text-secondary">${request.listing.rent}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Eye className="w-4 h-4 text-accent-content" />
                          </div>
                          <div>
                            <p className="text-xs text-text-muted">Room Type</p>
                            <p className="font-semibold text-base-content">{request.listing.roomType}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Proposed Times */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-base-content mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Proposed Viewing Times
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {request.proposedTimes.map((time, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 rounded-lg p-3 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                            <Calendar className="w-4 h-4" />
                            {new Date(time).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-base-content font-bold mt-1">
                            {new Date(time).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Seeker's Message */}
                  {request.message && (
                    <div className="bg-info/5 border-l-4 border-info rounded-r-lg p-4 mb-4">
                      <p className="text-sm font-medium text-info mb-1 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Seeker's Note
                      </p>
                      <p className="text-base-content italic">"{request.message}"</p>
                    </div>
                  )}

                  {/* Seeker Context */}
                  <div className="collapse collapse-arrow bg-base-200 rounded-lg mb-4">
                    <input
                      type="checkbox"
                      checked={expandedRequest === request._id}
                      onChange={() => setExpandedRequest(expandedRequest === request._id ? null : request._id)}
                    />
                    <div className="collapse-title text-sm font-semibold flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-primary" />
                      Seeker Details & Application Status
                    </div>
                    <div className="collapse-content">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                          <p className="text-xs text-text-muted mb-2">Contact</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-primary" />
                              <span>{request.seeker.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-primary" />
                              <span>{request.seeker.phone || 'Not provided'}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-text-muted mb-2">Application Status</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Application:</span>
                              <span className={`badge ${request.applicationStatus === 'submitted' ? 'badge-success' : 'badge-ghost'}`}>
                                {request.applicationStatus || 'Not submitted'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Reliability:</span>
                              <div className="rating rating-sm">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < (request.seeker.reliabilityScore || 0)
                                        ? 'fill-warning text-warning'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptRequest(request)}
                          className="btn btn-success gap-2 flex-1 sm:flex-none"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Accept Request
                        </button>
                        <button
                          onClick={() => handleProposeNewTime(request._id)}
                          className="btn btn-primary btn-outline gap-2 flex-1 sm:flex-none"
                        >
                          <CalendarClock className="w-4 h-4" />
                          Propose New Time
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(request._id)}
                          className="btn btn-error btn-outline gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Decline
                        </button>
                      </>
                    )}

                    {request.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => markCompletedMutation.mutate(request._id)}
                          className="btn btn-success gap-2 flex-1 sm:flex-none"
                        >
                          <CheckCheck className="w-4 h-4" />
                          Mark as Completed
                        </button>
                        <button
                          onClick={() => handleProposeNewTime(request._id)}
                          className="btn btn-primary btn-outline gap-2"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reschedule
                        </button>
                        <button className="btn btn-ghost gap-2">
                          <FileText className="w-4 h-4" />
                          View Application
                        </button>
                        <button
                          onClick={() => handleDeclineRequest(request._id)}
                          className="btn btn-error btn-outline gap-2"
                        >
                          <Ban className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    )}

                    {request.status === 'completed' && (
                      <>
                        <button className="btn btn-ghost gap-2">
                          <Star className="w-4 h-4" />
                          View Feedback
                        </button>
                        <button className="btn btn-ghost gap-2">
                          <Mail className="w-4 h-4" />
                          Contact Seeker
                        </button>
                        <button className="btn btn-ghost gap-2">
                          <FileText className="w-4 h-4" />
                          View Application
                        </button>
                      </>
                    )}

                    {(request.status === 'declined' || request.status === 'cancelled') && (
                      <>
                        <button className="btn btn-primary btn-outline gap-2">
                          <RotateCcw className="w-4 h-4" />
                          Reopen Request
                        </button>
                        <button className="btn btn-ghost gap-2">
                          <Mail className="w-4 h-4" />
                          Message Seeker
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Insights Section */}
        {requestsData?.insights && (
          <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-xl mt-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Insights & Analytics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat bg-base-100 rounded-xl shadow-md">
                  <div className="stat-title">Avg Response Time</div>
                  <div className="stat-value text-primary text-3xl">
                    {requestsData.insights.avgResponseTime}h
                  </div>
                  <div className="stat-desc">Last 30 days</div>
                </div>

                <div className="stat bg-base-100 rounded-xl shadow-md">
                  <div className="stat-title">Most Requested</div>
                  <div className="stat-value text-secondary text-2xl truncate">
                    {requestsData.insights.mostRequestedListing}
                  </div>
                  <div className="stat-desc">{requestsData.insights.requestCount} requests</div>
                </div>

                <div className="stat bg-base-100 rounded-xl shadow-md">
                  <div className="stat-title">Peak Viewing Time</div>
                  <div className="stat-value text-accent-content text-3xl">
                    {requestsData.insights.peakTime}
                  </div>
                  <div className="stat-desc">Most popular slot</div>
                </div>

                <div className="stat bg-base-100 rounded-xl shadow-md">
                  <div className="stat-title">No-Show Rate</div>
                  <div className="stat-value text-warning text-3xl">
                    {requestsData.insights.noShowRate}%
                  </div>
                  <div className="stat-desc">Last 30 days</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewingRequestsPage;
