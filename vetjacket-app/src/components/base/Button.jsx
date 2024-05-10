import React from 'react';
import { classNames } from '../helpers/helper';

function Button({
  onClick,
  className,
  children,
  disabled = false,
  type = 'button',
  variant = 'primary',
  tabIndex = -1,
}) {
  const baseClasses = 'rounded px-5 py-2 text-sm font-medium transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: `bg-primary-500 text-white hover:bg-primary-700 focus:ring-primary-200`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300`,
    soft: `rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100`,
    danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`,
    tertiary: `bg-transparent text-gray-600 hover:text-gray-800 focus:ring-gray-300`,
    huge: 'border text-black text-2xl font-extrabold text-center p-4 rounded-md shadow-lg bg-white minWidth-200 maxWidth-300 margin-8 font-bold',
  };  
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();  // Stops any further actions when the button is disabled
      return;
    }
    if (onClick) onClick(e);  // Passes the event object to the parent handler
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        disabled && disabledClasses,
        className,
      )}
      {...(tabIndex !== -1 ? { tabIndex } : {})}
    >
      {children}
    </button>
  );
}

export default Button;