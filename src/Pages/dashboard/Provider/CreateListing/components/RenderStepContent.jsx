import { FaBed, FaDollarSign, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import BasicDetails from "./BasicDetails/BasicDetails";
import LocationAndAddress from "./LocationAndAddress/LocationAndAddress";
import RoommatePreferences from "./RoommatePreferences/RoommatePreferences";
import PropertyFeatures from "./PropertyFeatures/PropertyFeatures";
import FinancialAndFinalDetails from "./FinancialAndFinalDetails/FinancialAndFinalDetails";

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
                <PropertyFeatures props={{ register, errors, watch }}></PropertyFeatures>
            );
        case 5:
            return (
                <FinancialAndFinalDetails props={{ register, errors, watch }}></FinancialAndFinalDetails>
            );
        default:
            return null;
    }
};

export default RenderStepContent;