import { TrendingUp } from "lucide-react";

export const StatCard = ({ icon: Icon, label, value, subValue, trend, color }) => (
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