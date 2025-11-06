import React, { useId } from 'react';
import { FormGroup, FormHelper, FormStatus } from '../group-elements';

/**
 * Option data for radio items
 */
export interface RadioOption {
  /**
   * Value attribute for the radio button
   */
  value: string;
  /**
   * Display text/label for the radio button
   */
  text: string;
  /**
   * Whether this radio is selected by default
   */
  selected?: boolean;
}

/**
 * Properties for RadioItem component
 */
export interface RadioItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Unique identifier for the radio input
   * If not provided, will be auto-generated
   */
  uniqueID?: string;
  /**
   * Name attribute for the radio group (all radios in a group should share the same name)
   */
  name: string;
  /**
   * Value attribute for the radio button
   */
  value: string;
  /**
   * Display text/label for the radio button
   */
  text: string;
  /**
   * Additional CSS class names for the radio container
   */
  className?: string;
  /**
   * Whether this radio is selected
   */
  selected?: boolean;
}

/**
 * RadioItem Component
 * 
 * Renders a single radio button input with associated label.
 * Automatically generates unique IDs for accessibility if not provided.
 * All radios in a group must share the same name attribute.
 * 
 * @example
 * ```tsx
 * <RadioItem 
 *   name="payment-method"
 *   value="card" 
 *   text="Credit Card"
 *   selected
 * />
 * ```
 */
export const RadioItem = ({
  uniqueID,
  name,
  value,
  text,
  className = '',
  selected,
  ...attributeOptions
}: RadioItemProps) => {
  const generatedId = useId();
  const actualId = uniqueID || `radio-${generatedId}`;

  return (
    <>
      <input
        className="nsw-form__radio-input"
        type="radio"
        value={value}
        name={name}
        id={actualId}
        defaultChecked={selected}
        {...attributeOptions}
      />
      <label className="nsw-form__radio-label" htmlFor={actualId}>
        {text}
      </label>
      </>
  );
};

/**
 * Properties for FormGroupRadio component
 */
export interface FormGroupRadioProps extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'style'> {
  /**
   * Unique identifier for the form group (also used as name for radio group)
   */
  htmlId?: string;
  /**
   * Array of radio options to render
   */
  options?: RadioOption[];
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
   * - 'group': Renders as a fieldset with legend (default for radio groups)
   * - undefined: Renders as standard form group
   */
  as?: 'group';
  /**
   * Custom inline styles (object-based, not DOM style attribute)
   */
  style?: React.CSSProperties;
}

/**
 * FormGroupRadio Component
 * 
 * Complete form group wrapper for radio button inputs.
 * Renders as a fieldset with legend for proper accessibility.
 * Handles label, helper text, validation states, and error/success messaging automatically.
 * All radios in the group automatically share the same name attribute for proper grouping.
 * Uses native React ID generation for unique radio identifiers.
 * 
 * @example
 * ```tsx
 * // Radio group
 * <FormGroupRadio 
 *   label="Select payment method"
 *   helper="Choose one option"
 *   as="group"
 *   options={[
 *     { value: 'card', text: 'Credit Card' },
 *     { value: 'paypal', text: 'PayPal', selected: true },
 *     { value: 'bank', text: 'Bank Transfer' }
 *   ]}
 * />
 * 
 * // Radio group with error
 * <FormGroupRadio 
 *   label="Delivery method"
 *   status="invalid"
 *   statusText="Please select a delivery method"
 *   as="group"
 *   options={deliveryOptions}
 * />
 * ```
 */
export const FormGroupRadio = ({
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
}: FormGroupRadioProps) => {
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

  // Render as fieldset for radio group (standard for radios)
  if (as === 'group') {
    return (
      <fieldset className={`nsw-form__fieldset ${className}`} {...attributeOptions}>
        {label && <legend><span>{label}</span></legend>}
        {helper && <FormHelper htmlId={actualId}>{helper}</FormHelper>}

          {options.map((option, index) => (
            <RadioItem
              key={`${actualId}-radio-${index}`}
              uniqueID={`${actualId}-${index}`}
              name={actualId}
              value={option.value}
              text={option.text}
              selected={option.selected}
            />
          ))}

        {actualStatus !== 'default' && statusText && (
          <FormHelper htmlId={actualId} status={actualStatus}>
            {statusText}
          </FormHelper>
        )}
      </fieldset>
    );
  }

  // Fallback to standard form group (less common for radios)
  const { onChange, defaultChecked, defaultValue, form, disabled, ...divAttributes } = attributeOptions as any;
  
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
      {...divAttributes}
    >
      {options.map((option, index) => (
        <RadioItem
          key={`${actualId}-radio-${index}`}
          uniqueID={`${actualId}-${index}`}
          name={actualId}
          value={option.value}
          text={option.text}
          selected={option.selected}
        />
      ))}
    </FormGroup>
  );
};
