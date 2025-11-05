import React from 'react';

/**
 * Default callout
 *
 * A small informational block used to call out content. Renders a heading
 * (configurable level) and body content.
 *
 * @param title - The title of the header
 * @param level - The heading level (1-6). Default: 4
 * @param children - Anything inside the callout
 * @param className - Additional class names to append
 */
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  level?: number;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  title,
  level = 4,
  children,
  className = '',
  ...attributeOptions
}) => {
  // Use a dynamic heading tag (h1..h6). Use React.createElement to avoid TSX
  // complaining about a dynamic JSX tag.
  const HeadingTag = `h${level}` as any;

  return (
    <div className={`nsw-callout ${className}`} {...attributeOptions}>
      <div className="nsw-callout__content">
        {React.createElement(HeadingTag as any, { className: 'nsw-callout__title' }, title)}
        {children}
      </div>
    </div>
  );
};

export default Callout;
