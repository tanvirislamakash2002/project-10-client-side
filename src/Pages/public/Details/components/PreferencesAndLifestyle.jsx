import { Briefcase, Calendar, Home, UserCheck, Users } from 'lucide-react';
import React from 'react';

const PreferencesAndLifestyle = ({ props }) => {
    const { singleRoom } = props
    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                    <Users className="w-6 h-6 text-primary" />
                    Ideal Roommate
                </h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-base-200 rounded-lg p-4">
                            <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                                <UserCheck className="w-4 h-4" />
                                Gender Preference
                            </p>
                            <p className="font-semibold">{singleRoom.preferredGender}</p>
                        </div>

                        <div className="bg-base-200 rounded-lg p-4">
                            <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Age Range
                            </p>
                            <p className="font-semibold">
                                {singleRoom.preferredAgeRange.min} - {singleRoom.preferredAgeRange.max} years
                            </p>
                        </div>

                        <div className="bg-base-200 rounded-lg p-4">
                            <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                Occupation
                            </p>
                            <p className="font-semibold">{singleRoom.occupationPreference}</p>
                        </div>

                        <div className="bg-base-200 rounded-lg p-4">
                            <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Smoking Policy
                            </p>
                            <p className="font-semibold">{singleRoom.smokingPolicy}</p>
                        </div>

                        <div className="bg-base-200 rounded-lg p-4 md:col-span-2">
                            <p className="text-sm text-base-content/70 mb-1 flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Pet Policy
                            </p>
                            <p className="font-semibold">{singleRoom.petPolicy}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Lifestyle Preferences</h3>
                        <div className="flex flex-wrap gap-2">
                            {singleRoom.lifestyleTags?.map((tag, idx) => (
                                <span key={idx} className="badge badge-primary badge-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreferencesAndLifestyle;