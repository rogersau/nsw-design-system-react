import React from 'react';

/**
 * All different kind of alerts
 *
 * DEFAULT
 * The in-page alert used for content-level messages
 */
const options: Record<string, string> = {
  info: 'nsw-in-page-alert--info',
  warning: 'nsw-in-page-alert--warning',
  error: 'nsw-in-page-alert--error',
  success: 'nsw-in-page-alert--success',
};

/**
 * All different kind of alert icons
 */
const icons: Record<string, string> = {
  info: 'info',
  warning: 'cancel',
  error: 'error',
  success: 'check_circle',
};

/**
 * Props for Alert
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The alert variant */
  as: 'info' | 'warning' | 'error' | 'success';
  /** Title text shown in the alert */
  title?: string;
  /** Content inside the alert */
  children: React.ReactNode;
}

/**
 * Alert
 *
 * A simple in-page alert component. It renders an icon, a title and body
 * content. Use the `as` prop to select the variant.
 *
 * @example
 * <Alert as="warning" title="Watch out">This is a warning</Alert>
 */
export const Alert: React.FC<AlertProps> = ({
  as,
  title = '',
  children,
  className = '',
  ...attributeOptions
}) => {
  const variantClass = options[as] || '';
  const icon = icons[as] || '';

  return (
    <div className={`nsw-in-page-alert ${className} ${variantClass}`} {...attributeOptions}>
      <span
        className="material-icons nsw-material-icons nsw-in-page-alert__icon"
        aria-hidden="true"
        {...({ focusable: 'false' } as any)}
      >
        {icon}
      </span>
      <div className="nsw-in-page-alert__content">
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  );
};

export default Alert;
