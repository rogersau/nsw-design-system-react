import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Card, { CardCopy } from '../component/card/card';

const meta: Meta<typeof Card> = {
  title: 'Content/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Simple: Story = {
  args: {
    link: '/',
    style: 'dark',
    headline: 'Energy Save',
    children: <CardCopy>Helps you compare electricity and gas and switch providers.</CardCopy>,
  },
};

export const Highlight: Story = {
  args: {
    link: '/',
    headline: 'Family Rebate',
    highlight: true,
    children: <CardCopy>Helps families with dependants to pay their energy bills.</CardCopy>,
  },
};

export const AllFeatures: Story = {
  args: {
    date: new Date().toLocaleDateString('en-au'),
    tag: 'Environment',
    link: '#',
    headline: 'Quality spaces and a million more trees for NSW',
    image: 'https://picsum.photos/id/292/400/200',
    imageAlt: 'Green space',
    children: <CardCopy>The NSW Government will create more quality green spaces.</CardCopy>,
  },
};
