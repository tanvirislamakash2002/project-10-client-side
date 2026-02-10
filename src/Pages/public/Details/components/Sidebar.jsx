import { AlertCircle, Calendar, Clock, ClockIcon, MessageSquare, Send, Shield, Star } from 'lucide-react';
import React, { useState } from 'react';
import useAxios from '../../../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ApplicationDetailsModal from '../../../dashboard/Seeker/components/ApplicationDetailsModal/ApplicationDetailsModal';

const Sidebar = ({ props }) => {
    const { singleRoom, user, role, id, openModal } = props;

    const [viewModalOpen, setViewModalOpen] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState(null)

    const axiosInstance = useAxios()
    const { data: providerInfo = {}, isLoading: providerLoading } = useQuery({
        queryKey: ['user', singleRoom?.postedBy],
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/user?id=${singleRoom?.providerId}`)
            return response.data
        },
        enabled: !!singleRoom?.providerId,
    });

    const { data: pendingApplication = {}, isLoading: pendingApplicationLoading } = useQuery({
        queryKey: ['user', id], // Use postedBy ID from room data
        queryFn: async () => {
            const response = await axiosInstance.get(`/api/v1/application?listing_id=${id}`)
            return response.data
        },
        enabled: !!singleRoom?.providerId,
    });

    const openViewApplicationModal = () => {
        if (pendingApplication?.success) {
            setSelectedApplication(pendingApplication?.details);
            setViewModalOpen(true)
        }
    }


    return (
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                {/* Provider Info */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h3 className="card-title text-lg mb-4">Posted By</h3>

                        <div className="flex items-start gap-4 mb-4">
                            <div className="avatar">
                                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={providerInfo?.user?.photoURL} alt={user?.displayName} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold">{providerInfo?.user?.name}</h4>
                                    <Shield className="w-4 h-4 text-success" />
                                </div>
                                <p className="text-sm text-base-content/70">Current Tenant</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-4 h-4 text-warning fill-current" />
                                    <span className="text-sm font-semibold">4.8</span>
                                    <span className="text-sm text-base-content/70">(12 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm mb-4">
                            <p className="flex items-center gap-2 text-base-content/70">
                                <Clock className="w-4 h-4" />
                                Usually responds within 24 hours
                            </p>
                            <p className="flex items-center gap-2 text-base-content/70">
                                <Calendar className="w-4 h-4" />
                                Member since 2023
                            </p>
                        </div>

                        <button className="btn btn-ghost btn-sm w-full">
                            View Provider Profile
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="card bg-base-100 shadow-lg">
                    {role === "seeker" && <div className="card-body space-y-3">
                        {pendingApplication?.success ? (
                            <>
                                <button
                                    onClick={openViewApplicationModal}
                                    className="btn btn-warning w-full gap-2 group"
                                >
                                    <ClockIcon className="w-5 h-5" />
                                    <span>Pending Application</span>
                                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        (View)
                                    </span>
                                </button>


                            </>
                        ) :
                            (<button
                                onClick={openModal}
                                className="btn btn-primary w-full gap-2"
                            >
                                <Send className="w-5 h-5" />
                                I'm Interested
                            </button>)}

                        <button className="btn btn-secondary w-full gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Contact Provider
                        </button>

                        <button className="btn btn-outline w-full gap-2">
                            <Calendar className="w-5 h-5" />
                            Schedule Viewing
                        </button>
                    </div>}
                </div>

                {/* Safety Tips */}
                <div className="alert alert-warning">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold mb-1">Safety Tips</h4>
                        <ul className="text-sm space-y-1">
                            <li>• Meet in person before committing</li>
                            <li>• Never send money before viewing</li>
                            <li>• Use secure messaging</li>
                            <li>• Report suspicious listings</li>
                        </ul>
                    </div>
                </div>

                {/* Similar Listings */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h3 className="card-title text-lg mb-4">Similar Listings</h3>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-3 p-3 bg-base-200 rounded-lg hover:bg-base-300 transition cursor-pointer">
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-lg">
                                            <img src={`https://images.unsplash.com/photo-${1522708323590 + i}?w=200`} alt="Room" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm truncate">Room Near Downtown</h4>
                                        <p className="text-xs text-base-content/70">Downtown</p>
                                        <p className="text-sm font-bold text-success mt-1">${900 + (i * 50)}/mo</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Application Details Modal */}
            <ApplicationDetailsModal
                application={selectedApplication}
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
            />
        </div>
    );
};

export default Sidebar;