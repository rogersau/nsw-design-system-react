import React from 'react';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  linkComponent?: React.ElementType | 'a';
  link?: string;
  children: React.ReactNode;
  style?: 'dark' | 'dark-outline' | 'dark-outline-solid' | 'light' | 'light-outline' | 'white' | 'danger';
  block?: boolean;
  className?: string;
}

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
  if (link) {
    const LinkComponent = linkComponent as any;

    if (LinkComponent === 'a') {
      (attributeOptions as any).href = link;
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
