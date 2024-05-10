// Wizard.jsx
import { classNames } from "../../helpers/helper";
import React from 'react';

function Wizard({ currentStep, steps, children }) {
  const renderProgressBar = (index) => {
    const width = currentStep >= index ? '100%' : '0%';

    return (
      <div
        className="absolute flex align-center items-center align-middle content-center"
        style={{
          width: 'calc(100% - 2.5rem - 1rem)',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
          <div className="w-0 bg-indigo-400 py-0.5" style={{ width }}></div>
        </div>
      </div>
    );
  };

  const renderStepIcon = (icon, index) => {
    return (
      <div
        className={classNames(
          'w-8 h-8 mx-auto rounded-full text-lg text-white flex items-center',
          index <= currentStep ? 'bg-green-600' : 'bg-blue-600',
        )}
      >
        <span className="text-center text-white w-full flex items-center justify-center">
          {React.isValidElement(icon) &&
            React.cloneElement(icon, { width: 16 })}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full py-6">
      <div
        className={'w-full grid'}
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((step, index) => (
          <div key={index}>
            <div className="relative mb-2">
              {index > 0 && renderProgressBar(index)}
              {renderStepIcon(step.icon, index)}
            </div>
          </div>
        ))}
      </div>

      <div>{children}</div>
    </div>
  );
}

export default Wizard;
