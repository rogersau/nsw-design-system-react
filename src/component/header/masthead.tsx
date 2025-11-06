import React from 'react';

/**
 * Properties for Masthead component
 */
export interface MastheadProps {
  /**
   * Text to display in the masthead
   * @default "A NSW Government website"
   */
  text?: string;
}

/**
 * Masthead Component
 * 
 * Displays a masthead banner identifying the site as an official NSW Government website.
 * Appears above the main header across all NSW Government sites.
 * Provides visual branding and trust indicators for government digital services.
 * 
 * @example
 * ```tsx
 * <Masthead />
 * <Masthead text="An official NSW Government site" />
 * ```
 */
export const Masthead = ({ text = 'A NSW Government website' }: MastheadProps) => (
  <div className="nsw-masthead">
    <div className="nsw-container">
      <p>{text}</p>
    </div>
  </div>
);
