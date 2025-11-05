import 'nsw-design-system/dist/css/main.css'
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { create } from 'storybook/theming';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    options: MINIMAL_VIEWPORTS,
  },
  viewMode: 'docs',
}
