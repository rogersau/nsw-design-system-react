import React, { useId, useState, useRef, useEffect } from 'react';
import { FormGroup, FormHelper, FormStatus } from '../group-elements';

/**
 * Option data for combobox dropdown
 */
export interface ComboboxOption {
  /**
   * Value attribute for the option
   */
  value: string;
  /**
   * Display text for the option
   */
  text: string;
}

/**
 * Properties for Combobox component
 */
export interface ComboboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style' | 'onSelect'> {
  /**
   * Unique identifier for the combobox element
   */
  htmlId?: string;
  /**
   * Array of options to render in the combobox dropdown
   */
  options?: ComboboxOption[];
  /**
   * Validation status of the combobox
   */
  status?: FormStatus;
  /**
   * Status message to display (error or success message)
   */
  statusText?: string;
  /**
   * Whether this combobox is in an error state
   * @deprecated Use status='invalid' instead
   */
  error?: boolean;
  /**
   * Additional CSS class names to apply to the combobox
   */
  className?: string;
  /**
   * Custom inline styles (object-based, not DOM style attribute)
   */
  style?: React.CSSProperties;
  /**
   * Callback when an option is selected
   */
  onSelect?: (value: string, text: string) => void;
}

/**
 * Combobox Component
 * 
 * Renders a combobox with NSW Design System styling.
 * Supports typing to filter options and dropdown selection.
 * Automatically renders FormHelper for status messages when provided.
 * 
 * @example
 * ```tsx
 * <Combobox 
 *   htmlId="country"
 *   options={[
 *     { value: 'au', text: 'Australia' },
 *     { value: 'nz', text: 'New Zealand' }
 *   ]}
 *   status="valid"
 *   statusText="Valid selection"
 * />
 * ```
 */
export const Combobox = ({
  htmlId,
  options = [],
  status = 'default',
  statusText,
  error,
  className = '',
  style,
  onSelect,
  value: controlledValue,
  onChange,
  ...attributeOptions
}: ComboboxProps) => {
  const generatedId = useId();
  const actualId = htmlId || generatedId;
  const actualStatus = error ? 'invalid' : status;

  const [inputValue, setInputValue] = useState((controlledValue as string) || '');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInputValue(controlledValue as string);
    }
  }, [controlledValue]);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.text.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    onChange?.(e);
  };

  const handleSelectOption = (option: ComboboxOption) => {
    setInputValue(option.text);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect?.(option.value, option.text);
    
    if (onChange) {
      const syntheticEvent = {
        target: { value: option.text },
        currentTarget: { value: option.text },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  const ariaProps = {
    'aria-invalid': actualStatus === 'invalid',
    'aria-describedby':
      actualStatus !== 'default' && statusText
        ? `${actualStatus === 'invalid' ? 'error' : 'helper'}${actualId}`
        : undefined,
    'aria-autocomplete': 'list' as const,
    'aria-controls': `${actualId}-listbox`,
    'aria-expanded': isOpen,
    'aria-activedescendant':
      highlightedIndex >= 0 ? `${actualId}-option-${highlightedIndex}` : undefined,
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        id={actualId}
        type="text"
        className={`nsw-form__input ${className}`}
        style={style}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        role="combobox"
        {...ariaProps}
        {...attributeOptions}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul
          ref={listboxRef}
          id={`${actualId}-listbox`}
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            border: '1px solid #002664',
            backgroundColor: '#fff',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={`${actualId}-option-${index}`}
              id={`${actualId}-option-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              onClick={() => handleSelectOption(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                backgroundColor: highlightedIndex === index ? '#e4e4e6' : '#fff',
              }}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
      {actualStatus !== 'default' && statusText && (
        <FormHelper htmlId={actualId} status={actualStatus}>
          {statusText}
        </FormHelper>
      )}
    </div>
  );
};

/**
 * Properties for FormGroupCombobox component
 */
export interface FormGroupComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'onSelect' | 'onChange'> {
  /**
   * Unique identifier for the form control
   */
  htmlId?: string;
  /**
   * Array of options to render in the combobox dropdown
   */
  options?: ComboboxOption[];
  /**
   * Validation status of the form group
   */
  status?: FormStatus;
  /**
   * Label text for the form group
   */
  label?: string;
  /**
   * Helper text to display below the label
   */
  helper?: string;
  /**
   * Status message to display (error or success message)
   */
  statusText?: string;
  /**
   * Legacy error prop
   * @deprecated Use status='invalid' instead
   */
  error?: boolean;
  /**
   * Additional CSS class names to apply to the form group
   */
  className?: string;
  /**
   * Custom inline styles (object-based, not DOM style attribute)
   */
  style?: React.CSSProperties;
  /**
   * Value of the combobox input
   */
  value?: string;
  /**
   * Callback when an option is selected
   */
  onSelect?: (value: string, text: string) => void;
  /**
   * Callback when input value changes
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * FormGroupCombobox Component
 * 
 * Complete form group wrapper for combobox fields.
 * Combines FormGroup, FormLabel, Combobox, and FormHelper for a fully accessible form field.
 * Handles label, helper text, validation states, and error/success messaging automatically.
 * 
 * @example
 * ```tsx
 * // Basic combobox
 * <FormGroupCombobox 
 *   label="Country"
 *   helper="Start typing or select from the list"
 *   options={[
 *     { value: 'au', text: 'Australia' },
 *     { value: 'nz', text: 'New Zealand' }
 *   ]}
 * />
 * 
 * // Combobox with error
 * <FormGroupCombobox 
 *   label="State"
 *   status="invalid"
 *   statusText="Please select a state"
 *   options={stateOptions}
 * />
 * ```
 */
export const FormGroupCombobox = ({
  htmlId,
  options = [],
  status = 'default',
  label,
  helper,
  statusText,
  error,
  className = '',
  style,
  value,
  onSelect,
  onChange,
  ...attributeOptions
}: FormGroupComboboxProps) => {
  const generatedId = useId();
  const actualId = htmlId || generatedId;

  return (
    <FormGroup
      htmlId={actualId}
      status={status}
      label={label}
      helper={helper}
      statusText={statusText}
      error={error}
      className={className}
      {...attributeOptions}
    >
      <Combobox
        htmlId={actualId}
        options={options}
        status={status}
        error={error}
        style={style}
        value={value}
        onSelect={onSelect}
        onChange={onChange}
      />
    </FormGroup>
  );
};
