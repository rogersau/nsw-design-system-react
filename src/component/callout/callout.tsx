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

/**
 * Callout
 *
 * A small informational block used to call out content. Renders a heading
 * (configurable level) and body content.
 *
 * @param props - Component props
 * @param props.title - The title text shown in the heading
 * @param props.level - The heading level to render (1-6). Defaults to 4
 * @param props.children - Body content rendered inside the callout
 * @param props.className - Optional additional CSS class names
 * @returns A React element representing the callout
 *
 * @example
 * <Callout title="Note" level={3}>
 *   <p>Additional information</p>
 * </Callout>
 */
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
