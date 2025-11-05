import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Media from '../component/media/media';

const meta: Meta<typeof Media> = {
  title: 'Content/Media',
  component: Media,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Media>;

export const Image: Story = {
  args: {
    title: 'A picture of a black dog',
    image: 'https://picsum.photos/id/237/2000/1250',
    caption: 'A long caption, ee mei labores adipiscing.',
  },
};

export const Video: Story = {
  args: {
    title: 'Digital.nsw launch with Victor Dominello MP at NSW Parliament House',
    video: 'https://www.youtube.com/embed/HNHu2zRPSB4',
    caption: 'A long caption, ee mei labores adipiscing.',
    center: '80',
  },
};

export const ImageWithText: Story = {
  render: () => (
    <>
      <Media
        caption="A long caption, ee mei labores adipiscing."
        image="https://picsum.photos/id/237/2000/1250"
        right="50"
        title="A picture of a black dog"
      />
      <p>Vitae elit finibus, in commodo nulla aliquam. Vivamus ac varius dolor. Praesent hendrerit erat nec pulvinar congue.</p>
      <p>Mauris in sagittis lacus. Aliquam nec consectetur elit, ac gravida mi. Donec ullamcorper felis volutpat venenatis maximus.</p>
      <p>Phasellus id sem molestie, facilisis ipsum id, molestie orci. Proin velit erat, luctus et mi eget, maximus aliquet dui.</p>
    </>
  ),
};
