import React from 'react';
import { Modal } from '../../../base/Modal';
import Button from '../../../base/Button';

const OnSuccessModal = ({ isOpen, onClose, onRecordRequest, userId }) => {
  const handlePatientIntakeRedirect = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL; // Using environment variable for base URL
    window.location.href = `${baseUrl}/patient-intake/${userId}`;
  };

  const handleCloseWindow = () => {
    window.close(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">Thank you for submitting the new client form!</h3>
      <p>If you need to request records from another hospital to our hospital, please click below.</p>
      <Button
        className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        onClick={onRecordRequest}
      >
        Request Records
      </Button>
      <Button
        className="mt-4 py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
        onClick={handlePatientIntakeRedirect}
      >
        Patient Intake Form
      </Button>
      <Button
        className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
        variant="danger"
        onClick={handleCloseWindow}
      >
        Exit
      </Button>
    </Modal>
  );
};

export default OnSuccessModal;
