import React, { useId } from 'react';

/**
 * Form validation status type
 */
export type FormStatus = 'invalid' | 'valid' | 'default';

/**
 * Properties for FormHelper component
 */
export interface FormHelperProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'id'> {
  /**
   * Unique identifier for the field referenced by the helper
   */
  htmlId?: string;
  /**
   * Message and children contained within the helper
   */
  children?: React.ReactNode;
  /**
   * Validation status to determine helper styling and icon display
   * - 'invalid': Shows error state with cancel icon
   * - 'valid': Shows valid state with check icon  
   * - 'default': Shows standard helper state
   */
  status?: FormStatus;
  /**
   * Additional CSS class names to apply to the helper
   */
  className?: string;
}

/**
 * FormHelper Component
 * 
 * Displays helper text or error/success messages for form fields.
 * Automatically shows appropriate icons based on validation status.
 * Uses aria-compliant IDs for accessibility integration with form inputs.
 * 
 * @example
 * ```tsx
 * <FormHelper htmlId="email-input" status="invalid">
 *   Please enter a valid email address
 * </FormHelper>
 * ```
 */
export const FormHelper = ({
  htmlId,
  children,
  className = '',
  status = 'default',
  ...attributeOptions
}: FormHelperProps) => {
  const generatedId = useId();
  const actualId = htmlId || generatedId;
  
  return (
    <span 
      id={`${status === 'invalid' ? 'error' : 'helper'}${actualId}`} 
      className={`nsw-form__helper${status === 'invalid' ? ' nsw-form__helper--error' : ''}${status === 'valid' ? ' nsw-form__helper--valid' : ''} ${className}`} 
      {...attributeOptions}
    >
      <span className="material-icons nsw-material-icons" aria-hidden="true">
        {status === 'invalid' ? 'cancel' : ''}
        {status === 'valid' ? 'check_circle' : ''}
      </span>
      {children}
    </span>
  );
};

/**
 * Properties for FormLabel component
 */
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * ID of the form element this label is associated with
   */
  htmlFor?: string;
  /**
   * Text content of the label (required)
   */
  text: string;
  /**
   * Whether to apply dark variation class
   */
  dark?: boolean;
  /**
   * Whether to display the label inline
   */
  inline?: boolean;
  /**
   * Additional CSS class names to apply to the label
   */
  className?: string;
}

/**
 * FormLabel Component
 * 
 * Renders a label element for form inputs with NSW Design System styling.
 * Properly associates with form controls via htmlFor prop.
 * 
 * @example
 * ```tsx
 * <FormLabel htmlFor="username" text="Username" />
 * ```
 */
export const FormLabel = ({
  htmlFor,
  text,
  dark,
  inline,
  className = '',
  ...attributeOptions
}: FormLabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`nsw-form__label ${className}`}
    {...attributeOptions}
  >
    {text}
  </label>
);

/**
 * Properties for FormGroup component
 */
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique identifier for the form control
   */
  htmlId?: string;
  /**
   * Validation status of the form group
   */
  status?: FormStatus;
  /**
   * Form control elements to render within the group
   */
  children?: React.ReactNode;
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
   * Legacy error prop (use status='invalid' instead)
   * @deprecated
   */
  error?: boolean;
  /**
   * Additional CSS class names to apply to the form group
   */
  className?: string;
}

/**
 * FormGroup Component
 * 
 * Wraps form controls with label, helper text, and status messaging.
 * Automatically handles error/success states and aria accessibility.
 * Clones children to pass error state down for proper styling.
 * 
 * @example
 * ```tsx
 * <FormGroup 
 *   label="Email Address"
 *   helper="We'll never share your email"
 *   status="invalid"
 *   statusText="Please enter a valid email"
 * >
 *   <TextInput />
 * </FormGroup>
 * ```
 */
export const FormGroup = ({
  htmlId,
  status = 'default',
  children,
  label,
  helper,
  statusText,
  error,
  className = '',
  ...attributeOptions
}: FormGroupProps) => {
  const generatedId = useId();
  const actualId = htmlId || generatedId;

  return (
    <div className={`nsw-form__group ${className}`} {...attributeOptions}>
      {label && <FormLabel htmlFor={actualId} text={label} />}
      {helper && <FormHelper htmlId={actualId}>{helper}</FormHelper>}
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { error } as any) : child
      )}
      {status && statusText && (
        <FormHelper htmlId={actualId} status={status}>
          {statusText}
        </FormHelper>
      )}
    </div>
  );
};
