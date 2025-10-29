import { Home } from "lucide-react";
import { Link } from "react-router";

export const EmptyState = () => (
    <div className="text-center py-16">
        <div className="text-8xl mb-4">🏠</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Saved Listings Yet</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start browsing available rooms and save your favorites to keep track of them here.
        </p>
        <Link to={'/browse'}>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Start Browsing Listings
        </button>
        </Link>
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-lg mx-auto text-left">
            <h4 className="font-semibold text-blue-900 mb-3">Tips for Finding Good Listings:</h4>
            <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Check listings frequently - good rooms get taken quickly</span>
                </li>
                <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Set up price alerts to get notified of drops</span>
                </li>
                <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Save multiple options to increase your chances</span>
                </li>
            </ul>
        </div>
    </div>
);