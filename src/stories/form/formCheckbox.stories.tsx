import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FormGroupCheckbox } from '../../component/forms/checkbox/formCheckbox';

const meta: Meta<typeof FormGroupCheckbox> = {
  title: 'Forms and Transactions/Checkboxes',
  component: FormGroupCheckbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormGroupCheckbox>;

export const Group: Story = {
  args: {
    label: 'Select a thing',
    helper: 'Or more than one thing',
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

export const Single: Story = {
  args: {
    label: 'Select a thing',
    options: [
      {
        value: '1',
        text: 'Option 1',
      },
    ],
  },
};

export const GroupError: Story = {
  args: {
    statusText: 'Please select at least one option',
    status: 'invalid',
    label: 'Select a thing',
    helper: 'Or more than one thing',
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

export const SingleSuccess: Story = {
  args: {
    statusText: 'Terms & conditions accepted',
    status: 'valid',
    label: 'Legal stuff',
    options: [
      {
        value: '1',
        text: 'Accept the terms of this checkbox',
        checked: true,
      },
    ],
  },
};
