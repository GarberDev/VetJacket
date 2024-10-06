import React, { useState } from 'react';
import useNewClientOnboardingWizardStore from '../../../../store/useNewClientOnboardingWizardStore';

import Button from '../../../base/Button';
import Questions from './intakeFormComponents/Questions';
import QuestionModal from './intakeFormComponents/QuestionModal';
import { questions } from './intakeFormComponents/questionData';

const IntakeForm = () => {
  const { formData, prev, next } = useNewClientOnboardingWizardStore((state) => ({
    formData: state.formData,
    prev: state.prev,
    next: state.next,
  }));

  const [modalOpen, setModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const openModal = (questionId) => {
    setCurrentQuestion(questionId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentQuestion(null);
  };

  return (
    <div className="p-4 space-y-4">
      <p className="text-center">Please complete all relevant fields related to your pet's visit, and press 'Next' when you are done.</p>
      <Questions formData={formData} openModal={openModal} />
      {modalOpen && (
        <QuestionModal
          questionId={currentQuestion}
          label={questions.find((q) => q.id === currentQuestion).label}
          closeModal={closeModal}
        />
      )}
      <div className="pt-4 inset-x-0 bottom-0 flex w-full justify-between px-4">
        <Button onClick={prev} variant="secondary">Back</Button>
        <Button onClick={next} variant="primary">Next</Button>
      </div>
    </div>
  );
};

export default IntakeForm;