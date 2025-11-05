import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ContentBlock, { ContentBlockCopy } from '../component/content-block/contentBlock';

const meta: Meta<typeof ContentBlock> = {
  title: 'Content/ContentBlock',
  component: ContentBlock,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentBlock>;

const SvgHTML = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22.248" cy="16.831" r="9.83" stroke="#333" strokeWidth="2" />
  </svg>
);

export const TextBlock: Story = {
  args: {
    headline: 'Title',
    copy: 'this is a paragraph',
    links: [
      { title: 'link 1', href: '#' },
      { title: 'link 2', href: '#' },
      { title: 'link 3', href: '#' },
    ],
  },
};

export const IconBlock: Story = {
  args: {
    headline: 'Title',
    links: [
      { title: 'link 1', href: '#' },
      { title: 'link 2', href: '#' },
      { title: 'link 3', href: '#' },
    ],
    copy: 'this is a paragraph',
    icon: SvgHTML,
  },
};

export const ImageBlock: Story = {
  args: {
    headline: 'Title',
    copy: 'this is a paragraph',
    image: 'https://picsum.photos/id/2/400/200',
    imageAlt: 'Work desk',
    links: [
      { title: 'link 1', href: '#' },
      { title: 'link 2', href: '#' },
      { title: 'link 3', href: '#' },
    ],
  },
};
