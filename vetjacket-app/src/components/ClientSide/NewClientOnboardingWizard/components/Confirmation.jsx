import React, { useState } from 'react';
import Button from '../../../base/Button';
import useNewClientOnboardingWizardStore from '../../../../store/useNewClientOnboardingWizardStore';
import { toast } from 'react-hot-toast';
import OnSuccessModal from './OnSuccessModal '
import { submitPersonPetInfo } from '../../../../api/clientApi'

export default function Confirmation() {

  const { formData, prev, uuid } = useNewClientOnboardingWizardStore(state => ({
    formData: state.formData,
    prev: state.prev,
    uuid: state.uuid
  }));


  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFinish = async (e) => {
    e.preventDefault();
    if (!isConfirmed) {
      toast.error("Please confirm that the information provided is correct.");
      return;
    }

    // Submit the data to the server
    try {
      const result = await submitPersonPetInfo(formData, uuid);
      console.log(result);
      toast.success("Submitted");
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to submit:', error);
      toast.error("Missing information.");
    }
  };

  const handleCheckboxChange = (e) => {
    setIsConfirmed(e.target.checked);
  };

  const handleRecordRequest = () => {
    // Perform the record request logic or redirect as needed
  };

  // Return the JSX for your component
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <h2 className="text-center text-2xl font-semibold mb-4">Confirm Your Information</h2>
      <div className="space-y-2">
        <p><strong>First Name:</strong> {formData.first_name}</p>
        <p><strong>Last Name:</strong> {formData.last_name}</p>
        <p><strong>Primary Phone:</strong> {formData.primary_cell_number}</p>
        <p><strong>Secondary Phone:</strong> {formData.secondary_number}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Birthday:</strong> {formData.human_birthday}</p>
        <p><strong>DL Number:</strong> {formData.dl}</p>
        <p><strong>Pet Name:</strong> {formData.pets_name}</p>
        <p><strong>Species:</strong> {formData.pets_species}</p>
        <p><strong>Breed:</strong> {formData.pets_breed}</p>
        <p><strong>Color:</strong> {formData.pet_color}</p>
        <p><strong>Age:</strong> {formData.pet_age}</p>
        <p><strong>Gender:</strong> {formData.pet_gender}</p>
      </div>
      <label className="inline-flex items-center mt-3">
        <input 
          type="checkbox" 
          className="form-checkbox h-5 w-5 text-gray-600" 
          checked={isConfirmed} 
          onChange={handleCheckboxChange} 
        />
        <span className="ml-2 text-gray-700">
          I confirm that the information provided is correct and complete.
        </span>
      </label>
      <div className="fixed p-4 inset-x-0 bottom-0 flex w-full justify-between px-4">
        <Button onClick={prev} variant="secondary">Back</Button>
        <Button onClick={handleFinish} variant="primary" disabled={!isConfirmed}>
          Confirm
        </Button>
      </div>
      <OnSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onRecordRequest={handleRecordRequest}
      />
    </div>
  );
}
