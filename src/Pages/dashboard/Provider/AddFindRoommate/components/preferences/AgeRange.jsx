import React from 'react';
import { FaCalendarAlt, FaMinus } from 'react-icons/fa';

const AgeRange = ({ props }) => {
    const { register, errors, watch, setValue } = props;
    
    // Watch both age fields to detect changes
    const min = watch('preferences.ageRange.min');
    const max = watch('preferences.ageRange.max');

    // Handle quick-select dropdown changes
    const handleQuickSelect = (e) => {
        const selectedValue = e.target.value;
        
        if (selectedValue) {
            const [min, max] = selectedValue.split('-');
            setValue('preferences.ageRange.min', min);
            setValue('preferences.ageRange.max', max || '');
            
            // Reset the dropdown to default after selection
            e.target.value = '';
        }
    };

    // Reset the other field when one is cleared
    React.useEffect(() => {
        if (min === '' && max !== '') {
            // If minAge is cleared but maxAge has value, clear maxAge too
            setValue('preferences.ageRange.max', '');
        }
    }, [min, max, setValue]);

    React.useEffect(() => {
        if (max === '' && min !== '') {
            // If maxAge is cleared but minAge has value, clear minAge too
            setValue('preferences.ageRange.min', '');
        }
    }, [max, min, setValue]);

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="inline mr-2 text-purple-600" />
                Preferred Age Range
            </label>
            
            <div className="flex items-center space-x-3">
                {/* Minimum Age */}
                <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Minimum Age</label>
                    <input
                        type="number"
                        min="18"
                        max="80"
                        {...register('preferences.ageRange.min', { 
                            min: { value: 18, message: "Minimum age must be 18 or above" },
                            max: { value: 80, message: "Please enter a valid age" },
                            validate: (value) => {
                                const max = watch('preferences.ageRange.max');
                                if (max && value && parseInt(value) > parseInt(max)) {
                                    return "Minimum age cannot be greater than maximum age";
                                }
                                return true;
                            }
                        })}
                        placeholder="18"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.preferences?.min && (
                        <p className="text-red-500 text-xs mt-1">{errors.preferences.min.message}</p>
                    )}
                </div>

                {/* Separator */}
                <div className="pt-5">
                    <FaMinus className="text-gray-400" />
                </div>

                {/* Maximum Age */}
                <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Maximum Age</label>
                    <input
                        type="number"
                        min="18"
                        max="80"
                        {...register('preferences.ageRange.max', {
                            min: { value: 18, message: "Maximum age must be 18 or above" },
                            max: { value: 80, message: "Please enter a valid age" },
                            validate: (value) => {
                                const min = watch('preferences.ageRange.min');
                                if (min && value && parseInt(value) < parseInt(min)) {
                                    return "Maximum age cannot be less than minimum age";
                                }
                                return true;
                            }
                        })}
                        placeholder="35"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.preferences?.max && (
                        <p className="text-red-500 text-xs mt-1">{errors.preferences.max.message}</p>
                    )}
                </div>
            </div>

            {/* Quick-select dropdown */}
            <div className="mt-3">
                <label className="block text-xs text-gray-500 mb-1">Or choose a common range:</label>
                <select
                    onChange={handleQuickSelect}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                    <option value="">Select a range...</option>
                    <option value="18-25">18-25 years</option>
                    <option value="22-30">22-30 years</option>
                    <option value="25-35">25-35 years</option>
                    <option value="30-40">30-40 years</option>
                    <option value="35-45">35-45 years</option>
                    <option value="40-50">40-50 years</option>
                    <option value="45-55">45-55 years</option>
                    <option value="50-60">50-60 years</option>
                    <option value="55-65">55-65 years</option>
                    <option value="60-70">60-70 years</option>
                    <option value="65-75">65-75 years</option>
                    <option value="70-80">70-80 years</option>
                </select>
            </div>

            {/* Display current selection */}
            {(min || max) && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                        Selected range: <strong>{min || 'Any'}</strong> to <strong>{max || 'Any'}</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default AgeRange;