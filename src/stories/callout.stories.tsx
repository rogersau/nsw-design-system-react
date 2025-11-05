import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Callout } from '../index';

const meta: Meta<typeof Callout> = {
  title: 'Content/Callout',
  component: Callout,
  tags: ['autodocs'],
  parameters: { docs: { autodocs: true } },
  args: {
    title: 'Title',
    children: <p>This is a callout</p>,
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {};
