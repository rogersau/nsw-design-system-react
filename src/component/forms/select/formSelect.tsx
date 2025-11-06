import React, { useId } from 'react';
import { FormGroup, FormHelper, FormStatus } from '../group-elements';

/**
 * Option data for select dropdown
 */
export interface SelectOption {
  /**
   * Value attribute for the option
   */
  value: string;
  /**
   * Display text for the option
   */
  text: string;
  /**
   * Whether this option is selected by default
   */
  selected?: boolean;
}

/**
 * Properties for SelectItem component
 */
export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  /**
   * Value attribute for the option
   */
  value: string;
  /**
   * Display text for the option
   */
  text: string;
  /**
   * Whether this option is selected
   */
  selected?: boolean;
}

/**
 * SelectItem Component
 * 
 * Renders an individual option element within a select dropdown.
 * 
 * @example
 * ```tsx
 * <SelectItem value="1" text="Option 1" />
 * <SelectItem value="2" text="Option 2" selected />
 * ```
 */
export const SelectItem = ({
  value,
  text,
  selected,
  ...attributeOptions
}: SelectItemProps) => (
  <option value={value} {...attributeOptions}>
    {text}
  </option>
);

/**
 * Properties for Select component
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  /**
   * Unique identifier for the select element
   */
  htmlId?: string;
  /**
   * Array of options to render in the select dropdown
   */
  options?: SelectOption[];
  /**
   * Validation status of the select
   */
  status?: FormStatus;
  /**
   * Status message to display (error or success message)
   */
  statusText?: string;
  /**
   * Whether this select is in an error state
   * @deprecated Use status='invalid' instead
   */
  error?: boolean;
  /**
   * Additional CSS class names to apply to the select
   */
  className?: string;
  /**
   * Custom inline styles (object-based, not DOM style attribute)
   */
  style?: React.CSSProperties;
}

/**
 * Select Component
 * 
 * Renders a select dropdown with NSW Design System styling.
 * Supports validation states, accessibility attributes, and dynamic options.
 * Automatically renders FormHelper for status messages when provided.
 * 
 * @example
 * ```tsx
 * <Select 
 *   htmlId="country"
 *   options={[
 *     { value: '', text: 'Please select' },
 *     { value: 'au', text: 'Australia', selected: true },
 *     { value: 'nz', text: 'New Zealand' }
 *   ]}
 *   status="valid"
 *   statusText="Valid selection"
 * />
 * ```
 */
export const Select = ({
  htmlId,
  options = [],
  status = 'default',
  statusText,
  error,
  className = '',
  style,
  ...attributeOptions
}: SelectProps) => {
  const generatedId = useId();
  const actualId = htmlId || generatedId;
  const actualStatus = error ? 'invalid' : status;

  const ariaProps = {
    'aria-invalid': actualStatus === 'invalid',
    'aria-describedby':
      actualStatus !== 'default' && statusText
        ? `${actualStatus === 'invalid' ? 'error' : 'helper'}${actualId}`
        : undefined,
  };

  return (
    <>
      <select
        id={actualId}
        className={`nsw-form__select ${className}`}
        style={style}
        {...ariaProps}
        {...attributeOptions}
      >
        {options.map((option, index) => (
          <SelectItem
            key={`${actualId}-option-${index}`}
            value={option.value}
            text={option.text}
            selected={option.selected}
          />
        ))}
      </select>
      {actualStatus !== 'default' && statusText && (
        <FormHelper htmlId={actualId} status={actualStatus}>
          {statusText}
        </FormHelper>
      )}
    </>
  );
};

/**
 * Properties for FormGroupSelect component
 */
export interface FormGroupSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /**
   * Unique identifier for the form control
   */
  htmlId?: string;
  /**
   * Array of options to render in the select dropdown
   */
  options?: SelectOption[];
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
   * Value of the currently selected option
   */
  selected?: string;
}

/**
 * FormGroupSelect Component
 * 
 * Complete form group wrapper for select dropdown fields.
 * Combines FormGroup, FormLabel, Select, and FormHelper for a fully accessible form field.
 * Handles label, helper text, validation states, and error/success messaging automatically.
 * 
 * @example
 * ```tsx
 * // Basic select
 * <FormGroupSelect 
 *   label="Country"
 *   helper="Choose your country"
 *   options={[
 *     { value: '', text: 'Please select' },
 *     { value: 'au', text: 'Australia' },
 *     { value: 'nz', text: 'New Zealand' }
 *   ]}
 * />
 * 
 * // Select with error
 * <FormGroupSelect 
 *   label="State"
 *   status="invalid"
 *   statusText="Please select a state"
 *   options={stateOptions}
 * />
 * ```
 */
export const FormGroupSelect = ({
  htmlId,
  options = [],
  status = 'default',
  label,
  helper,
  statusText,
  error,
  className = '',
  style,
  selected,
  ...attributeOptions
}: FormGroupSelectProps) => {
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
      <Select
        htmlId={actualId}
        options={options}
        status={status}
        error={error}
        style={style}
        value={selected}
      />
    </FormGroup>
  );
};
