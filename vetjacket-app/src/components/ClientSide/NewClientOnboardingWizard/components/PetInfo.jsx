import React from 'react';
import Button from '../../../base/Button';
import useNewClientOnboardingWizardStore from '../../../../store/useNewClientOnboardingWizardStore';

export default function PetInfo() {
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
    <div className="fixed text-center inset-x-10 center-0 pt-10 p-4 bg-white">
      <h2 className="text-center text-2xl font-semibold">Pet Info</h2>
      <form onSubmit={handleSubmit} className="pt-4 flex flex-col space-y-4">
        <p className="text-lg text-left">Pet's Name</p>
        <input
          type="text"
          name="pets_name"
          value={formData.pets_name}
          onChange={handleInputChange}
          placeholder="Pet's Name"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
        <p className="text-lg text-left">Species</p>
        <select
          name="pets_species"
          value={formData.pets_species}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded-md p-2"
          required
        >
          <option value="">Select Species</option>
          <option value="Canine">Canine</option>
          <option value="Feline">Feline</option>
        </select>
        <p className="text-lg text-left">Breed</p>
        <input
          type="text"
          name="pets_breed"
          value={formData.pets_breed}
          onChange={handleInputChange}
          placeholder="Breed"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <p className="text-lg text-left">Color</p>
        <input
          type="text"
          name="pet_color"
          value={formData.pet_color}
          onChange={handleInputChange}
          placeholder="Color"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
        <p className="text-lg text-left">Age</p>
        <input
          type="number"
          name="pet_age"
          value={formData.pet_age}
          onChange={handleInputChange}
          placeholder="Age"
          className="border-2 border-gray-300 rounded-md p-2"
          required
        />
        {/* //dob not age */}
        <p className="text-lg text-left">Gender</p>
        <select
          name="pet_gender"
          value={formData.pet_gender}
          onChange={handleInputChange}
          className="border-2 border-gray-300 rounded-md p-2"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Neutered Male">Neutered Male</option>
          <option value="Spayed Female">Spayed Female</option>
        </select>
        <div className="fixed p-4 inset-x-0 bottom-0 flex w-full justify-between px-4">
          <Button onClick={prev} variant="secondary">Back</Button>
          <Button type="submit" variant="primary">Next</Button>
        </div>
      </form>
    </div>
  );
}
