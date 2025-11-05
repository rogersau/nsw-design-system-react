import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../index';

const meta: Meta<typeof Button> = {
  title: 'Content/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { docs: { autodocs: true } },
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const ButtonLink: Story = {
  args: { link: '/', children: 'Button Link' },
};

export const DarkOutline: Story = {
  args: { style: 'dark-outline' },
};

export const DarkOutlineSolid: Story = {
  args: { style: 'dark-outline-solid' },
};

export const Light: Story = {
  args: { style: 'light' },
};

export const LightOutline: Story = {
  args: { style: 'light-outline' },
};

export const Danger: Story = {
  args: { style: 'danger' },
};

export const White: Story = {
  args: { style: 'white' },
};
