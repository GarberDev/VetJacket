import React, { useState } from 'react';
import { classNames } from '@src/helpers/helper';

export default function Tooltip({
  message,
  className,
  children,
  position = 'top',
  open, // Optional prop
}) {
  const [isVisible, setIsVisible] = useState(false);

  // Determine tooltip visibility
  const shouldShow = typeof open === 'boolean' ? open : isVisible;

  // Function to determine tooltip position and carrot position
  const [tooltipPositionClass, carrotPositionClass] = (() => {
    switch (position) {
      case 'bottom':
        return ['bottom-10 mb-2', 'top-0 mt-[-6px]']; // Adjust carrot position
      case 'left':
        return ['left-10 ml-2', 'right-0 mr-[-6px]'];
      case 'right':
        return ['right-10 mr-2', 'left-0 ml-[-6px]'];
      default:
        return ['top-10 mt-2', 'bottom-0 mb-[-6px]']; // Default to top
    }
  })();

  return (
    <div
      className="group relative flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <span
        className={classNames(
          className,
          'z-50 absolute transition-all rounded bg-gray-800 p-2 text-xs text-white',
          shouldShow ? 'scale-100' : 'scale-0',
          tooltipPositionClass,
        )}
        style={{ transitionDelay: shouldShow ? '150ms' : '0ms' }}
      >
        {message}
        <span
          className={classNames(
            'absolute w-3 h-3 bg-gray-800',
            carrotPositionClass,
            'transform rotate-45', // Rotate the square to create a diamond shape
          )}
        />
      </span>
    </div>
  );
}
