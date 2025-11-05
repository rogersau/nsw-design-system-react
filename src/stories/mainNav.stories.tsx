import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MainNav } from '../component/main-nav/mainNav';
import { Header } from '../component/header/header';

const meta: Meta<typeof MainNav> = {
  title: 'Navigation/Main Navigation',
  component: MainNav,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainNav>;

export const MegaNavigation: Story = {
  args: {
    megaMenu: true,
    navItems: [
      {
        text: 'About DPC',
        url: '/index.html#about-dpc',
        id: '914d7e2',
        description: 'Filium morte multavit si sine causa? quae fuerit causa, nollem.',
        subNav: [
          {
            text: 'Level 2',
            url: '/index.html#level-2',
            subNav: [
              {
                text: 'Level 3',
                url: '/index.html#level-3',
              },
              {
                text: 'Level 3',
                url: '/index.html#level-3',
              },
              {
                text: 'Level 3',
                url: '/index.html#level-3',
              },
            ],
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
        ],
      },
      {
        text: 'Updates',
        url: '/index.html#updates',
        id: '3250fbee',
        subNav: [
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
        ],
      },
      {
        text: 'Publications',
        url: '/index.html#publications',
        id: 'bd48c03b',
        subNav: [
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
        ],
      },
      {
        text: 'Tools & Resources',
        url: '/index.html#tools-resources',
        id: 'c457a536',
        subNav: [
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
          {
            text: 'Level 2',
            url: '/index.html#level-2',
          },
        ],
      },
      {
        text: 'Contact us',
        url: '/index.html#contact-us',
        id: '017200ca',
      },
    ],
  },
  render: (args) => (
    <>
      <Header headerUrl="#" mobile search={false} siteTitle="digital.nsw" onSubmit={() => {}} />
      <MainNav {...args} />
    </>
  ),
};
