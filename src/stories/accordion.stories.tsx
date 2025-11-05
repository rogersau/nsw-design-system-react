import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion as AccordionComponent, AccordionGroup } from '../index';

type Item = { header: string; body: React.ReactNode };

const meta: Meta<any> = {
  title: 'Content/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  parameters: { docs: { autodocs: true } },
  args: {
    items: [
      { header: 'This is an accordion', body: 'This is the body of an accordion' },
      { header: 'This is an accordion', body: 'This is the body of an accordion' },
      { header: 'This is an accordion', body: 'This is the body of an accordion' },
    ] as Item[],
  },
};

export default meta;
type Story = StoryObj<any>;

export const Accordion: Story = {
  args: { items: (meta.args as any).items },
  render: (args: any) => (
    <AccordionGroup>
      {(args.items || []).map((item: Item, index: number) => (
        <AccordionComponent key={index} body={item.body} header={item.header} />
      ))}
    </AccordionGroup>
  ),
};

export const AccordionSingle: Story = {
  args: {
    header: 'This is a single accordion',
    body: 'This is the body of a single accordion',
  },
  render: (args) => (
    <AccordionGroup>
      <AccordionComponent {...(args as any)} />
    </AccordionGroup>
  ),
};
