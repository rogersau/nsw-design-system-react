// Temporary TypeScript entry to validate the tsup build.
// It re-exports the existing JS entry so your current JS sources can remain
// unchanged while we validate the TypeScript toolchain.
/* eslint-disable @typescript-eslint/ban-ts-comment */
// Re-export all named exports from the JS entry
export * from './index.js';

// Prefer our TypeScript Button when building the TS entry (overrides JS export)
export { default as Button } from './component/button/button';
export type { ButtonProps } from './component/button/button';
// End of temporary TypeScript entry
