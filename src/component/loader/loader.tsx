import React, { useState, useEffect } from 'react';

type Size = 'sm' | 'md' | 'lg';

interface NswLoaderProps {
  loadingText?: string;
  size?: Size;
  labelPosition?: 'below' | 'after';
  delay?: number | null;
}

/**
 * NSWLoader
 *
 * Shows a spinner and a textual label after an optional `delay` to avoid
 * flashing the loader for very short operations. The component returns
 * `null` until the delay has elapsed.
 *
 * Props
 * @param {string} [loadingText='Loading'] - Text shown next to the spinner and announced by assistive tech.
 * @param {'sm'|'md'|'lg'} [size='md'] - Visual size of the spinner.
 * @param {'below'|'after'} [labelPosition='below'] - Position of the label relative to the spinner.
 * @param {number|null} [delay=null] - Milliseconds to wait before rendering the loader. If null the loader
 *   is shown immediately (no delay).
 *
 * Accessibility
 * - The label element uses `role="status"` so screen readers announce changes.
 * - Delaying the render reduces unnecessary announcements for very fast operations.
 *
 * Return
 * @returns {JSX.Element | null} The loader element or `null` if still within the delay.
 *
 * Example
 * <NSWLoader loadingText="Processing..." size="lg" delay={500} />
 */
export type LoaderProps = NswLoaderProps;

export const Loader: React.FC<LoaderProps> = ({
  loadingText = 'Loading',
  size = 'md',
  labelPosition = 'below',
  delay = null,
}) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const validSizes: Size[] = ['sm', 'md', 'lg'];
  const isValidSize = validSizes.includes(size);

  useEffect(() => {
    // If delay is null, show immediately. Otherwise set a timer.
    if (delay == null) {
      setShowLoader(true);
      return undefined;
    }

    const timer = setTimeout(() => setShowLoader(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!showLoader) return null;

  const loaderStyle = labelPosition === 'after' ? { display: 'flex', alignItems: 'center' } : {};
  const labelStyle = labelPosition === 'after' ? { marginLeft: '5px' } : {};

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div className="nsw-loader" style={loaderStyle}>
        <span
          aria-hidden="true"
          className={`nsw-loader__circle nsw-loader__circle--${isValidSize ? size : 'md'}`}
        ></span>
        <span role="status" className="nsw-loader__label" style={labelStyle}>
          {loadingText}
        </span>
      </div>
    </div>
  );
};

export default Loader;
