import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Tabs, { TabItemWrapper, TabItem, TabSection } from '../component/tabs/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Content/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs>
      <TabItemWrapper>
        <TabItem title="New and existing home" urlHash="tab1" />
        <TabItem title="Vacant land" urlHash="tab2" />
      </TabItemWrapper>
      <TabSection urlHash="tab1">
        <h2>New and existing homes</h2>
        <p>Example content for tab 1</p>
      </TabSection>
      <TabSection urlHash="tab2">
        <h2>Vacant land</h2>
        <p>Example content for tab 2</p>
      </TabSection>
    </Tabs>
  ),
};
