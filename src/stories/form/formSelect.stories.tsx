import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FormGroupSelect } from '../../component/forms/select/formSelect';

const meta: Meta<typeof FormGroupSelect> = {
  title: 'Forms and Transactions/Dropdown (select)',
  component: FormGroupSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormGroupSelect>;

export const AsFormItem: Story = {
  args: {
    label: 'Select a thing',
    helper: 'Select from the list',
    selected: '1',
    options: [
      {
        value: '',
        text: 'Please select',
      },
      {
        value: '1',
        text: 'Option 1',
        selected: true,
      },
      {
        value: '2',
        text: 'Option 2',
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
    helper: 'Select from the list',
    selected: '',
    options: [
      {
        value: '',
        text: 'Please select',
      },
      {
        value: '1',
        text: 'Option 1',
      },
      {
        value: '2',
        text: 'Option 2',
      },
      {
        value: '3',
        text: 'Option 3',
      },
    ],
  },
};
