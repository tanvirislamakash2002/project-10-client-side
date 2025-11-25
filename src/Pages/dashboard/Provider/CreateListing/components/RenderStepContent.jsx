import { FaBed, FaDollarSign, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import BasicDetails from "./BasicDetails/BasicDetails";
import LocationAndAddress from "./LocationAndAddress/LocationAndAddress";
import RoommatePreferences from "./RoommatePreferences/RoommatePreferences";
import PropertyFeatures from "./PropertyFeatures/PropertyFeatures";

const RenderStepContent = ({ props }) => {
    const { currentStep, register, errors, watch, handleGeocodeAddress } = props
    switch (currentStep) {
        case 1:
            return (
                <BasicDetails props={{ register, errors }}></BasicDetails>
            );
        case 2:
            return (
                <LocationAndAddress props={{ register, errors, watch, handleGeocodeAddress }}></LocationAndAddress>
            );
        case 3:
            return (
                <RoommatePreferences props={{ register, errors, watch }}></RoommatePreferences>
            );
        case 4:
            return (
                <PropertyFeatures  props={{ register, errors, watch }}></PropertyFeatures>
            );
        case 5:
            return (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-base-content">Financial & Final Details</h3>
                    <p className="text-text-muted">Set rent, deposit, and review your listing before submission.</p>
                    <div className="bg-base-200 rounded-lg p-8 text-center">
                        <FaDollarSign className="mx-auto text-6xl text-primary mb-4" />
                        <p className="text-text-muted">Step 5 content will go here</p>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

export default RenderStepContent;