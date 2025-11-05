// Temporary TypeScript entry to validate the tsup build.
// It re-exports the existing JS entry so your current JS sources can remain
// unchanged while we validate the TypeScript toolchain.
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Re-export all named exports from the JS entry
export * from './index.js';

// Prefer our TypeScript Button when building the TS entry (overrides JS export)
export { default as Button } from './component/button/button';
export type { ButtonProps } from './component/button/button';
// Prefer our TypeScript Accordion when building the TS entry
export { default as Accordion, AccordionGroup } from './component/accordion/accordion';
export type { AccordionProps, AccordionGroupProps } from './component/accordion/accordion';
// Prefer our TypeScript Alert when building the TS entry
export { default as Alert } from './component/alert/alert';
export type { AlertProps } from './component/alert/alert';
// Prefer our TypeScript Breadcrumbs when building the TS entry
export { default as Breadcrumbs } from './component/breadcrumbs/breadcrumb';
export type { BreadcrumbsProps, BreadcrumbItem } from './component/breadcrumbs/breadcrumb';
// Prefer our TypeScript Callout when building the TS entry
export { default as Callout } from './component/callout/callout';
export type { CalloutProps } from './component/callout/callout';
// End of temporary TypeScript entry
