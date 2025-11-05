import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LinkList from '../component/link-list/linkList';

const meta: Meta<typeof LinkList> = {
  title: 'Content/Link List',
  component: LinkList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LinkList>;

export const Default: Story = {
  args: {
    items: [
      { link: 'link/one/', text: 'Link 1' },
      { link: 'link/two/', text: 'Link 2' },
      { link: 'link/three/', text: 'Link 3' },
      { link: 'link/four/', text: 'Link 4' },
      { link: 'link/five/', text: 'Link 5' },
    ],
  },
};
