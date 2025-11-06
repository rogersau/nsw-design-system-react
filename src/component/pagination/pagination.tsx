import React, { useId } from 'react';

/**
 * Pagination item data structure
 */
export interface PaginationItemData {
  /**
   * URL for the pagination link
   */
  url: string;
}

/**
 * Properties for PaginationEllipsis component
 */
export interface PaginationEllipsisProps {}

/**
 * PaginationEllipsis Component
 * 
 * Renders an ellipsis (&hellip;) to indicate skipped pages in pagination.
 * Used to show truncated page numbers when there are many pages.
 * 
 * @example
 * ```tsx
 * <PaginationEllipsis />
 * ```
 */
export const PaginationEllipsis = () => (
  <li>
    <span>&hellip;</span>
  </li>
);

/**
 * Properties for PaginationItem component
 */
export interface PaginationItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * URL for this pagination page
   */
  url: string;
  /**
   * Page number to display
   */
  page: number;
  /**
   * The currently active page number
   */
  active?: number;
}

/**
 * PaginationItem Component
 * 
 * Renders a single page number link in pagination.
 * Automatically applies 'active' class when this page matches the active page.
 * Includes screen reader text for accessibility.
 * 
 * @example
 * ```tsx
 * <PaginationItem page={1} url="#page1" active={1} />
 * <PaginationItem page={2} url="#page2" />
 * ```
 */
export const PaginationItem = ({ url, page, active, ...attributeOptions }: PaginationItemProps) => (
  <li>
    <a className={active === page ? 'active' : ''} href={url} {...attributeOptions}>
      <span>
        <span className="sr-only">Page </span>
        {page}
      </span>
    </a>
  </li>
);

/**
 * Properties for Pagination component
 */
export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * URL for the "Back" navigation link
   */
  backLink?: string;
  /**
   * Currently active page number (1-indexed)
   */
  active?: number;
  /**
   * URL for the "Next" navigation link
   */
  nextLink?: string;
  /**
   * Array of pagination item data to auto-generate page links
   * If provided, will create PaginationItem components for each entry
   */
  paginationItems?: PaginationItemData[];
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Custom pagination items (PaginationItem or PaginationEllipsis components)
   * Use when you need manual control over pagination display (e.g., trimmed pagination)
   */
  children?: React.ReactNode;
}

/**
 * Pagination Component
 * 
 * Renders a complete pagination navigation component with back/next buttons and page links.
 * Supports two modes:
 * - Auto-generate page links from paginationItems array
 * - Manual control via children (for custom layouts like trimmed pagination)
 * 
 * Wrapped in nsw-container for consistent page layout.
 * Includes proper ARIA labels for accessibility.
 * 
 * @example
 * ```tsx
 * // Auto-generated pagination
 * <Pagination 
 *   backLink="#prev"
 *   nextLink="#next"
 *   active={3}
 *   paginationItems={[
 *     { url: '#page1' },
 *     { url: '#page2' },
 *     { url: '#page3' },
 *     { url: '#page4' }
 *   ]}
 * />
 * 
 * // Custom trimmed pagination
 * <Pagination backLink="#prev" nextLink="#next">
 *   <PaginationItem page={1} url="#page1" />
 *   <PaginationItem page={2} url="#page2" />
 *   <PaginationItem page={3} url="#page3" />
 *   <PaginationEllipsis />
 *   <PaginationItem page={10} url="#page10" />
 *   <PaginationItem page={11} url="#page11" />
 * </Pagination>
 * ```
 */
export const Pagination = ({
  backLink,
  active,
  nextLink,
  paginationItems,
  className = '',
  children,
  ...attributeOptions
}: PaginationProps) => {
  const baseId = useId();
  
  return (
    <div className={`nsw-container ${className}`} {...attributeOptions}>
      <nav className="nsw-pagination" aria-label="Pagination">
        <ul>
          <li>
            <a className="nsw-icon-button" href={backLink}>
              <span className="material-icons nsw-material-icons" aria-hidden="true">
                keyboard_arrow_left
              </span>
              <span className="sr-only">Back</span>
            </a>
          </li>
          {paginationItems
            ? paginationItems.map((paginationItem, i) => (
                <PaginationItem
                  url={paginationItem.url}
                  page={i + 1}
                  key={`${baseId}-pagination-${i}`}
                  active={active}
                />
              ))
            : children}
          <li>
            <a href={nextLink} className="nsw-icon-button">
              <span className="material-icons nsw-material-icons" aria-hidden="true">
                keyboard_arrow_right
              </span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
