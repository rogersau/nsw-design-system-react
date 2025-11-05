import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../index';

const meta: Meta<typeof Alert> = {
  title: 'Content/In-page Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { docs: { autodocs: true } },
  args: {
    as: 'info',
    title: 'Info alert',
    children: <p>Content of alert</p>,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {};

export const Error: Story = {
  args: { as: 'error', title: 'Error alert' },
};

export const Warning: Story = {
  args: { as: 'warning', title: 'Warning alert' },
};

export const Success: Story = {
  args: { as: 'success', title: 'Success alert' },
};
