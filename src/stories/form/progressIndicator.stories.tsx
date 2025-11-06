import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressIndicator as ProgressIndicatorComponent } from '../../component/forms/progress-indicator/progressIndicator';

const meta: Meta<typeof ProgressIndicatorComponent> = {
  title: 'Forms and Transactions/Progress Indicator',
  component: ProgressIndicatorComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressIndicatorComponent>;

export const ProgressIndicator: Story = {
  args: {
    step: 3,
    of: 5,
  },
};
