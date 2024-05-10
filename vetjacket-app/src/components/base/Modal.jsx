import { classNames } from "../helpers/helper";
import React, { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, children, className = '' }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return <></>;

  return (
    <div
      className={classNames(
        className,
        'z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center',
      )}
      onClick={handleModalClick}
    >
      <div
        className="bg-white backdrop-blur-md p-4 rounded shadow-lg border border-gray-300 max-w-xl overflow-y-auto"
        style={{
          maxWidth: '800px',
          width: '80%',
          maxHeight: '80vh',
          paddingBottom: '1rem',
        }}
      >
        {children}
      </div>
    </div>
  );
};
