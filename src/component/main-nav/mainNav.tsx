import React, { useId, useEffect } from 'react';

// Type workaround for nsw-design-system Navigation
const Navigation = require('nsw-design-system/src/main').Navigation as any;

/**
 * Navigation sub-item (level 3)
 */
export interface SubSubNavItem {
  /**
   * URL for the navigation link
   */
  url: string;
  /**
   * Display text for the navigation link
   */
  text: string;
  /**
   * Optional fourth-level subnav (not commonly used)
   */
  subNav?: SubSubNavItem[];
}

/**
 * Navigation sub-item (level 2)
 */
export interface SubNavItem {
  /**
   * URL for the navigation link
   */
  url: string;
  /**
   * Display text for the navigation link
   */
  text: string;
  /**
   * Optional third-level subnav
   */
  subNav?: SubSubNavItem[];
}

/**
 * Main navigation item (level 1)
 */
export interface NavItem {
  /**
   * URL for the navigation link
   */
  url: string;
  /**
   * Display text for the navigation link
   */
  text: string;
  /**
   * Unique identifier for the navigation item
   */
  id?: string;
  /**
   * Description text for mega menu display
   */
  description?: string;
  /**
   * Second-level subnav items
   */
  subNav?: SubNavItem[];
}

/**
 * Properties for SubNavHeader component
 */
export interface SubNavHeaderProps {
  /**
   * URL for the parent navigation item
   */
  url?: string;
  /**
   * Text for the parent navigation item
   */
  text?: string;
  /**
   * Description text for mega menu display
   */
  description?: string;
  /**
   * Unique identifier for aria-controls
   */
  id?: string;
}

/**
 * SubNavHeader Component
 * 
 * Renders the header section of a sub-navigation panel.
 * Includes back button to parent menu, close button, title link, and optional description.
 * Used in mobile/mega menu navigation patterns.
 * 
 * @example
 * ```tsx
 * <SubNavHeader 
 *   url="/about" 
 *   text="About Us" 
 *   description="Learn more about our organization"
 *   id="nav-about"
 * />
 * ```
 */
export const SubNavHeader = ({ url, text, description, id }: SubNavHeaderProps) => (
  <>
    <div className="nsw-main-nav__header">
      <button
        type="button"
        className="nsw-icon-button nsw-icon-button--flex js-close-sub-nav"
        aria-controls={id ? `subnav-${id}` : undefined}
        aria-expanded="true"
      >
        <span className="material-icons nsw-material-icons" aria-hidden="true">
          keyboard_arrow_left
        </span>
        <span>
          Back
          <span className="sr-only"> to previous menu</span>
        </span>
      </button>
      <button type="button" className="nsw-icon-button js-close-navigation" aria-expanded="true">
        <i className="material-icons nsw-material-icons" aria-hidden="true">
          close
        </i>
        <span className="sr-only">Close Menu</span>
      </button>
    </div>
    <div className="nsw-main-nav__title">
      <a href={url}>
        <span>{text}</span>
        <span className="material-icons nsw-material-icons" aria-hidden="true">
          east
        </span>
      </a>
    </div>
    <div className="nsw-main-nav__description">{description}</div>
  </>
);

/**
 * Properties for SubNav component
 */
export interface SubNavProps {
  /**
   * Array of second-level navigation items
   */
  subNav: SubNavItem[];
  /**
   * URL for the parent navigation item
   */
  url?: string;
  /**
   * Text for the parent navigation item
   */
  text?: string;
  /**
   * Description text for mega menu display
   */
  description?: string;
}

/**
 * SubNav Component
 * 
 * Renders a sub-navigation panel with nested navigation items.
 * Supports up to 3 levels of nesting (main → sub → subsub).
 * Each level includes navigation header, list of links, and optional third-level panels.
 * Uses native React ID generation for unique element IDs.
 * 
 * @example
 * ```tsx
 * <SubNav 
 *   url="/products"
 *   text="Products"
 *   description="Browse our product catalog"
 *   subNav={[
 *     { url: '/products/software', text: 'Software' },
 *     { url: '/products/hardware', text: 'Hardware', subNav: [...] }
 *   ]}
 * />
 * ```
 */
export const SubNav = ({ subNav, url, text, description }: SubNavProps) => {
  const id = useId();
  const subNavBaseId = useId();
  const subSubNavBaseId = useId();

  return (
    <div className="nsw-main-nav__sub-nav" id={`sub-nav-${id}`} role="region" aria-label={text}>
      <SubNavHeader url={url} text={text} description={description} id={id} />
      <ul className="nsw-main-nav__sub-list">
        {subNav.map((subNavItem, index) => (
          <li key={`${subNavBaseId}-${index}`}>
            <a href={subNavItem.url}>
              <span>{subNavItem.text}</span>
              {subNavItem.subNav && (
                <span
                  className="material-icons nsw-material-icons nsw-main-nav__link-icon"
                  aria-hidden="true"
                >
                  keyboard_arrow_right
                </span>
              )}
            </a>

            {subNavItem.subNav && (
              <div
                className="nsw-main-nav__sub-nav"
                id={`subnav-${subNavBaseId}-${index}`}
                role="region"
                aria-label={`${text} Submenu`}
              >
                <SubNavHeader url={url} text={text} description={description} />
                <ul className="nsw-main-nav__sub-list">
                  {subNavItem.subNav.map((subSubNavItem, subIndex) => (
                    <li key={`${subSubNavBaseId}-${index}-${subIndex}`}>
                      <a href={subSubNavItem.url} className="nsw-subnavigation__link">
                        <span>{subSubNavItem.text}</span>
                        {subSubNavItem.subNav && (
                          <span
                            className="material-icons nsw-material-icons nsw-main-nav__link-icon"
                            aria-hidden="true"
                          >
                            keyboard_arrow_right
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Properties for MainNav component
 */
export interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Array of main navigation items with optional nested subnavs
   */
  navItems: NavItem[];
  /**
   * Whether to display menu as mega menu (with descriptions and enhanced layout)
   */
  megaMenu?: boolean;
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * MainNav Component
 * 
 * Renders the main navigation component for NSW Government sites.
 * Supports standard navigation and mega menu layouts with up to 3 levels of nesting.
 * Initializes NSW Design System Navigation JavaScript on mount for interactive behavior.
 * 
 * Features:
 * - Mobile-responsive collapsible menu
 * - Mega menu mode with descriptions
 * - Up to 3 levels of nested navigation
 * - Accessibility compliant with ARIA labels
 * - Integrates with NSW Design System JavaScript
 * 
 * @example
 * ```tsx
 * <MainNav 
 *   megaMenu
 *   navItems={[
 *     {
 *       url: '/about',
 *       text: 'About',
 *       id: 'nav-about',
 *       description: 'Learn about us',
 *       subNav: [
 *         { url: '/about/team', text: 'Our Team' },
 *         { url: '/about/history', text: 'History' }
 *       ]
 *     },
 *     {
 *       url: '/contact',
 *       text: 'Contact',
 *       id: 'nav-contact'
 *     }
 *   ]}
 * />
 * ```
 */
export const MainNav = ({ navItems, megaMenu, className = '', ...attributeOptions }: MainNavProps) => {
  const navBaseId = useId();

  useEffect(() => {
    new Navigation().init();
  }, []);

  return (
    <nav
      id="main-nav"
      className={`nsw-main-nav ${className} ${megaMenu ? 'js-mega-menu' : ''}`}
      aria-label="Main Navigation"
      {...attributeOptions}
    >
      <div className="nsw-main-nav__header">
        <div id="nsw-main-nav__title">Menu</div>
        <button type="button" className="nsw-icon-buttons js-close-nav" aria-expanded="true">
          <span className="material-icons nsw-material-icons" aria-hidden="true">
            close
          </span>
          <span className="sr-only">Close Menu</span>
        </button>
      </div>
      <ul className="nsw-main-nav__list">
        {navItems.map((navItem, index) => (
          <li key={`${navBaseId}-${index}`}>
            <a href={navItem.url}>
              <span>{navItem.text}</span>
              {navItem.subNav && (
                <span
                  className="material-icons nsw-material-icons nsw-main-nav__link-icon"
                  aria-hidden="true"
                >
                  keyboard_arrow_right
                </span>
              )}
            </a>
            {navItem.subNav && (
              <SubNav
                subNav={navItem.subNav}
                url={navItem.url}
                text={navItem.text}
                description={navItem.description}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
