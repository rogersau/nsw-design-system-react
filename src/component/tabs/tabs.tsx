import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

/**
 * Tabs container props
 *
 * @param className - additional class names applied to the root element
 * @param children - tab list and tab panels
 * @param rest - any other HTML attributes to pass to the root element
 */
export interface TabsProps extends RadixTabs.TabsProps {
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
  // Find the first `TabItem` child's urlHash to use as default if no
  // defaultValue is provided. This guarantees at least one tab is visible
  // (the first) when the component mounts.
  const findFirstTabValue = (nodes: React.ReactNode): string | undefined => {
    const arr = React.Children.toArray(nodes);
    for (const node of arr) {
      if (!React.isValidElement(node)) continue;
      const element = node as React.ReactElement<any>;

      // If this element is our TabItem, return its urlHash prop
      if (element.type === TabItem) {
        return element.props.urlHash as string | undefined;
      }

      // Recurse into children
      if (element.props && element.props.children) {
        const found = findFirstTabValue(element.props.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  const firstValue = findFirstTabValue(children);

  // If caller provided defaultValue (or is controlling via value), respect it.
  const rootProps = rest.defaultValue !== undefined || rest.value !== undefined
    ? rest
    : { ...rest, defaultValue: firstValue };

  // Wrap Radix Tabs.Root so consumers can pass children built with the
  // helper components below. Keep original class names for styling.
  return (
    <RadixTabs.Root className={`nsw-tabs ${className}`} {...rootProps}>
        {children}
    </RadixTabs.Root>
  );
};

/**
 * TabItemWrapper - renders the UL wrapper for tab items
 */
export const TabItemWrapper: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ children, ...rest }) => (
  // Use Radix List asChild to preserve markup and classes expected by CSS
  <RadixTabs.List asChild>
    
    <div className="nsw-tabs__list-wrapper">
    <ul role="tablist" className="nsw-tabs__list" {...rest}>
      {children}
    </ul>
    </div>
  </RadixTabs.List>
);

/**
 * TabLink - anchor wrapper that maps Radix's injected aria-selected into an
 * "active" class so legacy CSS that looks for `.active` continues to work.
 */
const TabLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>((props, ref) => {
  // aria-selected will be injected by Radix when using `asChild`.
  const ariaSelected = (props as any)['aria-selected'];
  const isActive = ariaSelected === true || ariaSelected === 'true';
  const { children, onClick, className: incomingClassName, ...rest } = props;
  const className = [incomingClassName, isActive ? 'active' : null].filter(Boolean).join(' ');

  // Prevent default navigation on normal left-clicks so the browser doesn't
  // jump to the fragment (which causes scrolling). Allow modifier-clicks
  // (cmd/ctrl/shift/alt) and non-primary buttons to preserve expected
  // behaviour (open in new tab, context menu, etc.).
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const mouseEvent = e as React.MouseEvent<HTMLAnchorElement>;
    if (
      mouseEvent.button === 0 &&
      !mouseEvent.metaKey &&
      !mouseEvent.ctrlKey &&
      !mouseEvent.shiftKey &&
      !mouseEvent.altKey
    ) {
      mouseEvent.preventDefault();
    }

    if (typeof onClick === 'function') onClick(mouseEvent);
  };

  return (
    <a ref={ref} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={className} onClick={handleClick}>
      {children}
    </a>
  );
});
TabLink.displayName = 'TabLink';

/**
 * TabItem - single tab trigger
 *
 * @param urlHash - the hash id of the tab panel (without the leading #)
 * @param title - the visible tab title
 */
export const TabItem: React.FC<{ urlHash: string; title: string }> = ({ urlHash, title }) => (
  <li className="nsw-tabs__list-item">
    <RadixTabs.Trigger value={urlHash} asChild>
      <TabLink href={`#${urlHash}`} className="nsw-tabs__link">
        {title}
      </TabLink>
    </RadixTabs.Trigger>
  </li>
);

/**
 * TabSection - single tab panel
 *
 * @param urlHash - id for the section (matches the TabItem href target)
 * @param children - panel content
 */
export const TabSection: React.FC<{ urlHash: string; children: React.ReactNode }> = ({ urlHash, children }) => (
  <RadixTabs.Content value={urlHash} asChild>
    <section id={urlHash} className="nsw-tabs__content">
      {children}
    </section>
  </RadixTabs.Content>
);

export default Tabs;
