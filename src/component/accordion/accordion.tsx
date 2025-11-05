import React, { useState, useId } from 'react';

/**
 * Accordion
 *
 * A simple accordion component. Renders a title button which toggles showing
 * the content. Uses React's built-in id generator to create an accessible
 * `aria-controls` target id.
 *
 * @remarks
 * This mirrors the behaviour of the original class-based component but uses
 * hooks for a smaller footprint and automatic id generation.
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The heading text for the accordion */
  header: string;
  /** The body content rendered inside the accordion */
  body: React.ReactNode;
  /** Additional className to append to the root element */
  className?: string;
  /**
   * Kept for API parity with the original component. Not used by the
   * functional implementation (the accordion is closed by default).
   */
  closed?: boolean;
}

/**
 * Accordion component (functional).
 *
 * @param props - Props for the Accordion component
 */
export const Accordion: React.FC<AccordionProps> = ({
  header,
  body,
  closed,
  className = '',
  ...attributeOptions
}) => {
  // preserve original behaviour: closed by default
  const [isOpen, setIsOpen] = useState(false);

  // use React's built-in id generator for stable, unique ids
  const reactId = useId();
  const uID = `accordion-${reactId.replace(/:/g, '')}`;

  return (
    <>
      <div className="nsw-accordion__title">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={uID}
          className={`nsw-accordion__button ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {header}
          <i
            className="material-icons nsw-material-icons nsw-accordion__icon"
            aria-hidden="true"
            {...({ focusable: 'false' } as any)}
          >
            keyboard_arrow_right
          </i>
        </button>
      </div>
      <div
        className="nsw-accordion__content"
        id={uID}
        hidden={!isOpen}
        {...attributeOptions}
      >
        <div className="nsw-wysiwyg-content">{body}</div>
      </div>
    </>
  );
};

export interface AccordionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

/**
 * AccordionGroup
 *
 * Groups multiple Accordion children under the `.nsw-accordion` wrapper.
 */
export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  className,
  children,
  ...attributeOptions
}) => (
  <div className={`nsw-accordion ready ${className ? className : ''}`} {...attributeOptions}>
    {children}
  </div>
);

export default Accordion;
