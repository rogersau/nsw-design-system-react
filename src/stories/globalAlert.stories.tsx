import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GlobalAlert from '../component/global-alert/globalAlert';

const meta: Meta<typeof GlobalAlert> = {
  title: 'Content/GlobalAlert',
  component: GlobalAlert,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GlobalAlert>;

export const Info: Story = {
  args: {
    title: 'Title',
    content: 'This is a message',
    ctaText: 'Click me',
  },
};

export const Critical: Story = {
  args: {
    title: 'Title',
    content: 'This is a message',
    ctaText: 'Click me',
    as: 'critical',
  },
};

export const Light: Story = {
  args: {
    title: 'Title',
    content: 'This is a message',
    ctaText: 'Click me',
    as: 'light',
  },
};
