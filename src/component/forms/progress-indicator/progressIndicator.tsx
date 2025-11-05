import React from 'react';

/**
 * Properties for ProgressIndicatorStep component
 */
export interface ProgressIndicatorStepProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether this step is active/completed
   */
  active?: boolean;
}

/**
 * ProgressIndicatorStep Component
 * 
 * Renders a single step indicator in a progress bar.
 * Applies active styling when the step is completed or current.
 * 
 * @example
 * ```tsx
 * <ProgressIndicatorStep active />
 * <ProgressIndicatorStep />
 * ```
 */
export const ProgressIndicatorStep = ({ active }: ProgressIndicatorStepProps) => (
  <div className={active ? 'active' : ''} />
);

/**
 * Properties for ProgressIndicator component
 */
export interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current step number (1-indexed)
   */
  step: number;
  /**
   * Total number of steps
   */
  of: number;
}

/**
 * ProgressIndicator Component
 * 
 * Displays a multi-step progress indicator showing current position in a workflow.
 * Shows textual step count ("Step X of Y") and visual progress bar.
 * Automatically marks steps as active/complete up to the current step.
 * 
 * @example
 * ```tsx
 * // Show step 3 of 5
 * <ProgressIndicator step={3} of={5} />
 * 
 * // First step of multi-step form
 * <ProgressIndicator step={1} of={4} />
 * ```
 */
export const ProgressIndicator = ({ step, of, ...attributeOptions }: ProgressIndicatorProps) => (
  <div className="nsw-progress-indicator" {...attributeOptions}>
    <div className="nsw-progress-indicator__count">
      Step {step} of {of}
    </div>
    <div className="nsw-progress-indicator__bar">
      {[...Array(of)].fill(null).map((_, index) => (
        <ProgressIndicatorStep key={index} active={index + 1 <= step} />
      ))}
    </div>
  </div>
);
