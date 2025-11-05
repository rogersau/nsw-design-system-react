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
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    include: path.resolve(__dirname, '../src'),
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [require.resolve('@babel/preset-react')],
      },
    },
  });

  // Add MDX loader (babel + @mdx-js/loader)
  // Note: Storybook's addon-docs provides its own MDX handling (MDX3). Adding a
  // custom MDX loader can conflict with Storybook's indexing/CSF plugin. If you
  // still have MDX parse/indexing errors, remove this JS rule above and let
  // Storybook manage MDX. For now, we avoid adding a custom MDX rule to keep
  // Storybook's internal MDX indexer intact.

  return config;
};
