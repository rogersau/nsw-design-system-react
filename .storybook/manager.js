// .storybook/manager.js

import { addons } from '@storybook/manager-api';
import nswTheme from './nsw-theme';

addons.setConfig({
  theme: nswTheme,
});
