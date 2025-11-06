import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from '../index';

type Item = { link?: string; text: string };

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Content/Breadcrumb',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: { docs: { autodocs: true } },
  args: {
    items: [
      { link: 'breadcrumb/one/', text: 'Home' },
      { link: 'breadcrumb/two/', text: 'About DPC' },
      { link: 'breadcrumb/three/', text: 'NSW Digital Design System' },
    ] as Item[],
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Breadcrumb: Story = {};
