import React from 'react';

/**
 * An item inside the LinkList component
 *
 * @param text - The link text or node
 * @param link - The link URL (optional)
 * @param linkComponent - The component used for the link (string tag or component)
 * @param children - Optional additional content next to the link
 * @param onClick - Optional onClick handler
 * @param rest - Any other attributes applied to the link element
 */
export interface LinkListItemShape {
  text: React.ReactNode;
  link?: string;
  onClick?: (event?: React.MouseEvent) => void;
}

export interface LinkListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  text: React.ReactNode;
  link?: string;
  linkComponent?: string | React.ComponentType<any>;
  children?: React.ReactNode;
  onClick?: (event?: React.MouseEvent) => void;
}

/**
 * LinkListItem renders a single item inside the LinkList.
 * Behaviour mirrors the legacy implementation:
 * - if onClick is provided and no link, a fallback `#` link is used so
 *   the onClick can be attached (no button support currently)
 * - if `linkComponent` is `'a'` we map the URL to `href` otherwise we
 *   set a `to` prop for component-based links (e.g. react-router)
 */
export const LinkListItem: React.FC<LinkListItemProps> = ({
  text,
  link: initialLink,
  linkComponent = 'a',
  children,
  onClick,
  ...rest
}) => {
  const LinkComponent: any = linkComponent;
  const props: Record<string, any> = { ...rest };
  let link = initialLink;

  if (typeof onClick === 'function') {
    props.onClick = onClick;
    if (!link) link = '#';
  }

  if (LinkComponent === 'a') {
    props.href = link;
  } else if (typeof LinkComponent === 'function') {
    // typical custom link components accept `to`
    props.to = link;
  }

  if (link) {
    return (
      <li className="nsw-link-list__item">
        <LinkComponent {...props}>
          <span>{text}</span>
          <span
            className="material-icons nsw-material-icons nsw-link-list__icon"
            tabIndex={-1}
            aria-hidden="true"
          >
            east
          </span>
        </LinkComponent>
        {children}
      </li>
    );
  }

  return (
    <li className="nsw-link-list__item">
      {text}
      {children}
    </li>
  );
};

/**
 * LinkList props
 *
 * @param items - Array of items to render (format: { link, text, onClick })
 * @param className - Optional additional class for the list
 * @param linkComponent - Component or tag to render each link with (defaults to 'a')
 */
export interface LinkListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: LinkListItemShape[];
  linkComponent?: string | React.ComponentType<any>;
  className?: string;
}

/**
 * LinkList
 *
 * Renders a list of links using LinkListItem. The items array should be
 * in the shape: { link?: string, text: ReactNode, onClick?: fn }.
 */
export const LinkList: React.FC<LinkListProps> = ({
  items,
  linkComponent = 'a',
  className = '',
  ...rest
}) => (
  <div className="nsw-link-list" {...rest}>
    <ul className={`nsw-link-list__list ${className}`}>
      {items.map((item) => (
        <LinkListItem linkComponent={linkComponent} key={String(item.text)} {...item} />
      ))}
    </ul>
  </div>
);

export default LinkList;
