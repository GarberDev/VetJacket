import React from 'react';
import Button from '../../../base/Button';
import useNewClientOnboardingWizardStore from '../../../../store/useNewClientOnboardingWizardStore';

export default function NameInput() {
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
      <h1 className="text-lg font-bold mb-4">Patient/Client Name Input</h1>
      <form onSubmit={handleSubmit} className="pt-4 flex flex-col space-y-4">
      <p className="text-lg text-left">Your First Name</p>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          placeholder="First Name"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
        <p className="text-lg text-left">Your Last Name</p>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
        <p className="text-lg text-left">Your Email</p>
        <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email Address"
        className="border-2 border-gray-300 rounded-md p-2"
        />
        <p className="text-lg text-left">Patient Name</p>
        <input
          type="text"
          name="pets_name"
          value={formData.pets_name}
          onChange={handleInputChange}
          placeholder="Pets Name"
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
