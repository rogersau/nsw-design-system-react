import React, { useId } from 'react';
import { FormGroup, FormHelper, FormStatus } from '../group-elements';

/**
 * Option data for checkbox items
 */
export interface CheckboxOption {
  /**
   * Value attribute for the checkbox
   */
  value: string;
  /**
   * Display text/label for the checkbox
   */
  text: string;
  /**
   * Whether this checkbox is checked by default
   */
  checked?: boolean;
  /**
   * Legacy selected prop (use checked instead)
   * @deprecated
   */
  selected?: boolean;
}

/**
 * Properties for CheckboxItem component
 */
export interface CheckboxItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Unique identifier for the checkbox input
   * If not provided, will be auto-generated
   */
  uniqueID?: string;
  /**
   * Value attribute for the checkbox
   */
  value: string;
  /**
   * Display text/label for the checkbox
   */
  text: string;
  /**
   * Additional CSS class names for the checkbox container
   */
  className?: string;
  /**
   * Whether this checkbox is checked
   */
  checked?: boolean;
}

/**
 * CheckboxItem Component
 * 
 * Renders a single checkbox input with associated label.
 * Automatically generates unique IDs for accessibility if not provided.
 * Supports checked state and custom styling.
 * 
 * @example
 * ```tsx
 * <CheckboxItem 
 *   value="terms" 
 *   text="I accept the terms and conditions"
 *   checked
 * />
 * ```
 */
export const CheckboxItem = ({
  uniqueID,
  value,
  text,
  className = '',
  checked,
  ...attributeOptions
}: CheckboxItemProps) => {
  const generatedId = useId();
  const actualId = uniqueID || `checkbox-${generatedId}`;

  return (
    <>
      <input
        className="nsw-form__checkbox-input"
        type="checkbox"
        value={value}
        name={actualId}
        id={actualId}
        defaultChecked={checked}
        {...attributeOptions}
      />
      <label className="nsw-form__checkbox-label" htmlFor={actualId}>
        {text}
      </label>
    </>
  );
};

/**
 * Properties for FormGroupCheckbox component
 */
export interface FormGroupCheckboxProps extends Omit<React.HTMLAttributes<HTMLDivElement | HTMLFieldSetElement>, 'style'> {
  /**
   * Unique identifier for the form group
   */
  htmlId?: string;
  /**
   * Array of checkbox options to render
   */
  options?: CheckboxOption[];
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
   * Render type
   * - 'group': Renders as a fieldset with legend (default for multiple checkboxes)
   * - undefined: Renders as standard form group (for single checkbox)
   */
  as?: 'group';
  /**
   * Custom inline styles (object-based, not DOM style attribute)
   */
  style?: React.CSSProperties;
}

/**
 * FormGroupCheckbox Component
 * 
 * Complete form group wrapper for checkbox inputs (single or multiple).
 * Can render as a fieldset with legend for grouped checkboxes or as a standard form group for single checkboxes.
 * Handles label, helper text, validation states, and error/success messaging automatically.
 * Uses native React ID generation for unique checkbox identifiers.
 * 
 * @example
 * ```tsx
 * // Multiple checkboxes grouped
 * <FormGroupCheckbox 
 *   label="Select your interests"
 *   helper="Choose all that apply"
 *   as="group"
 *   options={[
 *     { value: '1', text: 'Sports' },
 *     { value: '2', text: 'Music', checked: true },
 *     { value: '3', text: 'Reading' }
 *   ]}
 * />
 * 
 * // Single checkbox with error
 * <FormGroupCheckbox 
 *   label="Terms and conditions"
 *   status="invalid"
 *   statusText="You must accept the terms"
 *   options={[
 *     { value: 'accept', text: 'I accept the terms and conditions' }
 *   ]}
 * />
 * ```
 */
export const FormGroupCheckbox = ({
  htmlId,
  options = [],
  status = 'default',
  label,
  helper,
  statusText,
  error,
  className = '',
  as,
  style,
  ...attributeOptions
}: FormGroupCheckboxProps) => {
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

  // Render as fieldset for grouped checkboxes
  if (as === 'group') {
    return (
      <fieldset className={`nsw-form__fieldset ${className}`} {...attributeOptions}>
        {label && <legend><span>{label}</span></legend>}
        {helper && <FormHelper htmlId={actualId}>{helper}</FormHelper>}
        <div {...ariaProps}>
          {options.map((option, index) => (
            <CheckboxItem
              key={`${actualId}-checkbox-${index}`}
              uniqueID={`${actualId}-${index}`}
              value={option.value}
              text={option.text}
              checked={option.checked || option.selected}
            />
          ))}
        </div>
        {actualStatus !== 'default' && statusText && (
          <FormHelper htmlId={actualId} status={actualStatus}>
            {statusText}
          </FormHelper>
        )}
      </fieldset>
    );
  }

  // Render as standard form group for single checkbox
  return (
    <FormGroup
      htmlId={actualId}
      status={status}
      label={label}
      helper={helper}
      statusText={statusText}
      error={error}
      className={className}
      style={style}
      {...attributeOptions}
    >
      {options.map((option, index) => (
        <CheckboxItem
          key={`${actualId}-checkbox-${index}`}
          uniqueID={`${actualId}-${index}`}
          value={option.value}
          text={option.text}
          checked={option.checked || option.selected}
        />
      ))}
    </FormGroup>
  );
};
