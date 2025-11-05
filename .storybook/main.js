module.exports = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  core: {
    builder: 'webpack5',
  },
  stories: [
    // Temporarily exclude MDX story files to avoid MDX indexer compatibility issues.
    // We'll re-enable MDX once MDX3/CSF indexer compatibility is resolved.
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs'
  ]
}

// Add a minimal webpackFinal to ensure JSX and MDX are transpiled when Storybook's
// default pipeline misses them (pnpm/monorepo hoisting can sometimes interfere).
// This uses babel-loader with the @babel/preset-react and the @mdx-js/loader for MDX files.
module.exports.webpackFinal = async (config) => {
  const path = require('path');

  // Ensure we have a rule for JS/JSX to use babel-loader
  // Add babel-loader for JS/JSX/TS/TSX so Storybook can consume TypeScript
  // stories and components directly from `src`.
  config.module.rules.push({
    test: /\.(mjs|jsx?|tsx?)$/,
    include: path.resolve(__dirname, '../src'),
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        // Use preset-react (automatic runtime) and preset-typescript to
        // allow transpiling .ts/.tsx without a separate ts-loader.
        presets: [
          require.resolve('@babel/preset-react'),
          require.resolve('@babel/preset-typescript'),
        ],
        // Cache for faster rebuilds
        cacheDirectory: true,
      },
    },
  });

  // Add MDX loader (babel + @mdx-js/loader)
  // Note: Storybook's addon-docs provides its own MDX handling (MDX3). Adding a
  // custom MDX loader can conflict with Storybook's indexing/CSF plugin. If you
  // still have MDX parse/indexing errors, remove this JS rule above and let
  // Storybook manage MDX. For now, we avoid adding a custom MDX rule to keep
  // Storybook's internal MDX indexer intact.

  // Ensure .ts and .tsx are resolvable without extensions in imports
  config.resolve = config.resolve || {};
  config.resolve.extensions = Array.from(new Set([
    '.ts',
    '.tsx',
    '.mjs',
    '.js',
    '.jsx',
    '.json',
  ].concat(config.resolve.extensions || [])));

  return config;
};
