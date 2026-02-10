import { Calendar, Clock, DollarSign, Shield, TrendingUp } from 'lucide-react';
import React from 'react';

const TitleAndQuickFacts = ({ props }) => {
    const { singleRoom, formattedDate } = props;
    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h1 className="card-title text-3xl mb-4">{singleRoom.title}</h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-success" />
                            <p className="text-sm text-success font-medium">Monthly Rent</p>
                        </div>
                        <p className="text-2xl font-bold text-success">
                            {singleRoom?.pricing?.currency === 'USD' ? '$' : ''}{singleRoom?.pricing?.rent}
                        </p>
                    </div>

                    <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-4 h-4 text-info" />
                            <p className="text-sm text-info font-medium">Deposit</p>
                        </div>
                        <p className="text-2xl font-bold text-info">
                            {singleRoom?.pricing?.currency === 'USD' ? '$' : ''}{singleRoom?.pricing?.securityDeposit}
                        </p>
                    </div>

                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-warning" />
                            <p className="text-sm text-warning font-medium">Available</p>
                        </div>
                        <p className="text-sm font-bold text-warning">{formattedDate}</p>
                    </div>

                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-secondary" />
                            <p className="text-sm text-secondary font-medium">Lease</p>
                        </div>
                        <p className="text-sm font-bold text-secondary">{singleRoom?.leaseDuration}</p>
                    </div>
                </div>

                {/* Application Count */}
                {singleRoom?.applicationCount > 0 && (
                    <div className="alert alert-info mt-4">
                        <TrendingUp className="w-5 h-5" />
                        <span><strong>{singleRoom?.applicationCount}</strong> people have applied for this room</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TitleAndQuickFacts;