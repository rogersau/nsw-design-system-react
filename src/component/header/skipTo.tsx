import React from 'react';

/**
 * Properties for SkipTo component
 */
export interface SkipToProps {
  /**
   * Anchor link to the main navigation (e.g., "#nav")
   */
  nav: string;
  /**
   * Anchor link to the main content (e.g., "#content")
   */
  content: string;
}

/**
 * SkipTo Component
 * 
 * Provides skip navigation links for accessibility.
 * Allows keyboard users to bypass repetitive navigation and jump directly to:
 * - Main navigation area
 * - Main content area
 * 
 * Links are typically visually hidden but become visible when focused.
 * Essential for WCAG 2.1 compliance and keyboard navigation accessibility.
 * Should be placed at the very top of the page before all other content.
 * 
 * @example
 * ```tsx
 * <SkipTo nav="#nav" content="#content" />
 * ```
 */
export const SkipTo = ({ nav, content }: SkipToProps) => (
  <nav className="nsw-skip" aria-label="Skip to links">
    <a href={nav}>
      <span>Skip to navigation</span>
    </a>
    <a href={content}>
      <span>Skip to content</span>
    </a>
  </nav>
);
