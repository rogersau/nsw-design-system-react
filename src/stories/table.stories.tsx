import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Table, { TableResponsiveWrapper } from '../component/table/table';

const simpleHeaders = [
  { title: 'First Name', key: 'fname', width: 33 },
  { title: 'Last Name', key: 'lname', width: 33 },
  { title: 'Email', key: 'email', width: 33 },
];

const simpleData = [
  { fname: 'Coco', lname: 'Clarke', email: 'coco.clarke@email.com' },
  { fname: 'Bonnie', lname: 'Delacruz', email: 'bonnie.delacruz@email.com' },
  { fname: 'Matthew', lname: 'Lamb', email: 'matthew.lamb@email.com' },
];

const meta: Meta<typeof Table> = {
  title: 'Content/Tables',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    caption: 'User record',
    headers: simpleHeaders,
    data: simpleData,
  },
};

export const Responsive: Story = {
  render: (args) => (
    <TableResponsiveWrapper>
      <Table {...(args as any)} />
    </TableResponsiveWrapper>
  ),
  args: {
    caption: 'User record',
    headers: simpleHeaders,
    data: simpleData,
  },
};

export const Bordered: Story = {
  args: {
    caption: 'User record',
    headers: simpleHeaders,
    bordered: true,
    data: simpleData,
  },
};

export const Striped: Story = {
  args: {
    caption: 'Population of Australian states and territories, December 2015',
    headers: simpleHeaders,
    striped: true,
    data: simpleData,
  },
};

export const CaptionTop: Story = {
  args: {
    caption: 'Population of Australian states and territories, December 2015',
    headers: simpleHeaders,
    captionTop: true,
    data: simpleData,
  },
};
