import { X, Calendar, DollarSign, Clock, FileText, MessageSquare, User, Home, CheckCircle, Clock as ClockIcon, AlertCircle } from 'lucide-react';
import React from 'react';

const ApplicationDetailsModal = ({ application, isOpen, onClose }) => {
    if (!isOpen || !application) return null;

    // Status badge styling
    const getStatusConfig = (status) => {
        const config = {
            pending: { color: 'bg-amber-100 text-amber-800 border-amber-300', icon: ClockIcon, label: 'Pending Review' },
            approved: { color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle, label: 'Approved' },
            rejected: { color: 'bg-red-100 text-red-800 border-red-300', icon: AlertCircle, label: 'Not Selected' },
            under_review: { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: ClockIcon, label: 'Under Review' },
        };
        return config[status] || config.pending;
    };

    const statusConfig = getStatusConfig(application.status);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Modal */}
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">Roommate Application</h2>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color} flex items-center gap-1`}>
                                        <statusConfig.icon className="w-4 h-4" />
                                        {statusConfig.label}
                                    </span>
                                    <span className="text-base-content/70 text-sm">
                                        Submitted {formatDate(application.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="btn btn-ghost btn-circle btn-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                        <div className="p-6 space-y-6">
                            {/* Application Overview */}
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="card bg-base-200">
                                    <div className="card-body p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Home className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Listing Details</h3>
                                        </div>
                                        <p className="text-sm text-base-content/70">
                                            Listing ID: <span className="font-mono">{application.listingId}</span>
                                        </p>
                                        <p className="text-sm text-base-content/70">
                                            Provider ID: <span className="font-mono">{application.providerId}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="card bg-base-200">
                                    <div className="card-body p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <User className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Applicant</h3>
                                        </div>
                                        <p className="text-sm text-base-content/70">
                                            Applicant ID: <span className="font-mono">{application.applicantId}</span>
                                        </p>
                                    </div>
                                </div>
                            </div> */}

                            {/* Key Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="card bg-base-200">
                                    <div className="card-body p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Move-in Date</h3>
                                        </div>
                                        <p className="text-lg font-semibold">
                                            {formatDate(application.moveInDate)}
                                        </p>
                                    </div>
                                </div>

                                <div className="card bg-base-200">
                                    <div className="card-body p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Lease Duration</h3>
                                        </div>
                                        <p className="text-lg font-semibold">{application.leaseDuration}</p>
                                    </div>
                                </div>

                                <div className="card bg-base-200">
                                    <div className="card-body p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <DollarSign className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold">Budget</h3>
                                        </div>
                                        <p className="text-lg font-semibold">${application.budget}/month</p>
                                    </div>
                                </div>
                            </div>

                            {/* Lifestyle Preferences */}
                            <div className="card bg-base-200">
                                <div className="card-body p-4">
                                    <h3 className="font-semibold mb-4">Lifestyle Preferences</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-base-content/70 mb-1">Pets</p>
                                            <div className={`badge ${application.pets === 'Yes' ? 'badge-success' : 'badge-neutral'}`}>
                                                {application.pets}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-base-content/70 mb-1">Smoker</p>
                                            <div className={`badge ${application.smoker === 'Yes' ? 'badge-error' : 'badge-neutral'}`}>
                                                {application.smoker}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-sm text-base-content/70 mb-1">Contact Method</p>
                                            <div className="badge badge-outline">
                                                {application.contactMethod}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="space-y-4">
                                {/* Personal Message */}
                                {application.message && (
                                    <div className="card bg-base-200">
                                        <div className="card-body p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <MessageSquare className="w-5 h-5 text-primary" />
                                                <h3 className="font-semibold">Personal Message</h3>
                                            </div>
                                            <p className="text-base-content/80">{application.message}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Template Message */}
                                {application.messageTemplate && (
                                    <div className="card bg-base-200">
                                        <div className="card-body p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <FileText className="w-5 h-5 text-primary" />
                                                <h3 className="font-semibold">Application Message</h3>
                                            </div>
                                            <p className="text-base-content/80">{application.messageTemplate}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Documents */}
                            {application.documents && application.documents.length > 0 && (
                                <div className="card bg-base-200">
                                    <div className="card-body p-4">
                                        <h3 className="font-semibold mb-4">Documents</h3>
                                        <div className="space-y-2">
                                            {application.documents.map((doc, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-base-100 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="w-5 h-5 text-primary" />
                                                        <div>
                                                            <p className="font-medium">{doc.name}</p>
                                                            <p className="text-sm text-base-content/70">{doc.type} • {doc.size}</p>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-ghost btn-sm">View</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Meta Information */}
                            <div className="text-sm text-base-content/70 space-y-1">
                                <p>Application ID: <span className="font-mono">{application._id?.$oid || application._id}</span></p>
                                <p>Last updated: {formatDate(application.updatedAt)}</p>
                                {application.archived && (
                                    <p className="text-amber-600">
                                        <AlertCircle className="w-4 h-4 inline mr-1" />
                                        This application has been archived
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-base-100 border-t border-base-300 px-6 py-4">
                        <div className="flex justify-end gap-3">
                            <button onClick={onClose} className="btn btn-ghost">
                                Close
                            </button>
                            {application.status === 'pending' && (
                                <button className="btn btn-primary">
                                    Update Application
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsModal;