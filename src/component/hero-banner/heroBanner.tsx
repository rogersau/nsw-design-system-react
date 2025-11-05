import React from 'react';

/**
 * Hero banner
 *
 * Renders a prominent banner used to highlight key content on a page.
 * The component supports an optional image, a primary call to action and
 * several visual variants (dark, light, white). It also supports layout
 * modifiers such as `wide` and `featured`.
 *
 * @param {object} props - Component props
 * @param {string} props.title - The title of the banner (required)
 * @param {string} props.intro - The intro / lead paragraph text (required)
 * @param {{url?: string, text?: string}} [props.cta] - Optional call-to-action
 *   object. When provided a link will be rendered.
 * @param {{src?: string, alt?: string}} [props.image] - Optional image object
 *   containing `src` and `alt`.
 * @param {'dark'|'light'|'white'} [props.style='white'] - Visual style variant.
 * @param {boolean} [props.wide=false] - If true, renders the wide layout.
 * @param {boolean} [props.featured=false] - If true, applies the featured
 *   minimum height style.
 * @param {React.ReactNode} [props.children] - Optional children rendered
 *   alongside content (for example lists or extra controls).
 * @param {string} [props.className] - Additional CSS class(es) to append.
 * @param {object} [attributeOptions] - Additional HTML attributes forwarded
 *   to the top-level container.
 */
// Omit the built-in `style` attribute since we use a `style` prop for
// visual variants ('dark'|'light'|'white'). This avoids a type collision
// with React's HTMLAttributes.style (CSSProperties).
export interface HeroBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  title: string;
  intro: string;
  cta?: { url?: string; text?: string } | null;
  image?: { src?: string; alt?: string } | null;
  style?: 'dark' | 'light' | 'white';
  wide?: boolean;
  featured?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const options: Record<NonNullable<HeroBannerProps['style']>, string> = {
  dark: 'nsw-hero-banner--dark',
  light: 'nsw-hero-banner--light',
  white: 'nsw-hero-banner--white',
};

const buttonStyles: Record<string, string> = {
  dark: 'nsw-button nsw-button--white',
  light: 'nsw-button nsw-button--dark',
  white: 'nsw-button nsw-button--dark',
};

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  intro,
  cta,
  style = 'white',
  wide = false,
  featured = false,
  image,
  children,
  className = '',
  ...attributeOptions
}) => (
  <div
    className={`nsw-hero-banner ${style ? options[style] : ''} ${wide ? 'nsw-hero-banner--wide' : ''} ${featured ? ' nsw-hero-banner--featured' : ''}  ${className}`}
    {...attributeOptions}
  >
    <div className="nsw-hero-banner__container">
      <div className="nsw-hero-banner__wrapper">
        <div className="nsw-hero-banner__content nsw-wysiwyg-content">
          <h1>{title}</h1>
          <p className="nsw-intro">{intro}</p>
          {cta ? (
            <div className="nsw-hero-banner__button">
              <a href={cta.url} className={`nsw-button ${buttonStyles[style]}`}>{cta.text}</a>
            </div>
          ) : null}

        </div>
        {children}
        <div className="nsw-hero-banner__box" role="presentation">
          {image ? <img className="nsw-hero-banner__image" src={image.src} alt={image.alt} /> : <div className="nsw-hero-banner__bg" />}
        </div>
      </div>
    </div>
  </div>
);

export default HeroBanner;
