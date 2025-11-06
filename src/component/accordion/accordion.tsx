import React, { useState, useId, useContext, useEffect } from 'react';

// Context used by AccordionGroup to broadcast expand/collapse commands
const AccordionGroupContext = React.createContext<{ openState: boolean | null; stamp: number }>({ openState: null, stamp: 0 });

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

  // listen for group expand/collapse commands
  useAccordionGroupSignal(setIsOpen);

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
            {isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
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

// Make Accordion respond to AccordionGroup expand/collapse commands
export const useAccordionGroupSignal = (setIsOpen: (v: boolean) => void) => {
  const ctx = useContext(AccordionGroupContext);
  useEffect(() => {
    if (ctx.openState !== null) {
      setIsOpen(ctx.openState);
    }
    // only react when stamp changes or openState changes
  }, [ctx.stamp, ctx.openState, setIsOpen]);
};

export interface AccordionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  /**
   * Show the expand/collapse controls in the top-right of the group.
   * Set to `false` to hide the controls.
   * @default true
   */
  showControls?: boolean;
}

/**
 * AccordionGroup
 *
 * Groups multiple Accordion children under the `.nsw-accordion` wrapper.
 * Provides expand/collapse-all controls which broadcast to child Accordions.
 */
export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  className,
  children,
  showControls = true,
  ...attributeOptions
}) => {
  const [openState, setOpenState] = useState<boolean | null>(null);
  const [stamp, setStamp] = useState(0);

  const expandAll = () => {
    setOpenState(true);
    setStamp((s) => s + 1);
  };

  const collapseAll = () => {
    setOpenState(false);
    setStamp((s) => s + 1);
  };

  return (
    <AccordionGroupContext.Provider value={{ openState, stamp }}>
      <div className={`nsw-accordion ready ${className ? className : ''}`} {...attributeOptions}>
        {showControls && (
          <div className="nsw-accordion__controls" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
            <a
              href="#"
              className="nsw-link"
              onClick={(e) => {
                e.preventDefault();
                expandAll();
              }}
              style={{ marginRight: '1rem' }}
            >
              Expand all
            </a>
            <a
              href="#"
              className="nsw-link"
              onClick={(e) => {
                e.preventDefault();
                collapseAll();
              }}
            >
              Collapse all
            </a>
          </div>
        )}
        {children}
      </div>
    </AccordionGroupContext.Provider>
  );
};

export default Accordion;
