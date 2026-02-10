import { Bath, Bed, Home, Sofa, Users } from 'lucide-react';
import React from 'react';

const RoomDetails = ({ props }) => {
    const { singleRoom} = props;
    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-xl mb-4">Room Details</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="stat bg-base-200 rounded-lg p-4">
                        <div className="stat-figure text-primary">
                            <Home className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs">Property Type</div>
                        <div className="stat-value text-lg">{singleRoom?.propertyType}</div>
                    </div>

                    <div className="stat bg-base-200 rounded-lg p-4">
                        <div className="stat-figure text-primary">
                            <Bed className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs">Room Type</div>
                        <div className="stat-value text-lg">{singleRoom?.roomType}</div>
                    </div>

                    <div className="stat bg-base-200 rounded-lg p-4">
                        <div className="stat-figure text-primary">
                            <Home className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs">Room Size</div>
                        <div className="stat-value text-lg">{singleRoom?.roomSize?.value} ft²</div>
                    </div>

                    <div className="stat bg-base-200 rounded-lg p-4">
                        <div className="stat-figure text-primary">
                            <Bath className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs">Bathroom</div>
                        <div className="stat-value text-lg text-sm">{singleRoom.bathroomType}</div>
                    </div>

                    <div className="stat bg-base-200 rounded-lg p-4">
                        <div className="stat-figure text-primary">
                            <Sofa className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs">Furnishing</div>
                        <div className="stat-value text-lg text-sm">{singleRoom.furnishing}</div>
                    </div>

                    <div className="stat bg-base-200 rounded-lg p-4">
                        <div className="stat-figure text-primary">
                            <Users className="w-8 h-8" />
                        </div>
                        <div className="stat-title text-xs">Roommates</div>
                        <div className="stat-value text-lg">{singleRoom.currentOccupants}/{singleRoom.totalRoommates}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;