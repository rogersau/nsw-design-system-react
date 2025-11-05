import type { Meta, StoryObj } from '@storybook/react';
import { FormGroupText } from '../../component/forms/text/formText';

const meta: Meta<typeof FormGroupText> = {
  title: 'Forms and Transactions/Text Input',
  component: FormGroupText,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormGroupText>;

export const SingleLine: Story = {
  args: {
    label: 'Your name',
    helper: 'as it appears on your birth certificate',
  },
};

export const MultipleLine: Story = {
  args: {
    label: 'Your name',
    helper: 'as it appears on your birth certificate',
    as: 'textarea',
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email',
    inputType: 'email',
    status: 'valid',
    statusText: 'Valid email address',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    inputType: 'password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Your name',
    helper: 'as it appears on your birth certificate',
    statusText: 'Please enter your name',
    status: 'invalid',
  },
};
