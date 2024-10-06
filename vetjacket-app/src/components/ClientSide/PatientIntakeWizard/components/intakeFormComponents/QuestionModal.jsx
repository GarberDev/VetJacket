import React, { useState, useEffect } from 'react';
import useNewClientOnboardingWizardStore from '../../../../../store/useNewClientOnboardingWizardStore';
import Button from '../../../../base/Button';

const QuestionModal = ({ questionId, label, closeModal }) => {
  const { formData, updateFormData } = useNewClientOnboardingWizardStore((state) => ({
    formData: state.formData,
    updateFormData: state.updateFormData,
  }));

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(formData[questionId] || '');
  }, [formData, questionId]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    updateFormData({ [questionId]: newValue });
  };

  const handleOptionChange = (option) => {
    setInputValue(option);
    updateFormData({ [questionId]: option });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    closeModal();
  };

  const renderInput = () => {
    if (questionId === 'question_3') {
      return (
        <div className="space-y-2">
          <Button onClick={() => handleOptionChange('Same')} variant={inputValue === 'Same' ? 'primary' : 'secondary'}>Same</Button>
          <Button onClick={() => handleOptionChange('Better')} variant={inputValue === 'Better' ? 'primary' : 'secondary'}>Better</Button>
          <Button onClick={() => handleOptionChange('Worse')} variant={inputValue === 'Worse' ? 'primary' : 'secondary'}>Worse</Button>
        </div>
      );
    }
    if (questionId === 'question_4' || questionId === 'question_8' || questionId === 'question_10') {
      return (
        <div className="space-y-2">
          <Button onClick={() => handleOptionChange('Yes')} variant={inputValue === 'Yes' ? 'primary' : 'secondary'}>Yes</Button>
          <Button onClick={() => handleOptionChange('No')} variant={inputValue === 'No' ? 'primary' : 'secondary'}>No</Button>
        </div>
      );
    }
    if (questionId === 'question_7') {
      return (
        <div className="space-y-2">
          <Button onClick={() => handleOptionChange('Increase')} variant={inputValue === 'Increase' ? 'primary' : 'secondary'}>Increase</Button>
          <Button onClick={() => handleOptionChange('Decrease')} variant={inputValue === 'Decrease' ? 'primary' : 'secondary'}>Decrease</Button>
          <Button onClick={() => handleOptionChange('No Change')} variant={inputValue === 'No Change' ? 'primary' : 'secondary'}>No Change</Button>
        </div>
      );
    }

    return (
      <input
        type="text"
        id={questionId}
        value={inputValue}
        onChange={handleChange}
        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-lg space-y-4">
        <label htmlFor={questionId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {renderInput()}
        <div className="flex justify-end space-x-2">
          <Button onClick={closeModal} variant="secondary">Cancel</Button>
          <Button type="submit" variant="primary">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionModal;
