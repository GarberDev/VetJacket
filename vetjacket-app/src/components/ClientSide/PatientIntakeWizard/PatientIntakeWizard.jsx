import React, { useEffect } from 'react';
import {
  PhoneIcon,
  IdentificationIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  UserIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import Wizard from '../../base/Wizard/Wizard';
import useNewClientOnboardingWizardStore from '../../../store/useNewClientOnboardingWizardStore';
import Introduction from './components/Introduction';

import { useParams } from 'react-router-dom';
import NameInput from './components/NameInput';

import IntakeForm from './components/IntakeForm';
import Confirmation from './components/Confirmation';

export default function PatientIntakeWizard() {
  const { uuid } = useParams();
  const { currentStep, setNumSteps, wizardData, loading, setUUID } = useNewClientOnboardingWizardStore((state) => ({
    currentStep: state.currentStep,
    setNumSteps: state.setNumSteps,
    wizardData: state.wizardData,
    loading: state.loading,
    setUUID: state.setUUID
  }));

  const wizardSteps = [
    { name: 'Greeting', icon: <HomeIcon /> },
    { name: 'Name', icon: <IdentificationIcon /> },
    { name: 'IntakeForm', icon: < QuestionMarkCircleIcon /> }, 
  { name: 'Confirmation', icon: <ClipboardDocumentListIcon/> },

 
  ];

  useEffect(() => {
    setUUID(uuid);
    setNumSteps(wizardSteps.length);
  }, [setNumSteps, wizardSteps.length, setUUID, uuid]);

  if (loading) {
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
        {currentStep === 2 && <IntakeForm />}
        {currentStep === 3 && <Confirmation />}


      </Wizard>
    </div>
  );
}
