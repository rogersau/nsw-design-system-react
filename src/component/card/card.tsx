import React from 'react';

/**
 * CardProps
 */
// Omit the built-in "style" from HTML attributes because this component
// uses a `style` prop with a small set of string values.
export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  link?: string;
  style?: 'dark' | 'light' | 'white';
  tag?: string;
  date?: string;
  dateMomentFormat?: string;
  image?: string;
  imageAlt?: string;
  headline: string;
  highlight?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Card
 *
 * The Card component composes several small subcomponents (CardImage,
 * CardContent, CardHeader etc.) to render a flexible card used across the
 * design system.
 */
const Card: React.FC<CardProps> = ({
  link,
  style = 'white',
  headline,
  highlight,
  tag,
  date,
  image,
  imageAlt,
  className = '',
  children,
  ...attributesOptions
}) => {
  // The original implementation rendered a div even when link was provided.
  // We keep the same behaviour but forward href if a link is present so
  // consumers can wrap the card if needed.
  const CardContainer: React.ElementType = 'div';
  if (link !== undefined) {
    (attributesOptions as any).href = link;
  }

  return (
    <CardContainer
      className={`nsw-card nsw-card--${style} ${className}`
        + `${headline ? ' nsw-card--headline' : ''}`
        + `${highlight ? ' nsw-card--highlight' : ''}`}
      {...attributesOptions}
    >
      {image ? <CardImage src={image} alt={imageAlt} /> : null}
      <CardContent>
        {tag ? <CardTag>{tag}</CardTag> : null}
        {date ? <CardDate date={date} /> : null}
        {headline ? <CardHeader link={link}>{headline}</CardHeader> : null}
        {children}
      </CardContent>
    </CardContainer>
  );
};

/** CardContent */
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...attributesOptions }) => (
  <div className={`nsw-card__content ${className}`} {...attributesOptions}>
    {children}
    <span className="material-icons nsw-material-icons nsw-card__icon" aria-hidden="true" {...({ focusable: 'false' } as any)}>east</span>
  </div>
);

/** CardHeader */
export const CardHeader: React.FC<{ className?: string; link?: string; children?: React.ReactNode }> = ({ className = '', link, children }) => {
  const HeadingTag: React.ElementType = 'div';
  if (link !== undefined) {
    return (
      <HeadingTag className={`nsw-card__title ${className}`}><a href={link} className="nsw-card__link">{children}</a></HeadingTag>
    );
  }
  return (
    <HeadingTag className={`nsw-card__title ${className}`}>{children}</HeadingTag>
  );
};

/** CardImage */
export const CardImage: React.FC<{ src: string; className?: string; alt?: string }> = ({ src, className = '', alt = '', ...attributesOptions }) => (
  <div className="nsw-card__image">
    <img className={className} src={src} alt={alt} {...attributesOptions} />
  </div>
);

/** CardCopy */
export const CardCopy: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className = '', children, ...attributesOptions }) => (
  <p className={`nsw-card__copy ${className}`} {...attributesOptions}>{children}</p>
);

/** CardTag */
export const CardTag: React.FC<{ className?: string; children?: React.ReactNode }> = ({ children, className = '', ...attributesOptions }) => (
  <p className={`nsw-card__tag ${className}`} {...attributesOptions}>{children}</p>
);

/** CardDate */
export const CardDate: React.FC<{ className?: string; date: string }> = ({ className = '', date, ...attributesOptions }) => (
  <p className={`nsw-card__date ${className}`} {...attributesOptions}><time dateTime={date}>{date}</time></p>
);

/** CardDivider */
export const CardDivider: React.FC<{ className?: string } & React.HTMLAttributes<HTMLHRElement>> = ({ className = '', ...attributesOptions }) => (
  <hr className={`nsw-card__divider ${className}`} {...attributesOptions} />
);

/** CardLink */
export const CardLink: React.FC<{ link: string; text: string; className?: string }> = ({ link, text, className = '', ...attributesOptions }) => (
  <a href={link} className={`nsw-card--clickable__link ${className}`} {...attributesOptions}>{text}</a>
);

/** CardFooter */
export const CardFooter: React.FC<{ dark?: boolean; alt?: boolean; className?: string; children?: React.ReactNode }> = ({ dark, alt, children, className = '', ...attributesOptions }) => (
  <div className={`nsw-card__footer ${className}`} {...attributesOptions}>{children}</div>
);

/** CardTitle */
export const CardTitle: React.FC<{ className?: string; children?: React.ReactNode }> = ({ children, className = '', ...attributesOptions }) => (
  <div className={`nsw-card__title ${className}`} {...attributesOptions}>{children}</div>
);

export default Card;
