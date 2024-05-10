import React, { useRef, useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

const VerificationInput = forwardRef(
  (
    {
      value,
      length,
      validChars,
      placeholder,
      autoFocus,
      passwordMode,
      inputProps,
      containerProps,
      onChange,
      onFocus,
      onBlur,
      onComplete,
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = useState('');
    const [isActive, setActive] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
      if (autoFocus) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    const handleClick = () => {
      inputRef.current.focus();
    };

    const handleKeyDown = (event) => {
      if (
        ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
      ) {
        event.preventDefault();
      }
    };

    const handleInputChange = (event) => {
      const newInputVal = event.target.value.replace(/\s/g, '');

      if (RegExp(`^[${validChars}]{0,${length}}$`).test(newInputVal)) {
        if (onChange) {
          onChange(newInputVal);
        }
        setLocalValue(newInputVal);

        if (newInputVal.length === length) {
          onComplete?.(newInputVal);
        }
      }
    };

    const getValue = () => {
      return value ?? localValue;
    };

    const isCharacterSelected = (i) => {
      const value = getValue();
      return (
        (value.length === i || (value.length === i + 1 && length === i + 1)) &&
        isActive
      );
    };

    const isCharacterInactive = (i) => getValue().length < i;

    const {
      className: inputClassName,
      type: inputType,
      ...restInputProps
    } = inputProps;
    const { className: containerClassName, ...restContainerProps } =
      containerProps;

    const charBoxWidth = 40; // Fixed width for each character box

    return (
      <>
        <div
          data-testid="container"
          className={`relative flex gap-2 h-12 ${containerClassName}`}
          style={{ width: `${length * charBoxWidth}px` }} // Set the container width based on the number of character boxes
          onClick={handleClick}
          {...restContainerProps}
        >
          <input
            aria-label="verification input"
            spellCheck={false}
            value={getValue()}
            onChange={handleInputChange}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            className={`absolute top-0 right-0 bottom-0 left-0 box-border text-transparent bg-transparent caret-transparent outline-none border-none ${inputClassName}`}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setActive(true);
              onFocus?.();
            }}
            onBlur={() => {
              setActive(false);
              onBlur?.();
            }}
            onSelect={(e) => {
              const val = e.target.value;
              e.target.setSelectionRange(val.length, val.length);
            }}
            type={passwordMode ? 'password' : inputType}
            {...restInputProps}
          />
          {[...Array(length)].map((_, i) => (
            <div
              className={`h-full w-${charBoxWidth} text-center text-4xl leading-12 box-border cursor-default ${
                isCharacterSelected(i)
                  ? 'outline-2 outline-blue-300 text-blue-300'
                  : ''
              } ${
                isCharacterInactive(i)
                  ? 'text-gray-400 bg-gray-200'
                  : 'text-black bg-white border border-black'
              }`}
              style={{ width: `${charBoxWidth}px` }} // Set a fixed width for each character box
              onClick={handleClick}
              id={`field-${i}`}
              data-testid={`character-${i}`}
              key={i}
            >
              {passwordMode && getValue()[i]
                ? '*'
                : getValue()[i] || placeholder}
            </div>
          ))}
        </div>
      </>
    );
  },
);

VerificationInput.displayName = 'VerificationInput';

VerificationInput.propTypes = {
  value: PropTypes.string,
  length: PropTypes.number,
  validChars: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  passwordMode: PropTypes.bool,
  inputProps: PropTypes.object,
  containerProps: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onComplete: PropTypes.func,
};

VerificationInput.defaultProps = {
  length: 6,
  validChars: 'A-Za-z0-9',
  placeholder: '·',
  autoFocus: false,
  inputProps: {},
  containerProps: {},
};

export default VerificationInput;
