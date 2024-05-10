import { useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { classNames } from '@src/helpers/helper';

export interface InputField {
  id: string;
  label: string;
  prefix?: string;
  inputType: string;
  extraProps?: any;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  suffix?: string;
  required?: boolean;
}

interface InputGroupProps {
  inputGroups: InputField[];
  setData?: (data: any) => void;
}

export default function InputGroup(props: InputGroupProps) {
  const { inputGroups, setData } = props;
  const {
    control,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const values = useWatch({ control });

  useEffect(() => {
    console.log('HERE YOU GO');
    if (!setData) {
      return;
    }
    if (Object.values(values).length > 0) {
      setData(values);
    }
  }, [values]);

  return (
    <form className="isolate -space-y-px rounded-md shadow-sm">
      {inputGroups.map((inputField, index) => (
        <div
          key={index}
          className={classNames(
            index == 0 ? 'rounded-b-none' : 'rounded-t-none',
            'relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600',
          )}
        >
          <label
            htmlFor={inputField.id}
            className="block text-xs font-medium text-gray-900"
          >
            {inputField.label}
          </label>
          <div className="flex">
            {['text', 'number', 'tel'].includes(
              inputField.inputType ?? 'text',
            ) && (
              <>
                {inputField.prefix && (
                  <div className="pointer-events-none flex items-center px-1">
                    <span className="text-gray-500 sm:text-sm">
                      {inputField.prefix}
                    </span>
                  </div>
                )}
                <Controller
                  name={inputField.id}
                  control={control}
                  defaultValue={inputField.value}
                  rules={{
                    required: inputField.required ?? true,
                    pattern:
                      inputField.inputType === 'tel'
                        ? {
                            value: /^\d{10}$/,
                            message: 'Invalid phone number',
                          }
                        : undefined,
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={inputField.value}
                      disabled={inputField.disabled ?? false}
                      type={inputField.inputType ?? 'text'}
                      name={inputField.label}
                      id={inputField.id}
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder={inputField.placeholder}
                      {...inputField.extraProps}
                    />
                  )}
                />
                {inputField.suffix && (
                  <div className="pointer-events-none flex items-center">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      {inputField.suffix}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          {errors[inputField.id] && (
            <span className="text-red-500 text-xs">
              {errors[inputField.id]?.message as any}
            </span>
          )}
        </div>
      ))}
    </form>
  );
}
