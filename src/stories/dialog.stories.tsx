import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '../index';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { docs: { autodocs: true } },
  args: {
    id: 'transactional',
    title: 'Your submission was successful',
    children: (
      <p>
        Thank you for your submission, it has been successfully received. We aim to respond within 3
        business days by your preferred contact method. You can now make another submission or view your
        active submission.
      </p>
    ),
    footer: (
      <>
        <button className="nsw-button nsw-button--dark js-close-dialog">Make new submission</button>
        <button className="nsw-button nsw-button--dark-outline-solid js-close-dialog">View submissions</button>
      </>
    ),
    triggerText: 'Launch dialog',
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Transactional: Story = {};

export const CustomTrigger: Story = {
  args: {
    trigger: (
      <button className="nsw-button nsw-button--dark js-open-dialog-transactional">Launch dialog</button>
    ),
    // reuse other args from meta
  },
};

export const NonDismissible: Story = {
  args: {
    id: 'non-dismissible',
    title: 'Action Required',
    dismissible: false,
    children: (
      <p>
        This dialog cannot be dismissed by clicking outside. You must click one of the buttons below or the close button.
      </p>
    ),
    footer: (
      <>
        <button className="nsw-button nsw-button--dark js-close-dialog">Confirm</button>
        <button className="nsw-button nsw-button--dark-outline-solid js-close-dialog">Cancel</button>
      </>
    ),
    triggerText: 'Launch non-dismissible dialog',
  },
};

