import React from 'react';

/**
 * Props for HeroBannerList
 * @param subtitle - Sub-title text shown above the list
 * @param children - List items (links or nodes)
 */
export interface HeroBannerListProps extends React.HTMLAttributes<HTMLDivElement> {
  subtitle: string;
  children: React.ReactNode;
}

/**
 * Simple wrapper used by HeroBanner to render a list of links or items.
 */
export const HeroBannerList: React.FC<HeroBannerListProps> = ({
  subtitle,
  children,
  className,
  ...rest
}) => (
  <div className={["nsw-hero-banner__links", className].filter(Boolean).join(' ')} {...rest}>
    <div className="nsw-hero-banner__list">
      <div className="nsw-hero-banner__sub-title">{subtitle}</div>
      {children}
    </div>
  </div>
);

export default HeroBannerList;
