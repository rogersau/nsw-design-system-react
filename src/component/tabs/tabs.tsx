import React, { useEffect, useRef } from 'react';
// import from the upstream design-system package. Use require + any to avoid
// TypeScript errors when the package doesn't provide typings in this repo.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Tabs as TabsObject } from 'nsw-design-system/src/main';

/**
 * Tabs container props
 *
 * @param className - additional class names applied to the root element
 * @param children - tab list and tab panels
 * @param rest - any other HTML attributes to pass to the root element
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Tabs component
 *
 * Initializes NSW Tabs from the design system on mount. Uses a ref to the
 * root element and initialises any nested `.js-tabs` elements found within it.
 */
export const Tabs: React.FC<TabsProps> = ({ className = '', children, ...rest }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tabsElements = root.querySelectorAll('.js-tabs');
    tabsElements.forEach((el) => {
      try {
        // initialise the upstream Tabs object
        // @ts-ignore - TabsObject typing not available here
        new TabsObject(el).init();
      } catch (e) {
        // swallow errors to avoid breaking rendering
        // eslint-disable-next-line no-console
        console.warn('Tabs init failed', e);
      }
    });
  }, []);

  return (
    <div ref={rootRef} className={`nsw-tabs js-tabs ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * TabItemWrapper - renders the UL wrapper for tab items
 */
export const TabItemWrapper: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ children }) => (
  <ul className="nsw-tabs__list">{children}</ul>
);

/**
 * TabItem - single tab trigger
 *
 * @param urlHash - the hash id of the tab panel (without the leading #)
 * @param title - the visible tab title
 */
export const TabItem: React.FC<{ urlHash: string; title: string }> = ({ urlHash, title }) => (
  <li className="nsw-tabs__list-item">
    <a href={`#${urlHash}`} className="nsw-tabs__link">
      {title}
    </a>
  </li>
);

/**
 * TabSection - single tab panel
 *
 * @param urlHash - id for the section (matches the TabItem href target)
 * @param children - panel content
 */
export const TabSection: React.FC<{ urlHash: string; children: React.ReactNode }> = ({ urlHash, children }) => (
  <section id={urlHash} className="nsw-tabs__content">
    {children}
  </section>
);

export default Tabs;
