import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  MessageSquare, Search, Filter, Send, MoreVertical, Archive,
  Calendar, Phone, Mail, User, Clock, CheckCheck, Circle,
  Star, Trash2, Eye, X, ChevronDown, TrendingUp, Target,
  BarChart3, AlertCircle, Plus, CheckSquare
} from 'lucide-react';

export default function Inquiries() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedListing, setSelectedListing] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedInquiries, setSelectedInquiries] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock data - replace with actual API call
  const inquiriesData = {
    inquiries: [
      {
        id: 1,
        seekerId: 's1',
        seekerName: 'John Doe',
        seekerPhoto: 'https://i.pravatar.cc/150?img=1',
        seekerEmail: 'john@example.com',
        seekerPhone: '+1 234-567-8900',
        listingId: 'l1',
        listingTitle: 'Downtown Studio Apartment',
        message: "Hi! I'm interested in this studio. Is it still available? I'm looking to move in by next month.",
        timestamp: '2024-01-15T10:30:00',
        status: 'new',
        isRead: false,
        preferences: { moveInDate: '2024-02-01', budget: 1200, duration: '12 months' },
        conversation: [
          { sender: 'seeker', message: "Hi! I'm interested in this studio. Is it still available?", timestamp: '2024-01-15T10:30:00' }
        ]
      },
      {
        id: 2,
        seekerId: 's2',
        seekerName: 'Sarah Smith',
        seekerPhoto: 'https://i.pravatar.cc/150?img=2',
        seekerEmail: 'sarah@example.com',
        seekerPhone: '+1 234-567-8901',
        listingId: 'l2',
        listingTitle: 'Cozy 2BR Apartment',
        message: 'Can we schedule a viewing this weekend? I love the location!',
        timestamp: '2024-01-14T15:45:00',
        status: 'replied',
        isRead: true,
        preferences: { moveInDate: '2024-01-20', budget: 1500, duration: '6 months' },
        conversation: [
          { sender: 'seeker', message: 'Can we schedule a viewing this weekend?', timestamp: '2024-01-14T15:45:00' },
          { sender: 'provider', message: 'Sure! How about Saturday at 2 PM?', timestamp: '2024-01-14T16:00:00' },
          { sender: 'seeker', message: 'Perfect! See you then.', timestamp: '2024-01-14T16:05:00' }
        ]
      },
      {
        id: 3,
        seekerId: 's3',
        seekerName: 'Mike Johnson',
        seekerPhoto: 'https://i.pravatar.cc/150?img=3',
        seekerEmail: 'mike@example.com',
        seekerPhone: '+1 234-567-8902',
        listingId: 'l1',
        listingTitle: 'Downtown Studio Apartment',
        message: 'What utilities are included in the rent?',
        timestamp: '2024-01-13T09:20:00',
        status: 'interested',
        isRead: true,
        preferences: { moveInDate: '2024-02-15', budget: 1100, duration: '12 months' },
        conversation: [
          { sender: 'seeker', message: 'What utilities are included in the rent?', timestamp: '2024-01-13T09:20:00' },
          { sender: 'provider', message: 'Water and heat are included. Electric is separate.', timestamp: '2024-01-13T10:00:00' }
        ]
      },
      {
        id: 4,
        seekerId: 's4',
        seekerName: 'Emily Chen',
        seekerPhoto: 'https://i.pravatar.cc/150?img=4',
        seekerEmail: 'emily@example.com',
        seekerPhone: '+1 234-567-8903',
        listingId: 'l3',
        listingTitle: 'Shared House Room',
        message: 'Are pets allowed? I have a small dog.',
        timestamp: '2024-01-12T14:30:00',
        status: 'not-interested',
        isRead: true,
        preferences: { moveInDate: '2024-03-01', budget: 800, duration: '6 months' },
        conversation: [
          { sender: 'seeker', message: 'Are pets allowed? I have a small dog.', timestamp: '2024-01-12T14:30:00' },
          { sender: 'provider', message: "I'm sorry, we don't allow pets in this property.", timestamp: '2024-01-12T15:00:00' }
        ]
      },
      {
        id: 5,
        seekerId: 's5',
        seekerName: 'Alex Brown',
        seekerPhoto: 'https://i.pravatar.cc/150?img=5',
        seekerEmail: 'alex@example.com',
        seekerPhone: '+1 234-567-8904',
        listingId: 'l2',
        listingTitle: 'Cozy 2BR Apartment',
        message: 'Is parking included? How many spots?',
        timestamp: '2024-01-10T11:00:00',
        status: 'archived',
        isRead: true,
        preferences: null,
        conversation: [
          { sender: 'seeker', message: 'Is parking included? How many spots?', timestamp: '2024-01-10T11:00:00' }
        ]
      }
    ],
    stats: {
      totalInquiries: 24,
      newInquiries: 5,
      responseRate: 94,
      avgResponseTime: '2.5 hours',
      conversionRate: 18
    }
  };

  const messageTemplates = [
    { id: 1, title: 'Property Available', message: 'Thank you for your interest! Yes, the property is still available. Would you like to schedule a viewing?' },
    { id: 2, title: 'Schedule Viewing', message: `I'd be happy to show you the property. What days and times work best for you this week?` },
    { id: 3, title: 'Request More Info', message: 'Thank you for reaching out! Could you tell me more about your move-in date and lease duration preferences?' },
    { id: 4, title: 'Property Not Available', message: 'Thank you for your interest. Unfortunately, this property has been rented. However, I have other similar listings that might interest you.' }
  ];

  // Get unique listings for filter
  const uniqueListings = useMemo(() => {
    const listings = new Map();
    inquiriesData.inquiries.forEach(inq => {
      if (!listings.has(inq.listingId)) {
        listings.set(inq.listingId, inq.listingTitle);
      }
    });
    return Array.from(listings, ([id, title]) => ({ id, title }));
  }, []);

  // Filter and sort inquiries
  const filteredInquiries = useMemo(() => {
    let filtered = [...inquiriesData.inquiries];

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(inq => {
        if (selectedFilter === 'unread') return !inq.isRead;
        return inq.status === selectedFilter;
      });
    }

    // Filter by listing
    if (selectedListing !== 'all') {
      filtered = filtered.filter(inq => inq.listingId === selectedListing);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(inq =>
        inq.seekerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'recent-activity':
        filtered.sort((a, b) => {
          const aLast = new Date(a.conversation[a.conversation.length - 1].timestamp);
          const bLast = new Date(b.conversation[b.conversation.length - 1].timestamp);
          return bLast - aLast;
        });
        break;
    }

    return filtered;
  }, [inquiriesData.inquiries, selectedFilter, selectedListing, searchQuery, sortBy]);

  const getStatusBadge = (status) => {
    const badges = {
      new: { label: 'New', class: 'bg-blue-100 text-blue-700 border-blue-200' },
      replied: { label: 'Replied', class: 'bg-green-100 text-green-700 border-green-200' },
      interested: { label: 'Interested', class: 'bg-purple-100 text-purple-700 border-purple-200' },
      'not-interested': { label: 'Not Interested', class: 'bg-gray-100 text-gray-700 border-gray-200' },
      archived: { label: 'Archived', class: 'bg-gray-100 text-gray-500 border-gray-200' }
    };
    return badges[status] || badges.new;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleSelectInquiry = (id) => {
    setSelectedInquiries(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    
    // Add reply to conversation
    const updatedInquiry = {
      ...selectedInquiry,
      conversation: [
        ...selectedInquiry.conversation,
        { sender: 'provider', message: replyMessage, timestamp: new Date().toISOString() }
      ],
      status: 'replied',
      isRead: true
    };
    
    setSelectedInquiry(updatedInquiry);
    setReplyMessage('');
    setShowTemplates(false);
  };

  const StatCard = ({ icon: Icon, label, value, subValue, trend, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
            <TrendingUp size={16} />
            {trend}%
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
      {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
    </div>
  );

  const InquiryCard = ({ inquiry }) => {
    const status = getStatusBadge(inquiry.status);
    const isSelected = selectedInquiries.includes(inquiry.id);
    
    return (
      <div
        onClick={() => setSelectedInquiry(inquiry)}
        className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${
          selectedInquiry?.id === inquiry.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
        } ${!inquiry.isRead ? 'bg-blue-50/30' : ''}`}
      >
        <div className="flex gap-4">
          {/* Checkbox */}
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                handleSelectInquiry(inquiry.id);
              }}
              className="w-4 h-4 mt-1 rounded cursor-pointer"
            />
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={inquiry.seekerPhoto}
              alt={inquiry.seekerName}
              className="w-12 h-12 rounded-full border-2 border-gray-200"
            />
          </div>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{inquiry.seekerName}</h3>
                {!inquiry.isRead && <Circle size={8} className="text-blue-600 fill-blue-600" />}
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">
                {formatTimestamp(inquiry.timestamp)}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{inquiry.listingTitle}</p>
            <p className="text-sm text-gray-700 line-clamp-2 mb-2">{inquiry.message}</p>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${status.class}`}>
                {status.label}
              </span>
              {inquiry.conversation.length > 1 && (
                <span className="text-xs text-gray-500">
                  {inquiry.conversation.length} messages
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-600 mt-1">Manage messages from potential tenants</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={MessageSquare}
          label="Total Inquiries"
          value={inquiriesData.stats.totalInquiries}
          subValue="This month"
          color="bg-blue-500"
        />
        <StatCard
          icon={AlertCircle}
          label="New Inquiries"
          value={inquiriesData.stats.newInquiries}
          subValue="Unread"
          color="bg-red-500"
        />
        <StatCard
          icon={CheckCheck}
          label="Response Rate"
          value={`${inquiriesData.stats.responseRate}%`}
          trend={5}
          color="bg-green-500"
        />
        <StatCard
          icon={Clock}
          label="Avg Response Time"
          value={inquiriesData.stats.avgResponseTime}
          subValue="Last 30 days"
          color="bg-purple-500"
        />
        <StatCard
          icon={Target}
          label="Conversion Rate"
          value={`${inquiriesData.stats.conversionRate}%`}
          subValue="Inquiry → Rental"
          color="bg-orange-500"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Inquiry List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col max-h-[800px]">
          {/* Filters */}
          <div className="p-4 border-b border-gray-200 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Inquiries</option>
              <option value="unread">Unread</option>
              <option value="new">New</option>
              <option value="replied">Replied</option>
              <option value="interested">Interested</option>
              <option value="not-interested">Not Interested</option>
              <option value="archived">Archived</option>
            </select>

            {/* Listing Filter */}
            <select
              value={selectedListing}
              onChange={(e) => setSelectedListing(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Listings</option>
              {uniqueListings.map(listing => (
                <option key={listing.id} value={listing.id}>{listing.title}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="recent-activity">Recent Activity</option>
            </select>

            {/* Bulk Actions */}
            {selectedInquiries.length > 0 && (
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Mark Read ({selectedInquiries.length})
                </button>
                <button className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Archive size={18} className="text-gray-600" />
                </button>
                <button className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            )}
          </div>

          {/* Inquiry List */}
          <div className="flex-1 overflow-y-auto">
            {filteredInquiries.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-600">No inquiries found</p>
              </div>
            ) : (
              filteredInquiries.map(inquiry => (
                <InquiryCard key={inquiry.id} inquiry={inquiry} />
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Conversation View */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col max-h-[800px]">
          {selectedInquiry ? (
            <>
              {/* Conversation Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedInquiry.seekerPhoto}
                      alt={selectedInquiry.seekerName}
                      className="w-16 h-16 rounded-full border-2 border-gray-200"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedInquiry.seekerName}</h2>
                      <p className="text-sm text-gray-600">{selectedInquiry.listingTitle}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedInquiry.status).class}`}>
                          {getStatusBadge(selectedInquiry.status).label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                      <MoreVertical size={20} />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52 border border-gray-200">
                      <li><a className="text-sm"><Eye size={16} /> View Seeker Profile</a></li>
                      <li><a className="text-sm"><Calendar size={16} /> Schedule Viewing</a></li>
                      <li><a className="text-sm"><Star size={16} /> Mark as Interested</a></li>
                      <li><a className="text-sm"><Archive size={16} /> Archive</a></li>
                      <li><a className="text-sm text-red-600"><Trash2 size={16} /> Delete</a></li>
                    </ul>
                  </div>
                </div>

                {/* Seeker Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-gray-500" />
                    <span className="text-gray-700">{selectedInquiry.seekerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-gray-500" />
                    <span className="text-gray-700">{selectedInquiry.seekerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-gray-700">Move-in: {selectedInquiry.preferences?.moveInDate || 'Not specified'}</span>
                  </div>
                </div>

                {/* Preferences */}
                {selectedInquiry.preferences && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Seeker Preferences</h3>
                    <div className="grid grid-cols-3 gap-2 text-xs text-blue-800">
                      <div>Budget: ${selectedInquiry.preferences.budget}/mo</div>
                      <div>Duration: {selectedInquiry.preferences.duration}</div>
                      <div>Move-in: {selectedInquiry.preferences.moveInDate}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Conversation Thread */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedInquiry.conversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${msg.sender === 'provider' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-4`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-2 ${msg.sender === 'provider' ? 'text-green-100' : 'text-gray-500'}`}>
                        {formatTimestamp(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Section */}
              <div className="p-4 border-t border-gray-200">
                {/* Quick Templates */}
                {showTemplates && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">Quick Templates</h4>
                      <button onClick={() => setShowTemplates(false)} className="text-gray-500 hover:text-gray-700">
                        <X size={18} />
                      </button>
                    </div>
                    {messageTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => {
                          setReplyMessage(template.message);
                          setShowTemplates(false);
                        }}
                        className="w-full text-left p-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{template.title}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
                  >
                    Templates
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim()}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={18} />
                    Send
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    Schedule Viewing
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Star size={16} />
                    Mark Interested
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                    <Archive size={16} />
                    Archive
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-center p-8">
              <div>
                <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an inquiry</h3>
                <p className="text-gray-600">Choose an inquiry from the list to view the conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}