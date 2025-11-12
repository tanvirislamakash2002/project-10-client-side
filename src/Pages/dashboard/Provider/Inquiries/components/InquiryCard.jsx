import { Circle } from "lucide-react";
import { useState } from "react";

export const InquiryCard = ({ inquiry }) => {

    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [selectedInquiries, setSelectedInquiries] = useState([]);
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

    const handleSelectInquiry = (id) => {
        setSelectedInquiries(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
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
    const status = getStatusBadge(inquiry.status);
    const isSelected = selectedInquiries.includes(inquiry.id);

    return (
        <div
            onClick={() => setSelectedInquiry(inquiry)}
            className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors dark:border-gray-700 dark:hover:bg-gray-800 ${selectedInquiry?.id === inquiry.id ? 'bg-blue-50 border-l-4 border-l-blue-600 dark:bg-blue-900/20 dark:border-l-blue-500' : ''
                } ${!inquiry.isRead ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
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
                        className="w-4 h-4 mt-1 rounded cursor-pointer dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                    <img
                        src={inquiry.seekerPhoto}
                        alt={inquiry.seekerName}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600"
                    />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{inquiry.seekerName}</h3>
                            {!inquiry.isRead && <Circle size={8} className="text-blue-600 fill-blue-600 dark:text-blue-400 dark:fill-blue-400" />}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {formatTimestamp(inquiry.timestamp)}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-1">{inquiry.listingTitle}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">{inquiry.message}</p>

                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${status.class} dark:border-gray-600`}>
                            {status.label}
                        </span>
                        {inquiry.conversation.length > 1 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {inquiry.conversation.length} messages
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};