import React, { useId } from 'react';
import { FormGroup, FormHelper, FormStatus } from '../group-elements';

/**
 * Properties for TextInput component
 */
export interface TextInputProps extends Omit<React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'style'> {
  /**
   * Unique identifier for the input element
   */
  htmlId?: string;
  /**
   * Type of input field (e.g., 'text', 'email', 'password', 'number')
   * @default 'text'
   */
  inputType?: string;
  /**
   * Validation status of the input
   */
  status?: FormStatus;
  /**
   * Status message to display (error or success message)
   */
  statusText?: string;
  /**
   * Whether this input is in an error state
   * @deprecated Use status='invalid' instead
   */
  error?: boolean;
  /**
   * Additional CSS class names to apply to the input
   */
  className?: string;
  /**
   * Render element type
   * - 'input': Single-line text input (default)
   * - 'textarea': Multi-line text area
   */
  as?: 'input' | 'textarea';
  /**
   * Custom inline styles (object-based, not DOM style attribute)
   */
  style?: React.CSSProperties;
}

/**
 * TextInput Component
 * 
 * Renders a text input or textarea element with NSW Design System styling.
 * Supports validation states, accessibility attributes, and multiple input types.
 * Can render as either a single-line input or multi-line textarea.
 * 
 * @example
 * ```tsx
 * // Single-line input
 * <TextInput htmlId="username" inputType="text" />
 * 
 * // Email input with validation
 * <TextInput htmlId="email" inputType="email" status="valid" statusText="Valid email" />
 * 
 * // Multi-line textarea
 * <TextInput htmlId="comments" as="textarea" />
 * ```
 */
export const TextInput = ({
  htmlId,
  inputType = 'text',
  status = 'default',
  statusText,
  error,
  className = '',
  as = 'input',
  style,
  ...attributeOptions
}: TextInputProps) => {
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

  const commonProps = {
    id: actualId,
    className: `nsw-form__input ${className}`,
    style,
    ...ariaProps,
    ...attributeOptions,
  };

  if (as === 'textarea') {
    return (
      <>
        <textarea {...commonProps} />
        {actualStatus !== 'default' && statusText && (
          <FormHelper htmlId={actualId} status={actualStatus}>
            {statusText}
          </FormHelper>
        )}
      </>
    );
  }

  return (
    <>
      <input type={inputType} {...commonProps} />
      {actualStatus !== 'default' && statusText && (
        <FormHelper htmlId={actualId} status={actualStatus}>
          {statusText}
        </FormHelper>
      )}
    </>
  );
};

/**
 * Properties for FormGroupText component
 */
export interface FormGroupTextProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /**
   * Unique identifier for the form control
   */
  htmlId?: string;
  /**
   * Type of input field
   * @default 'text'
   */
  inputType?: string;
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
   * Render element type for the input
   * - 'input': Single-line text input (default)
   * - 'textarea': Multi-line text area
   */
  as?: 'input' | 'textarea';
  /**
   * Custom inline styles (object-based, not DOM style attribute)
   */
  style?: React.CSSProperties;
}

/**
 * FormGroupText Component
 * 
 * Complete form group wrapper for text input fields.
 * Combines FormGroup, FormLabel, TextInput, and FormHelper for a fully accessible form field.
 * Handles label, helper text, validation states, and error/success messaging automatically.
 * 
 * @example
 * ```tsx
 * // Basic text input
 * <FormGroupText 
 *   label="Username" 
 *   helper="Choose a unique username"
 * />
 * 
 * // Email input with error
 * <FormGroupText 
 *   label="Email"
 *   inputType="email"
 *   status="invalid"
 *   statusText="Please enter a valid email address"
 * />
 * 
 * // Textarea with success state
 * <FormGroupText 
 *   label="Comments"
 *   as="textarea"
 *   status="valid"
 *   statusText="Thank you for your feedback"
 * />
 * ```
 */
export const FormGroupText = ({
  htmlId,
  inputType = 'text',
  status = 'default',
  label,
  helper,
  statusText,
  error,
  className = '',
  as = 'input',
  style,
  ...attributeOptions
}: FormGroupTextProps) => {
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
      <TextInput
        htmlId={actualId}
        inputType={inputType}
        status={status}
        error={error}
        as={as}
        style={style}
      />
    </FormGroup>
  );
};
