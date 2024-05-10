import React, { useState, useEffect } from 'react';
import Button from '../../../base/Button';
import usePetOwnerOnboardingWizardStore from '../../../../store/useNewClientOnboardingWizardStore';
import { useParams } from 'react-router-dom';
import { fetchUserData } from '../../../../api/clientApi';

export default function Introduction() {
  const { next } = usePetOwnerOnboardingWizardStore();
  const [userData, setUserData] = useState(null);
  const { uuid } = useParams();

  useEffect(() => {
    if (uuid) {
      fetchUserData(uuid)
        .then(data => {
          setUserData(data.user);
        })
        .catch(error => {
          console.error('Failed to fetch user data:', error);
        });
    }
  }, [uuid]);

  if (!userData) {
    return <h1 className="text-lg font-bold mb-4">No User attached please request another link</h1>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    next();
  };

  return (
    <div className="flex flex-col">
      <div className="text-center p-4 overflow-auto">
        
        <h1 className="text-lg font-bold mb-4">Welcome to {userData.name}</h1>
        <p>Please fill out our new client form before the date of the appointment.</p>
        <p><strong>Contact: </strong>{userData.email}</p>

        <div className="fixed inset-x-10 center-0 pt-40 p-4 bg-white">

        <img src="/VetWhiteBack.webp" alt="Veterinarian" className="mx-auto my-4 max-h-45" />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 p-4 bg-white">
        <form onSubmit={onSubmit} className="w-full">
          <Button type="submit" variant="primary" className="w-full">Start</Button>
        </form>
      </div>
    </div>
  );
}
