import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroBanner from '../component/hero-banner/heroBanner';
import { HeroBannerList } from '../component/hero-banner/heroBannerList';

const meta: Meta<typeof HeroBanner> = {
  title: 'Content/Hero Banner',
  component: HeroBanner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeroBanner>;

export const Default: Story = {
  args: {
    title: 'Helping you deliver great government services',
    intro:
      'Find the building blocks for creating user-centred digital services, as well as policy, tools and guidance',
    style: 'white',
    cta: { url: '/', text: 'Learn more' },
    image: { src: 'https://picsum.photos/id/237/2000/1250', alt: 'Labrador dog' },
  },
};

export const Light: Story = {
  args: {
    title: 'Helping you deliver great government services',
    intro:
      'Find the building blocks for creating user-centred digital services, as well as policy, tools and guidance',
    style: 'light',
    cta: { url: '/', text: 'Learn more' },
    image: { src: 'https://picsum.photos/id/237/2000/1250', alt: 'Labrador dog' },
  },
};

export const Dark: Story = {
  args: {
    title: 'Helping you deliver great government services',
    intro:
      'Find the building blocks for creating user-centred digital services, as well as policy, tools and guidance',
    style: 'dark',
    cta: { url: '/', text: 'Learn more' },
    image: { src: 'https://picsum.photos/id/237/2000/1250', alt: 'Labrador dog' },
  },
};

// Re-export the list component to help stories referencing it directly
export { HeroBannerList };
