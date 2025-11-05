import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from '../component/loader/loader';
import type { LoaderProps } from '../component/loader/loader';

const meta: Meta<typeof Loader> = {
  title: 'Content/Loader',
  component: Loader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    loadingText: 'Loading',
    delay: null,
  } as LoaderProps,
};

export const WithDelay: Story = {
  args: {
    loadingText: 'Loading…',
    delay: 1000,
  } as LoaderProps,
};

export const LabelAfter: Story = {
  args: {
    loadingText: 'Processing',
    delay: null,
    labelPosition: 'after',
  } as LoaderProps,
};
