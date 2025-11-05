import type { Meta, StoryObj } from '@storybook/react';
import { FormGroupRadio } from '../../component/forms/radio/formRadio';

const meta: Meta<typeof FormGroupRadio> = {
  title: 'Forms and Transactions/Radio',
  component: FormGroupRadio,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormGroupRadio>;

export const Group: Story = {
  args: {
    label: 'Select a thing',
    helper: 'And only one thing',
    as: 'group',
    options: [
      {
        value: '1',
        text: 'Option 1',
      },
      {
        value: '2',
        text: 'Option 2',
        selected: true,
      },
      {
        value: '3',
        text: 'Option 3',
      },
    ],
  },
};

export const WithError: Story = {
  args: {
    statusText: 'Please select an option',
    status: 'invalid',
    label: 'Select a thing',
    helper: 'And only one thing',
    as: 'group',
    options: [
      {
        value: '1',
        text: 'Option 1',
      },
      {
        value: '2',
        text: 'Option 2',
        selected: true,
      },
      {
        value: '3',
        text: 'Option 3',
      },
    ],
  },
};
