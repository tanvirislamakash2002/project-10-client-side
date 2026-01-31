import { CheckCircle } from 'lucide-react';
import React from 'react';

const Footer = ({ props }) => {
    const { step, setStep, totalSteps, handleClose, handleSubmit, isSubmitting } = props
    return (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-lg p-6">
            <div className="flex items-center justify-between gap-4">
                {step > 1 && (
                    <button
                        onClick={() => setStep(step - 1)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                        Back
                    </button>
                )}

                <div className="flex-1"></div>

                <button
                    onClick={handleClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                    Cancel
                </button>

                {step < totalSteps ? (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Continue
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Submit Application
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Footer;