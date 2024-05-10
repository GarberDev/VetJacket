import { classNames } from '@src/helpers/helper';
import { ReactNode } from 'react';

interface ButtonIconProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon: ReactNode; // Icon as a ReactNode
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  tabIndex?: number;
}

const ButtonIcon = ({
  onClick,
  className,
  icon,
  disabled = false,
  type = 'button',
  variant = 'primary',
  tabIndex = -1,
}: ButtonIconProps) => {
  const baseClasses =
    'rounded p-1 text-sm font-medium transition ease-in-out duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: `bg-secondary-500 text-white hover:bg-primary-500 focus:ring-primary-200`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300`,
    soft: `rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100`,
    danger: `bg-red-400 text-white hover:bg-red-700 focus:ring-red-500`,
    tertiary: `bg-transparent text-gray-600 hover:bg-gray-200`,
    huge: 'border text-black text-2xl font-extrabold text-center p-4 rounded-md shadow-lg bg-white minWidth-200 maxWidth-300 margin-8 font-bold',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick();
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
      {...(tabIndex !== undefined ? { tabIndex } : {})}
    >
      {icon}
    </button>
  );
};

export default ButtonIcon;
