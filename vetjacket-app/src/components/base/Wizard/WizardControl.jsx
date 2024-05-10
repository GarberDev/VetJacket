// WizardControl.jsx
import React from 'react';

function WizardControl({ next }) {
  return (
    <div className="flex justify-end w-full mt-4">
      <button
        onClick={next}
        className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-800"
      >
        Next
      </button>
    </div>
  );
}

export default WizardControl;
