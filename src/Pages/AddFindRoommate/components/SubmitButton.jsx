import React from 'react';
import { FaHome } from 'react-icons/fa';

const SubmitButton = ({ props }) => {
    const { handleSubmit,onSubmit, isSubmitting } = props
    return (
        <div className="pt-6 border-t border-gray-200">
            <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Creating Your Post...</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-3">
                        <FaHome />
                        <span>Create Roommate Post</span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default SubmitButton;