import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination as PaginationComponent, PaginationEllipsis, PaginationItem } from '../component/pagination/pagination';

const meta: Meta<typeof PaginationComponent> = {
  title: 'Navigation/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PaginationComponent>;

export const Pagination: Story = {
  args: {
    paginationItems: [
      {
        url: '#page1',
      },
      {
        url: '#page2',
      },
      {
        url: '#page3',
      },
      {
        url: '#page4',
      },
    ],
    active: 3,
  },
};

export const Trimmed: Story = {
  render: (args) => (
    <PaginationComponent {...args}>
      <PaginationItem page={1} url="#page1" />
      <PaginationItem page={2} url="#page2" />
      <PaginationItem page={3} url="#page3" />
      <PaginationEllipsis />
      <PaginationItem page={10} url="#page10" />
      <PaginationItem page={11} url="#page11" />
    </PaginationComponent>
  ),
};
