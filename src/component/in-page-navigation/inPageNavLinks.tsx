import React from 'react';

/**
 * Link data for in-page navigation
 */
export interface InPageNavLink {
  /**
   * URL/anchor for the link (typically a hash link like "#section1")
   */
  url: string;
  /**
   * Display title for the link
   */
  title: string;
}

/**
 * Properties for InpageNavLinksItem component
 */
export interface InpageNavLinksItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * URL/anchor for the link
   */
  url: string;
  /**
   * Display title for the link
   */
  title: string;
}

/**
 * InpageNavLinksItem Component
 * 
 * Renders a single link item within the in-page navigation list.
 * Typically links to anchored sections on the same page.
 * 
 * @example
 * ```tsx
 * <InpageNavLinksItem url="#section1" title="Introduction" />
 * ```
 */
export const InpageNavLinksItem = ({ url, title, ...attributeOptions }: InpageNavLinksItemProps) => (
  <li>
    <a href={url} {...attributeOptions}>
      {title}
    </a>
  </li>
);

/**
 * Properties for InPageNavLinks component
 */
export interface InPageNavLinksProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Title text for the navigation block
   */
  title: string;
  /**
   * Array of link objects to display in the navigation
   */
  links: InPageNavLink[];
  /**
   * ARIA label for the navigation element
   * @default "in page navigation"
   */
  ariaLabel?: string;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * InPageNavLinks Component
 * 
 * Renders a navigation component for jumping to different sections within the same page.
 * Displays a title and list of anchor links to page sections.
 * Commonly used in long-form content to provide quick navigation to subsections.
 * 
 * Features:
 * - Accessible navigation with ARIA labels
 * - Links typically use hash anchors (#section-id)
 * - Styled with NSW Design System in-page nav styling
 * 
 * @example
 * ```tsx
 * <InPageNavLinks 
 *   title="On this page"
 *   links={[
 *     { url: '#overview', title: 'Overview' },
 *     { url: '#details', title: 'Details' },
 *     { url: '#examples', title: 'Examples' }
 *   ]}
 * />
 * ```
 */
export const InPageNavLinks = ({
  title,
  links,
  ariaLabel = 'in page navigation',
  className = '',
  ...attributeOptions
}: InPageNavLinksProps) => (
  <nav
    className={`nsw-in-page-nav ${className}`}
    aria-labelledby={ariaLabel}
    {...attributeOptions}
  >
    <div id={ariaLabel} className="nsw-in-page-nav__title">
      {title}
    </div>

    <ul>
      {links && links.map((link) => <InpageNavLinksItem {...link} key={link.title} />)}
    </ul>
  </nav>
);

export default InPageNavLinks;
