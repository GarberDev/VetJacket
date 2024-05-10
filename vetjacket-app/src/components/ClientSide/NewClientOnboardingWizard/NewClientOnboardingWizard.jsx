import React, { useEffect, useState } from 'react';

import {
  PhoneIcon,
  IdentificationIcon,
  BuildingStorefrontIcon,
  GlobeAltIcon,
  TicketIcon,
  UserIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import Wizard from '../../base/Wizard/Wizard';
import useNewClientOnboardingWizardStore from '../../../store/useNewClientOnboardingWizardStore'
import Introduction from './components/Introduction';
import NameInput from './components/NameInput';
import PhoneNumberInput from './components/PhoneNumberInput';
import AddressInput from './components/AddressInput';
import BirthdayDl from './components/BirthdayDl';
import PetInfo from './components/PetInfo';
import Confirmation from './components/Confirmation';
import { useParams } from 'react-router-dom';

export default function NewClientOnboardingWizard() {
  const { uuid } = useParams();
  const { currentStep, setNumSteps, wizardData, loading, setUUID} = useNewClientOnboardingWizardStore((state) => ({
    currentStep: state.currentStep,
    setNumSteps: state.setNumSteps,
    wizardData: state.wizardData,
    loading: state.loading,
    setUUID: state.setUUID

  }));

  const wizardSteps = [
    { name: 'Greeting', icon: <BuildingStorefrontIcon /> },
    { name: 'Name', icon: <IdentificationIcon /> },
    { name: 'Phone Number Input', icon: <PhoneIcon /> },
    { name: 'Address Input', icon: <GlobeAltIcon /> },
    { name: 'Birthday and Drivers License', icon: <TicketIcon /> },
    { name: 'Pet Info', icon: <UserIcon/> },
    { name: 'Confirm Information and Sign', icon: <CheckIcon /> },
  ];

  useEffect(() => {
    setUUID(uuid);

    setNumSteps(wizardSteps.length);
  }, [setNumSteps, wizardSteps.length]);

  // Ensure loading is being used from the destructured object, not from within wizardData
  if (loading) {
    // If loading is true, render loading indicator or handle accordingly
    return <div>Loading...</div>;
  }

  return (
    <div>
       <Wizard
        currentStep={currentStep}
        steps={wizardSteps}
        loading={loading}
      >
        {currentStep === 0 && <Introduction />}
        {currentStep === 1 && <NameInput />}
        {currentStep === 2 && <PhoneNumberInput />}
        {currentStep === 3 && <AddressInput />}
        {currentStep === 4 && <BirthdayDl />}
        {currentStep === 5 && <PetInfo />}
        {currentStep === 6 && <Confirmation />}
      </Wizard>
    </div>
  );
}
