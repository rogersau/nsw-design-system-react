import React, { useId } from 'react';

/**
 * Footer link shape
 */
export interface FooterLink {
  url: string;
  text: string;
}

/**
 * FooterLinks
 *
 * Renders a list of footer links. Uses `react-id-generator` to generate
 * keys for list items (keeps parity with original implementation).
 */
/**
 * A section for the footer that sits at the end
 *
 * @param  {array}  footerLinks     - The section links, format: { url: '', text: '' }
 * @param  {string} className        - An additional class, optional
 * @param  {object} attributeOptions - Any other attribute options
 */
export const FooterLinks: React.FC<{ footerLinks: FooterLink[]; className?: string } & React.HTMLAttributes<HTMLUListElement>> = ({ footerLinks, className = '', ...attributeOptions }) => {
  const baseId = useId();
  return (
    <ul className={className} {...attributeOptions}>
      {footerLinks.map((footerLink, i) => (
        <li key={`${baseId}-${i}`}>
          <a href={footerLink.url}>{footerLink.text}</a>
        </li>
      ))}
    </ul>
  );
};

/**
 * FooterSectionGroup
 *
 * Renders a titled section (heading + list) used within the footer upper area.
 */
/**
 * A section for the footer that sits at the end
 *
 * @param  {object}  heading         - The heading section link, format: { url: '', text: '' }
 * @param  {array}  sectionLinks     - The section links, format: { url: '', text: '' }
 * @param  {string} className        - An additional class, optional
 * @param  {object} attributeOptions - Any other attribute options
 */
export const FooterSectionGroup: React.FC<{ heading: FooterLink; sectionLinks: FooterLink[]; className?: string } & React.HTMLAttributes<HTMLDivElement>> = ({ heading, sectionLinks, className = '', ...attributeOptions }) => {
  const baseId = useId();
  return (
    <div className={`nsw-footer__group ${className}`} {...attributeOptions}>
      <h3 className="nsw-footer__heading"><a href={heading.url}>{heading.text}</a></h3>
      <ul className="nsw-footer__list">
        {sectionLinks.map((sectionLink, i) => (
          <li key={`${baseId}-s-${i}`}>
            <a href={sectionLink.url}>{sectionLink.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * FooterUpper
 *
 * Top region of the footer. Intended to contain one or more
 * navigation groups (see `FooterSectionGroup`). Typically used to
 * surface grouped links and headings.
 *
 * @param {React.ReactNode} children - Elements placed inside the upper
 *   footer region (usually `<FooterSectionGroup/>` components).
 * @param {string} [className] - Additional CSS class(es) added to the
 *   wrapper element.
 * @param {string} [ariaLabel='footer'] - Accessible label for the nav
 *   container (defaults to 'footer').
 * @returns {JSX.Element} A `<nav>` element with the provided content.
 *
 * @example
 * <FooterUpper>
 *   <FooterSectionGroup heading={{url:'#',text:'Quick links'}} sectionLinks={[{url:'#',text:'Home'}]} />
 * </FooterUpper>
 */
export const FooterUpper: React.FC<{ children: React.ReactNode; className?: string; ariaLabel?: string } & React.HTMLAttributes<HTMLElement>> = ({ children, className = '', ariaLabel = 'footer', ...attributeOptions }) => (
  <nav className={`nsw-footer__upper ${className}`} aria-label={ariaLabel} {...attributeOptions}>
    <div className="nsw-container">
      {children}
    </div>
  </nav>
);

/**
 * FooterLower
 *
 * Bottom region of the footer used for copyright, legal text and
 * compact link lists. This area typically contains smaller-line
 * information such as copyright notices and utility links.
 *
 * @param {React.ReactNode} children - Content to render inside the lower
 *   footer (text, small lists, copyright notices).
 * @param {string} [className] - Optional additional CSS classes.
 * @returns {JSX.Element} A `<div>` wrapping the lower footer content.
 *
 * @example
 * <FooterLower>
 *   <p>Copyright © 2021</p>
 * </FooterLower>
 */
export const FooterLower: React.FC<{ children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...attributeOptions }) => (
  <div className={`nsw-footer__lower ${className}`} {...attributeOptions}>
    {children}
  </div>
);

/**
 * Footer (default)
 *
 * Top-level footer wrapper. Compose using `FooterUpper` and
 * `FooterLower` to structure the content. Additional HTML attributes
 * are forwarded to the containing `<footer>` element.
 *
 * @param {React.ReactNode} children - The footer contents (upper/lower regions).
 * @param {string} [className] - Optional extra class names to apply.
 * @param {object} [attributeOptions] - Additional HTML attributes forwarded to the element.
 * @returns {JSX.Element} The root `<footer>` element.
 *
 * @example
 * <Footer>
 *   <FooterUpper>...</FooterUpper>
 *   <FooterLower>...</FooterLower>
 * </Footer>
 */
const Footer: React.FC<{ children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLElement>> = ({ children, className = '', ...attributeOptions }) => (
  <footer className={`nsw-footer ${className}`} {...attributeOptions} role="contentinfo">
    {children}
  </footer>
);

export default Footer;
