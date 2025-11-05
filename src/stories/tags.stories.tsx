import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import TagList from '../component/tags/tags';

const meta: Meta<typeof TagList> = {
  title: 'Content/Tags',
  component: TagList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TagList>;

export const Default: Story = {
  args: {
    tags: [
      { text: 'Digital' },
      { text: 'Design System' },
      { text: 'Transformation' },
    ],
  },
};
