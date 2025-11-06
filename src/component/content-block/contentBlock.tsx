import React from 'react';

/**
 * ContentBlockProps
 */
export interface ContentBlockLink { href?: string; title?: string }

export interface ContentBlockMainLink { url: string; text: string }

export interface ContentBlockProps extends React.HTMLAttributes<HTMLElement> {
  image?: string;
  icon?: React.ReactNode;
  imageAlt?: string;
  copy?: string;
  headline: string;
  mainLink?: ContentBlockMainLink;
  className?: string;
  links?: ContentBlockLink[];
}

/**
 * ContentBlock
 *
 * Renders a content block used across page layouts. It supports an image or
 * icon, a heading, optional copy, a list of link items and an optional main
 * link (view more).
 */
export const ContentBlock: React.FC<ContentBlockProps> = ({
  links,
  mainLink,
  headline,
  copy,
  image,
  imageAlt,
  icon,
  className = '',
  ...attributes
}) => {
  const Container: React.ElementType = 'div';
  return (
    <Container className={`nsw-content-block ${className}`} {...attributes}>
      {image ? <ContentBlockImage src={image} imageAlt={imageAlt} /> : null}
      {icon ? <ContentBlockIcon>{icon}</ContentBlockIcon> : null}
      <div className="nsw-content-block__content">
        {headline ? <ContentBlockHeading>{headline}</ContentBlockHeading> : null}
        {copy ? <ContentBlockCopy>{copy}</ContentBlockCopy> : null}
        <ul className="nsw-content-block__list">
          {links ? links.map((link) => (
            <li key={String(link.title)}><a href={link.href}>{link.title}</a></li>
          )) : null}
        </ul>
        {mainLink ? <div className="nsw-content-block__link"><a href={mainLink.url}>{mainLink.text}</a></div> : null}
      </div>
    </Container>
  );
};

/** Image inside content block */
export const ContentBlockImage: React.FC<{ src: string; imageAlt?: string; className?: string } & React.HTMLAttributes<HTMLDivElement>> = ({ src, className = '', imageAlt = '', ...attributes }) => (
  <div className="nsw-content-block__image">
    <img src={src} alt={imageAlt} className="nsw-content-block__image" {...attributes} />
  </div>
);

/** Icon wrapper */
export const ContentBlockIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...attributes }) => (
  <div className={`nsw-content-block__image ${className}`} {...attributes}>
    <div className="nsw-content-block__icon">{children}</div>
  </div>
);

/** Copy paragraph */
export const ContentBlockCopy: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...attributes }) => (
  <p className={`nsw-content-block__copy ${className}`} {...attributes}>{children}</p>
);

/** Heading */
export const ContentBlockHeading: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...attributes }) => (
  <h2 className={`nsw-content-block__title ${className}`} {...attributes}>{children}</h2>
);

export default ContentBlock;
