// BirthdayDl.jsx
import React from 'react';
import Button from '../../../base/Button';
import useNewClientOnboardingWizardStore from '../../../../store/useNewClientOnboardingWizardStore';

export default function BirthdayDl() {
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
    <h1 className="text-lg font-bold mb-4">Birthday & Drivers License</h1>
    <p className="mb-10">Please enter your birthday and drivers license number this is required for us to prescribe your pet medication.</p>
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-4">
    <p className="text-lg text-left">Your Birthday</p>

<input
        type="date"
        name="human_birthday"
        value={formData.human_birthday}
        onChange={handleInputChange}
        placeholder="Birthday"
        className="border-2 border-gray-300 rounded-md p-2"
      />
      <p className="text-lg text-left">Drivers License Number</p>
      <input
        type="text"
        name="dl"
        value={formData.dl}
        onChange={handleInputChange}
        placeholder="Driver's License Number"
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
