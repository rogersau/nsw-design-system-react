import React from 'react';

/**
 * Breadcrumb item shape
 */
export interface BreadcrumbItem {
  link?: string;
  text: React.ReactNode;
  onClick?: () => void;
  // li allows passing attributes to the <li> if needed (kept for parity)
  li?: Record<string, any>;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** The aria-label for the nav element */
  label?: string | null;
  /** Items to render in the breadcrumb list */
  items: BreadcrumbItem[];
  /** Component used for links (e.g. 'a' or React Router Link) */
  linkComponent?: React.ElementType | 'a';
  className?: string;
}

/**
 * BreadcrumbLinkListItem
 *
 * Renders a single breadcrumb item. If `onClick` is provided and no `link`,
 * the item becomes a link with href="#" so the handler can be attached.
 */
export const BreadcrumbLinkListItem: React.FC<{
  text: React.ReactNode;
  link?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  linkComponent?: React.ElementType | 'a';
}> = ({ text, link, linkComponent = 'a', children, onClick, ...attributeOptions }) => {
  const LinkComponent: any = linkComponent;

  if (typeof onClick === 'function') {
    (attributeOptions as any).onClick = onClick;
    if (!link) link = '#';
  }

  if (LinkComponent === 'a') {
    (attributeOptions as any).href = link;
  } else if (typeof LinkComponent === 'function') {
    (attributeOptions as any).to = link;
  }

  if (link) {
    return (
      <li {...(attributeOptions as any)}>
        <LinkComponent {...attributeOptions}>{text}</LinkComponent>
        {children}
      </li>
    );
  }

  return (
    <li {...(attributeOptions as any)}>
      {text}
      {children}
    </li>
  );
};

/**
 * BreadcrumbLinkList
 *
 * Renders the ordered list of breadcrumb items.
 */
export const BreadcrumbLinkList: React.FC<{
  inline?: boolean;
  items: BreadcrumbItem[];
  linkComponent?: React.ElementType | 'a';
  className?: string;
}> = ({ inline, items, linkComponent = 'a', className = '', ...attributeOptions }) => (
  <ol className={`nsw-breadcrumb__list ${className}${inline ? ' nsw-breadcrumb__list--inline' : ''}`} {...attributeOptions}>
    {items.map((item) => (
      <BreadcrumbLinkListItem linkComponent={linkComponent} key={String(item.text)} {...item} />
    ))}
  </ol>
);

/**
 * Breadcrumbs
 *
 * Top-level nav wrapper for breadcrumbs. Accepts `items` to render inside.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ label = null, items, linkComponent = 'a', className = '', ...attributeOptions }) => (
  <nav className={`nsw-breadcrumbs ${className}`} aria-label={label || undefined} {...attributeOptions}>
    <BreadcrumbLinkList inline linkComponent={linkComponent} items={items} />
  </nav>
);

export default Breadcrumbs;
