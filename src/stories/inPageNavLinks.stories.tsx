import type { Meta, StoryObj } from '@storybook/react-vite';
import { InPageNavLinks as InPageNavLinksComp } from '../component/in-page-navigation/inPageNavLinks';

const meta: Meta<typeof InPageNavLinksComp> = {
  title: 'Navigation/Inpage Nav Links',
  component: InPageNavLinksComp,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InPageNavLinksComp>;

export const InPageNavLinks: Story = {
  args: {
    title: 'On this page',
    links: [
      {
        url: '/',
        title: 'First home buyer grant and assistance',
      },
      {
        url: '/',
        title: 'Buying and selling property',
      },
      {
        url: '/',
        title: 'Building or renovating a home',
      },
      {
        url: '/',
        title: 'Aged care housing, home living assistance and retirement villages',
      },
    ],
  },
};
