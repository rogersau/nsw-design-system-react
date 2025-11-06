module.exports = {
  // Switch to the Vite builder for Storybook
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-docs']
}

module.exports.viteFinal = async (config, { configType }) => {
  return config;
};
