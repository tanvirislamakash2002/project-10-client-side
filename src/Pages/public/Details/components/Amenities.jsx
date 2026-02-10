import { Car, CheckCircle, Dumbbell, Home, Waves, Wifi } from 'lucide-react';
import React from 'react';

const Amenities = ({ props }) => {
    const { singleRoom } = props
    const amenityIcons = {
        'WiFi': Wifi,
        'Laundry': Home,
        'Parking': Car,
        'Gym': Dumbbell,
        'Pool': Waves
    };
    console.log(singleRoom);
    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-xl mb-4">Amenities & Features</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {singleRoom.amenities?.map((amenity, idx) => {
                        const IconComponent = amenityIcons[amenity] || CheckCircle;
                        return (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                                <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="font-medium">{amenity}</span>
                            </div>
                        );
                    })}
                </div>

                {singleRoom.utilitiesIncluded && (
                    <div className="alert alert-success mt-4">
                        <CheckCircle className="w-5 h-5" />
                        <span>All utilities included in rent</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Amenities;