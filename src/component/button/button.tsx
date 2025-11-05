import React from 'react';

/**
 * All different kind of button options
 *
 * DEFAULT
 * The primary button
 *
 * @remarks
 * The Button component can render either a native <button> or a link component
 * (for example React Router's Link). When `link` is provided the component will
 * render `linkComponent` instead of a native button and forward the URL via
 * `href` (for regular anchors) or `to` (for router/link components).
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  linkComponent?: React.ElementType | 'a';
  link?: string;
  children: React.ReactNode;
  /**
   * The button visual style.
   * @default 'dark'
   */
  style?: 'dark' | 'dark-outline' | 'dark-outline-solid' | 'light' | 'light-outline' | 'white' | 'danger';
  /**
   * If true the button will display as a block element.
   */
  block?: boolean;
  /**
   * Additional class names to append to the component root.
   */
  className?: string;
}

/**
 * Button
 *
 * @param linkComponent - The component used for the link (string tag or component)
 * @param link - If this is a link the location it goes
 * @param children - Anything rendered inside the button
 * @param style - The button visual style
 * @param type - The HTML button `type` attribute
 * @param block - Whether the button should be full width (block)
 * @param className - Additional class name(s)
 * @param attributeOptions - Any other HTML attributes passed through to the rendered element
 */
export const Button: React.FC<ButtonProps> = ({
  linkComponent = 'a',
  link,
  children,
  style = 'dark',
  type = 'button',
  block,
  className = '',
  ...attributeOptions
}) => {
  // If a link prop is provided render the configured link component
  if (link) {
    const LinkComponent = linkComponent as any;

    // If we are using a normal anchor element
    if (LinkComponent === 'a') {
      (attributeOptions as any).href = link;
      // If we are using a link component (e.g. React Router's Link)
    } else if (typeof LinkComponent === 'function') {
      (attributeOptions as any).to = link;
    }

    return (
      <LinkComponent
        className={`nsw-button ${className} nsw-button--${style}${block ? ' nsw-button--block' : ''}`}
        {...attributeOptions}
      >
        {children}
      </LinkComponent>
    );
  }

  // Otherwise render a native button
  return (
    <button
      type={type}
      className={`nsw-button ${className} nsw-button--${style}${block ? ' nsw-button--block' : ''}`}
      {...attributeOptions}
    >
      {children}
    </button>
  );
};

export default Button;
