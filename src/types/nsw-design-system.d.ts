declare module 'nsw-design-system/src/main' {
  export function initSite(): void;
}

declare module 'nsw-design-system' {
  // Minimal fallback so imports don't fail during TS declaration generation.
  const nsw: any;
  export default nsw;
}
