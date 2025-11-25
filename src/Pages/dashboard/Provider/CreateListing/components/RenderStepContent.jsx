import { FaBed, FaDollarSign, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import BasicDetails from "./BasicDetails/BasicDetails";

 const RenderStepContent = ({props}) => {
    const {currentStep,register,errors}=props
    switch (currentStep) {
      case 1:
        return (
          <BasicDetails props={{ register, errors }}></BasicDetails>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-base-content">Location & Address</h3>
            <p className="text-text-muted">Where is your property located? Provide complete address details.</p>
            <div className="bg-base-200 rounded-lg p-8 text-center">
              <FaMapMarkerAlt className="mx-auto text-6xl text-primary mb-4" />
              <p className="text-text-muted">Step 2 content will go here</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-base-content">Roommate Preferences</h3>
            <p className="text-text-muted">What kind of roommate are you looking for?</p>
            <div className="bg-base-200 rounded-lg p-8 text-center">
              <FaUsers className="mx-auto text-6xl text-primary mb-4" />
              <p className="text-text-muted">Step 3 content will go here</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-base-content">Property Features</h3>
            <p className="text-text-muted">Add amenities, room details, and policies.</p>
            <div className="bg-base-200 rounded-lg p-8 text-center">
              <FaBed className="mx-auto text-6xl text-primary mb-4" />
              <p className="text-text-muted">Step 4 content will go here</p>
            </div>
          </div>
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