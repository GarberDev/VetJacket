import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@src/helpers/helper';

export interface OptionType {
  id: string;
  name: string;
}

interface SelectProps {
  label?: string;
  options: OptionType[];
  selected: OptionType | null;
  setSelected: (o: OptionType) => void;
}

export default function Select({
  label,
  options,
  selected,
  setSelected,
}: SelectProps) {
  const [currentSelection, setCurrentSelection] = useState<OptionType | null>(
    selected,
  );

  // Update internal state when the prop changes
  useEffect(() => {
    if (selected) {
      setCurrentSelection(selected);
    }
  }, [selected]);

  // Handle selection change
  const handleSelectionChange = (option: OptionType | null) => {
    setCurrentSelection(option);
    setSelected(option);
  };
  return (
    <Listbox value={selected} onChange={handleSelectionChange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-xs font-medium leading-6 text-gray-900">
              {label}
            </Listbox.Label>
          )}
          <div className="relative mt-2">
            <Listbox.Button
              className={classNames(
                'relative w-full cursor-default rounded-md bg-white py-1 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-xs sm:leading-6',
                currentSelection?.badgeColor
                  ? `${currentSelection.badgeColor}`
                  : '',
              )}
            >
              <span className="block truncate">
                {currentSelection ? currentSelection.name : 'Select an option'}
              </span>
              {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span> */}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 px-2',
                        option?.badgeColor ? `${option.badgeColor}` : '',
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            'font-semibold',
                            'block truncate',
                          )}
                        >
                          {option.name}
                        </span>
                        <span>
                          {option.description && (
                            <p
                              className={classNames(
                                'text-xs font-normal',
                                active ? 'text-indigo-200' : 'text-gray-500',
                              )}
                            >
                              {option.description}
                            </p>
                          )}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
