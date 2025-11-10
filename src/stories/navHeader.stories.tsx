import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import PageHeading from '../component/navheader/navHeader';

const meta: Meta<typeof PageHeading> = {
  title: 'Navigation/Page Heading',
  component: PageHeading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeading>;

export const WithBack: Story = {
  args: {
    backPath: 'docs/getting-started',
    homePath: '/',
    PageTitle: 'Example Page Title',
    onBackScreen: () => console.log('onBackScreen (fallback)'),
    onNavigate: (p: string) => console.log('onNavigate', p),
  },
  render: (args) => <PageHeading {...args} />,
};

export const CloseOnly: Story = {
  args: {
    PageTitle: 'Modal Title',
    homePath: '/',
    onBackScreen: () => console.log('onBackScreen (close)'),
    onNavigate: (p: string) => console.log('onNavigate', p),
  },
  render: (args) => <PageHeading {...args} />,
};
