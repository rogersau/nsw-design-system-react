import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Header } from '../component/header/header';
import { Masthead } from '../component/header/masthead';
import { SkipTo } from '../component/header/skipTo';
import scLogo from './assets/seniorscardlogo.png';

const meta: Meta<typeof Header> = {
  title: 'Globals/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays across the top of all NSW Government sites. For mobile menu to work, add the main navigation component',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Search: Story = {
  args: {
    headerUrl: '#',
    siteTitle: 'digital.nsw',
    siteDescriptor: 'Department of Customer Service',
    search: true,
    mobile: true,
    onSubmit: (event) => {
      event.preventDefault();
      console.log((event.target as any).searchInput.value);
    },
  },
  render: (args) => (
    <>
      <SkipTo nav="#nav" content="#content" />
      <Masthead />
      <Header {...args} />
    </>
  ),
};

export const Simple: Story = {
  args: {
    logo: scLogo,
    headerUrl: '#',
    siteTitle: 'Seniors Card NSW',
    mobile: false,
    search: false,
  },
  render: (args) => (
    <>
      <SkipTo nav="#nav" content="#content" />
      <Masthead />
      <Header {...args} />
    </>
  ),
};
