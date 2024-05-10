// PhoneNumberInput.jsx
import React from 'react';
import Button from '../../../base/Button';
import useNewClientOnboardingWizardStore from '../../../../store/useNewClientOnboardingWizardStore';

export default function PhoneNumberInput() {
  const { formData, updateFormData, next, prev } = useNewClientOnboardingWizardStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    next();
  };

  return (
    <div className="fixed text-center inset-x-10 center-0 pt-20 p-4 bg-white">
    <h1 className="text-lg font-bold mb-4">Phone Number Input</h1>
    <p className='mb-10'>Please enter your phone numbers you would like to have on file</p>
  {/* <img src="/VetWhiteBack.webp" alt="Veterinarian" className="mx-auto my-4 max-h-45" /> */}
    <form onSubmit={handleSubmit} className="pt-4 flex flex-col space-y-4">
    <p className="text-lg text-left">Cell Phone Number</p>
      <input
        type="tel" 
        name="primary_cell_number"
        value={formData.primary_cell_number}
        onChange={handleInputChange}
        placeholder="Primary Phone Number"
        className="border-2 border-gray-300 rounded-md p-2"
        required
      />
      <p className="text-lg text-left">Secondary Phone Number</p>

      <input
        type="tel"
        name="secondary_number"
        value={formData.secondary_number}
        onChange={handleInputChange}
        placeholder="Optional"
        className="border-2 border-gray-300 rounded-md p-2"
      />
      <div className="fixed p-4 inset-x-0 bottom-0 flex w-full justify-between px-4">      
        <Button onClick={prev} variant="secondary">Back</Button>
        <Button type="submit" variant="primary">Next</Button>
      </div>
    </form>
    </div>
  );
}
