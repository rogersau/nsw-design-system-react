import React from 'react';

const options: Record<string, string> = {
  full: '',
  half: 'nsw-section--half-padding',
  none: 'nsw-section--no-padding',
};

/**
 * Props for the Section component
 *
 * @param children - Content to render inside the section. Required.
 * @param style - Visual theme for the section. One of:
 *   'white' | 'brand-dark' | 'brand-light' | 'brand-supplementary' |
 *   'black' | 'off-white' | 'grey-01' | 'grey-02' | 'grey-03' | 'grey-04'
 *   Defaults to 'white'.
 * @param padding - Padding style. 'full' | 'half' | 'none'. Defaults to 'full'.
 * @param container - Whether to wrap children inside an `.nsw-container`. Defaults to true.
 * @param box - Whether to render the section as an inline box. Defaults to false.
 * @param className - Additional className to append.
 * @param rest - Any other HTML attributes applied to the outer wrapper.
 */
export interface SectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  children: React.ReactNode;
  style?:
    | 'white'
    | 'brand-dark'
    | 'brand-light'
    | 'brand-supplementary'
    | 'black'
    | 'off-white'
    | 'grey-01'
    | 'grey-02'
    | 'grey-03'
    | 'grey-04';
  padding?: 'full' | 'half' | 'none';
  container?: boolean;
  box?: boolean;
  className?: string;
}

/**
 * Section
 *
 * A flexible container used for page sections. Mirrors the legacy implementation
 * and CSS class composition. Children are wrapped in an `.nsw-container` when
 * `container` is true.
 */
export const Section: React.FC<SectionProps> = ({
  children,
  style = 'white',
  container = true,
  padding = 'full',
  box = false,
  className = '',
  ...rest
}) => {
  const classNames = `nsw-section ${className} ${options[padding]} nsw-section--${style} ${
    box ? 'nsw-section--box' : ''
  }`;

  return (
    <div className={classNames} {...rest}>
      <div className={container ? 'nsw-container' : ''}>{children}</div>
    </div>
  );
};

export default Section;
