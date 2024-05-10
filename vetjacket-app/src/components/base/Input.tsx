import React from 'react';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface InputProps {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  name: string;
  control: any;
  rules?: any;
  type?: string;
  error?: any;
  mask?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  uppercase?: boolean;
  autoFocus?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  defaultValue,
  name,
  type = 'text',
  control,
  rules,
  error,
  mask,
  icon,
  onIconClick,
  uppercase = true,
  autoFocus = false,
}) => {
  const inputClass = `block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-0.5 ${
    error ? 'border-red-500 ring-red-500' : 'ring-gray-300 border-gray-300'
  } placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`;

  return (
    <div className="flex flex-col relative">
      {label && (
        <label
          htmlFor={name}
          className={`${
            uppercase ? 'uppercase' : ''
          } text-xs font-medium leading-6 ${
            error ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { ref, ...field } }) =>
          type === 'textarea' ? (
            <textarea
              {...field}
              placeholder={placeholder}
              className={inputClass}
              autoFocus={autoFocus}
            />
          ) : (
            <InputMask
              {...field}
              mask={mask}
              placeholder={placeholder}
              className={inputClass}
              type={type}
              autoFocus={autoFocus}
            />
          )
        }
      />
      {icon && (
        <div
          onClick={onIconClick}
          className="absolute inset-y-0 right-0 p-2 cursor-pointer text-gray-600 flex items-center"
          style={{ marginRight: '0.5rem' }} // Adjust the margin as needed
        >
          {icon}
        </div>
      )}
      <div className={`text-xs text-red-500 h-5 ${!error && 'opacity-0'}`}>
        {error?.message}
      </div>
    </div>
  );
};

export default Input;
