import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Section from '../component/section/section';

const meta: Meta<typeof Section> = {
  title: 'Content/Section',
  component: Section,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Section>;

export const White: Story = {
  args: {
    children: <p>Content of section</p>,
  },
};

export const Dark: Story = {
  args: {
    style: 'brand-dark',
    children: <p>Content of section</p>,
  },
};

export const InlineBox: Story = {
  args: {
    style: 'grey-01',
    box: true,
    children: <p>Content of section</p>,
  },
};
