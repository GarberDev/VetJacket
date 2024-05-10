import React from 'react';
import Button from '../../../base/Button';
import useNewClientOnboardingWizardStore from '../../../../store/useNewClientOnboardingWizardStore';

export default function AddressInput() {
  const { formData, updateFormData, next, prev } = useNewClientOnboardingWizardStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFullAddress = () => {
    updateFormData({
      address: `${formData.streetAddress}, ${formData.city}, ${formData.zipCode}`
    });
  };

  const handleSubmit = (e) => {
    console.log('Event in handleSubmit:', e);  // Debugging to check if event is present
    e.preventDefault();  // Stops the form from submitting in the traditional way
    handleFullAddress();  // Combines address parts into a single string
    console.log('Form Data:', formData);  // Logs the updated form data
    next();  // Proceeds to the next step in the form wizard
  };

  return (
    <div className="fixed text-center inset-x-10 center-0 pt-20 p-4 bg-white">
      <h1 className="text-lg font-bold mb-4">Physical and Email Address</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <p className="text-lg text-left">Please enter your physical address.</p>
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress || ''}
          onChange={handleInputChange}
          placeholder="Street Address"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city || ''}
          onChange={handleInputChange}
          placeholder="City"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode || ''}
          onChange={handleInputChange}
          placeholder="Zip Code"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
        <p className="text-lg text-left">Please enter your email address.</p>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          placeholder="Email Address"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
      </form>
      <div className="p-4 bg-white fixed inset-x-0 bottom-0 flex justify-between">
        <Button onClick={prev} variant="secondary">Back</Button>
        <Button onClick={(e) => handleSubmit(e)} variant="primary">Next</Button>
      </div>
    </div>
  );
}
