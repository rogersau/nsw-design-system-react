import { defineConfig } from 'tsup';

// tsup configuration to allow bundling the current JS codebase while we
// migrate to TypeScript. Important points:
// - Treat .js files as JSX so esbuild parses React syntax in .js files.
// - Mark runtime peers and large internal package imports as external so
//   they are not bundled (react, react-dom, prop-types, nsw-design-system).
// - Keep declaration generation off for now; enable later once codebase is
//   migrated to .ts/.tsx and types are stable.

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  sourcemap: true,
  dts: false,
  splitting: false,
  treeshake: true,
  esbuildOptions(options) {
    // Treat .js as jsx so existing JS files with JSX parse correctly
    options.loader = {
      ...(options.loader || {}),
      '.js': 'jsx',
    };
    return options;
  },
  // Externalize peers and large internal imports to avoid bundling errors
  external: [
    'react',
    'react-dom',
    'prop-types',
    // nsw-design-system references inside source tree
    /^nsw-design-system(\/.*)?$/,
  ],
});
