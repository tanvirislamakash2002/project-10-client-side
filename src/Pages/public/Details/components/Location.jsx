import { MapPin } from 'lucide-react';
import React from 'react';

const Location = ({ props }) => {
    const { singleRoom, formattedAddress } = props
    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                    Location
                </h2>

                <div className="mb-4">
                    <p className="font-semibold text-lg">{singleRoom.address?.city}, {singleRoom.address.state}</p>
                    <p className="text-base-content/70">{formattedAddress}</p>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg h-64 flex items-center justify-center border border-base-300">
                    <div className="text-center">
                        <MapPin className="w-16 h-16 text-primary mx-auto mb-2" />
                        <p className="text-base-content/70 font-medium">Interactive Map</p>
                        <p className="text-sm text-base-content/50">Exact location shown after contact</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;