import React, { useEffect, useId } from 'react';
import { initSite } from 'nsw-design-system/src/main';

/**
 * Available visual variants for GlobalAlert
 */
export type GlobalAlertVariant = 'critical' | 'light' | 'default';

const options: Record<GlobalAlertVariant, string> = {
  critical: 'nsw-global-alert--critical',
  light: 'nsw-global-alert--light',
  default: '',
};

const buttonStyles: Record<GlobalAlertVariant | 'default', string> = {
  default: 'nsw-button nsw-button--white',
  critical: 'nsw-button nsw-button--white',
  light: 'nsw-button nsw-button--dark',
};

/**
 * Props for GlobalAlert
 *
 * @typedef {object} GlobalAlertProps
 * @property {string} title - Title text shown in the alert (required)
 * @property {string} content - Body content of the alert (required)
 * @property {string} [ctaText] - Optional CTA text for a link/button
 * @property {string} [ctaHref] - Optional CTA href (if present, CTA renders as an anchor)
 * @property {'critical'|'light'|'default'} [as='default'] - Variant visual style
 * @property {string} [className] - Additional className to append
 * @property {React.ReactNode} [children] - Optional children to render inside the alert
 * @property {object} [attributeOptions] - Additional HTML attributes forwarded to the root element
 */
export interface GlobalAlertProps {
  title: string;
  content: string;
  ctaText?: string;
  ctaHref?: string;
  as?: GlobalAlertVariant;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

/**
 * GlobalAlert
 *
 * Top-level page alert used to surface messages to users. This component
 * calls `initSite()` on mount to wire any underlying design-system
 * behaviour (as used by the original implementation).
 *
 * @param props GlobalAlertProps
 */
/**
 * GlobalAlert
 *
 * Render an important message at the top of the page. The original
 * implementation called `initSite()` on mount — this is preserved here.
 * The component supports an optional call-to-action (CTA) anchor and a
 * visual `as` variant to select different styles.
 *
 * Behaviour notes:
 * - If both `ctaText` and `ctaHref` are provided the CTA is rendered as an anchor.
 * - `initSite()` is invoked inside a `useEffect` to initialise any
 *   design-system behaviour (this will be no-op in environments where
 *   `initSite` is not available).
 *
 * @param {GlobalAlertProps} props
 */
export const GlobalAlert: React.FC<GlobalAlertProps> = ({
  title,
  content,
  ctaText,
  ctaHref,
  as = 'default',
  className = '',
  children,
  ...attributes
}) => {
  const id = useId();

  useEffect(() => {
    // Original component initialised the site on mount. Preserve that behaviour.
    try {
      initSite();
    } catch (e) {
      // initSite may be absent in some test environments — swallow errors.
      // eslint-disable-next-line no-console
      console.warn('initSite failed', e);
    }
  }, []);

  return (
    <div
      id={`global-alert-${id}`}
      className={`nsw-global-alert ${className} ${options[as]}`}
      {...attributes}
    >
      <div className="nsw-global-alert__wrapper">
        <div className="nsw-global-alert__content">
          <div className="nsw-global-alert__title">{title}</div>
          <p>{content}</p>
        </div>
        <p>
          {ctaText && ctaHref ? (
            <a href={ctaHref} className={as ? buttonStyles[as] : buttonStyles.default}>{ctaText}</a>
          ) : null}
        </p>
        <button type="button" className="nsw-icon-button">
          <span className="material-icons nsw-material-icons" aria-hidden="true">close</span>
          <span className="sr-only">Close message</span>
        </button>
      </div>
      {children}
    </div>
  );
};

export default GlobalAlert;
