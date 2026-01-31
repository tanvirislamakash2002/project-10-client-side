import { Award, CheckCircle, FileText, Sparkles } from 'lucide-react';
import React from 'react';

const Step1 = ({props}) => {
const {userInfo, userProfile}=props;
    return (
        <div className="space-y-6">
              {/* Pre-filled Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br p-1 from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl">
                      <img className='w-full h-full object-cover rounded-full' src={userInfo?.photoURL}/>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900">{userInfo?.name}</h4>
                      <p className="text-gray-600">{userProfile.age} years old • {userProfile.occupation}</p>
                      <div className="flex gap-2 mt-2">
                        {userProfile.verified && (
                          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                            <CheckCircle className="w-3 h-3" />
                            Identity Verified
                          </span>
                        )}
                        {userProfile.references && (
                          <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                            <FileText className="w-3 h-3" />
                            References Available
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-3xl font-bold text-blue-600">{userProfile.compatibilityScore}%</p>
                        <p className="text-xs text-gray-600 mt-1">Match Score</p>
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-semibold hover:underline">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Premium Badge (Optional) */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-600" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      Priority Application
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">PRO</span>
                    </h4>
                    <p className="text-sm text-gray-600">Your application will be highlighted and shown first to the provider</p>
                  </div>
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
    );
};

export default Step1;