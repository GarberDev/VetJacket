import {
  ChangeEvent,
  ReactComponentElement,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@src/helpers/helper';

export interface ComboBoxOptionType {
  id: string;
  name: string;
  render: ReactComponentElement<any>;
}

interface SelectProps {
  label: string;
  placeholder?: string | null;
  options: ComboBoxOptionType[];
  selected: ComboBoxOptionType[];
  setSelected: (e: [any]) => void;
  queryChanged: (e: string) => void;
  isLoading?: null;
  className: string;
  clearQuery?: () => void;
  nullStateComponent: ReactComponentElement<any>;
}

interface ComboBoxRef {
  setQuery: (query: string) => void;
}

const ComboBox = forwardRef<ComboBoxRef, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
      selected,
      setSelected,
      queryChanged,
      isLoading,
      className = '',
      nullStateComponent,
    },
    ref,
  ) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null); // Ref for the input element

    const setQueryHandler = (query: any) => {
      setQuery(query);
      queryChanged(query);
    };

    useImperativeHandle(ref, () => ({
      setQuery: (value: string) => {
        setQuery(value);
      },
      focus: () => {
        // Focus method for the input element
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    const filteredOptions = options;

    return (
      <>
        <Combobox as="div" value={selected} onChange={setSelected}>
          {label && (
            <Combobox.Label className="block mb-2 text-xs font-medium leading-6 text-gray-900">
              {label}
            </Combobox.Label>
          )}
          <div className={classNames(className, 'relative')}>
            <Combobox.Input
              ref={inputRef}
              placeholder={placeholder ?? 'Type to start searching'}
              className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQueryHandler(event.target.value)
              }
              value={query}
              displayValue={(option: any) => option?.name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {isLoading && <div> Loading </div>}

            {!isLoading && filteredOptions.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                {filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    value={option}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-8 pr-4',
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={classNames(
                            'block truncate',
                            selected ? 'font-semibold' : '',
                          )}
                        >
                          {option.render ?? option.name}
                        </span>

                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 left-0 flex items-center pl-1.5',
                              active ? 'text-white' : 'text-indigo-600',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {!isLoading && filteredOptions.length === 0 && query.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                {/* Here, render the nullStateComponent as a separate element */}
                <div className="relative cursor-pointer py-2 pl-8 pr-4">
                  {nullStateComponent ?? <span>No results found</span>}
                </div>
              </Combobox.Options>
            )}
          </div>
        </Combobox>
      </>
    );
  },
);

ComboBox.displayName = 'ComboBox';

export default ComboBox;
