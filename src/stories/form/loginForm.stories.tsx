import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../component/button/button';
import { FormGroupText } from '../../component/forms/text/formText';

const meta: Meta = {
  title: 'Forms and Transactions/Sign up form',
  tags: ['autodocs'],
};

export default meta;

const LoginTemplate = () => (
  <div className="nsw-section--box">
    <form className="nsw-form" onSubmit={(e) => { e.preventDefault(); console.log('submit'); }}>
      <FormGroupText htmlId="username" label="Username" />
      <FormGroupText htmlId="email" label="Email" />
      <FormGroupText
        helper="Must be at least 8 characters"
        htmlId="password"
        label="Password"
      />
      <Button type="submit">Sign Up</Button>
    </form>
  </div>
);

type Story = StoryObj<typeof LoginTemplate>;

export const LoginForm: Story = {
  render: () => <LoginTemplate />,
};
