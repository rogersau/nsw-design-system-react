import React from 'react';

/**
 * Single Tag props
 *
 * @param link - optional URL for the tag
 * @param text - visible text for the tag
 * @param linkComponent - element or component to render the link with (defaults to 'a')
 * @param className - optional additional classes
 */
export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  link?: string;
  text: string;
  linkComponent?: string | React.ComponentType<any>;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ link, text, linkComponent = 'a', className = '', ...rest }) => {
  const LinkComponent: any = linkComponent;
  const props: Record<string, any> = { ...rest };

  if (LinkComponent === 'a') {
    props.href = link;
  } else if (typeof LinkComponent === 'function') {
    props.to = link;
  }

  return link ? (
    <LinkComponent className={`nsw-tag ${className}`} {...props}>{text}</LinkComponent>
  ) : (
    <span {...props} className={`nsw-tag ${className}`}>{text}</span>
  );
};

/**
 * TagList props
 *
 * @param tags - array of tag objects { link?, text, linkComponent? }
 * @param className - optional className
 */
export interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: Array<{ link?: string; text: string; linkComponent?: string | React.ComponentType<any> }>;
  className?: string;
}

export const TagList: React.FC<TagListProps> = ({ tags, className = '', ...rest }) => (
  <div className={`nsw-list nsw-list--8 ${className}`} {...rest}>
    {tags.map((tag) => (
      <Tag key={tag.text} linkComponent={tag.linkComponent} link={tag.link} text={tag.text} />
    ))}
  </div>
);

export default TagList;
