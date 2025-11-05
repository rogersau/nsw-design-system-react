# Storybook Migration Plan (6.4 → 8.x)

## Current State
- Storybook 6.4.0
- React 17
- JavaScript stories
- Legacy configuration format
- Webpack-based
- Addons: actions, essentials, links, html, theming

## Target State
- Storybook 8.4.x (latest)
- React 18
- TypeScript stories (CSF 3.0)
- Vite-based (faster builds)
- Updated addon ecosystem
- Modern UI and features

## Migration Strategy

### Phase 1: Automated Upgrade
**Estimated Time: 1-2 days**

Storybook provides automated migration tools:

```bash
# Run Storybook upgrade
npx storybook@latest upgrade

# Or with pnpm
pnpm dlx storybook@latest upgrade
```

This will:
- Update dependencies
- Migrate configuration files
- Update story formats
- Install new addons

**Manual verification required after automation.**

### Phase 2: Update Dependencies Manually
**Estimated Time: 1 day**

If automated upgrade fails or needs customization:

1. **Remove old Storybook packages**
   ```bash
   pnpm remove @storybook/addon-actions @storybook/addon-essentials @storybook/addon-links @storybook/addons @storybook/react @storybook/theming
   pnpm remove @whitespace/storybook-addon-html
   ```

2. **Install Storybook 8**
   ```bash
   pnpm add -D storybook@^8.4.0
   pnpm add -D @storybook/react-vite@^8.4.0
   pnpm add -D @storybook/addon-essentials@^8.4.0
   pnpm add -D @storybook/addon-links@^8.4.0
   pnpm add -D @storybook/addon-interactions@^8.4.0
   pnpm add -D @storybook/blocks@^8.4.0
   ```

3. **Check addon compatibility**
   - `@whitespace/storybook-addon-html` may need update or replacement
   - Check for Storybook 8-compatible version

### Phase 3: Configuration Migration
**Estimated Time: 2-3 days**

#### 1. Update `.storybook/main.js` → `.storybook/main.ts`

**Before (6.4):**
```javascript
module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@whitespace/storybook-addon-html",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/theme",
  ]
}
```

**After (8.x with Vite):**
```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-interactions",
    // Check if HTML addon has v8 version or replace
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false, // Set to true after TS migration
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
```

#### 2. Update `.storybook/preview.js` → `.storybook/preview.ts`

**Before (6.4):**
```javascript
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
```

**After (8.x):**
```typescript
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

#### 3. Update `.storybook/manager.js` (if customizing UI)

Rename to `.storybook/manager.ts` and update imports:
```typescript
import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: themes.normal,
});
```

### Phase 4: Story Format Migration
**Estimated Time: 1-2 weeks**

Migrate all stories to CSF 3.0 (Component Story Format 3.0) with TypeScript.

#### Story Format Evolution

**CSF 2.0 (current - JavaScript):**
```javascript
import React from 'react';
import { Button } from '../component/button/button';

export default {
  title: 'Content/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
};
```

**CSF 3.0 (target - TypeScript):**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../component/button/button';

const meta: Meta<typeof Button> = {
  title: 'Content/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['primary', 'dark-outline', 'dark-outline-solid', 'light', 'light-outline', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const DarkOutline: Story = {
  args: {
    children: 'Button',
    style: 'dark-outline',
  },
};
```

#### Migration Steps per Story File

1. **Rename**: `*.stories.js` → `*.stories.tsx`
2. **Add type imports** from `@storybook/react`
3. **Remove Template pattern** (no longer needed)
4. **Add meta object** with proper typing
5. **Convert stories** to object format
6. **Add `tags: ['autodocs']`** for automatic documentation
7. **Define argTypes** for better controls

### Phase 5: MDX Documentation Updates
**Estimated Time: 2-3 days**

If using `.stories.mdx` files:

**Before (MDX 1):**
```mdx
import { Meta, Story, Canvas } from '@storybook/addon-docs/blocks';
import { Button } from '../component/button/button';

<Meta title="Content/Button" component={Button} />

# Button

<Canvas>
  <Story name="Primary">
    <Button>Click me</Button>
  </Story>
</Canvas>
```

**After (MDX 2 in Storybook 8):**
```mdx
import { Meta, Story, Canvas } from '@storybook/blocks';
import * as ButtonStories from './button.stories';

<Meta of={ButtonStories} />

# Button

<Canvas of={ButtonStories.Primary} />
```

Key changes:
- Import from `@storybook/blocks` (not addon-docs)
- Reference stories using `of={Stories.StoryName}`
- More composition-friendly

### Phase 6: Update Scripts
**Estimated Time: 1 day**

Update `package.json` scripts:

**Before:**
```json
{
  "scripts": {
    "storybook": "start-storybook -p 6006 --no-manager-cache",
    "build-storybook": "build-storybook"
  }
}
```

**After:**
```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

### Phase 7: Vite Configuration (if needed)
**Estimated Time: 1-2 days**

If using custom webpack config, migrate to Vite:

Create `.storybook/vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
```

### Phase 8: Addon Updates
**Estimated Time: 1-2 days**

#### Check addon compatibility:

1. **@whitespace/storybook-addon-html**
   - Check if v8-compatible version exists
   - Alternative: Use Storybook's built-in source code view
   - Or migrate to `@storybook/addon-docs` features

2. **Custom theme**
   - Update theme imports:
     ```typescript
     import { create } from '@storybook/theming/create';
     
     export default create({
       base: 'light',
       brandTitle: 'NSW Design System',
       // ... other options
     });
     ```

### Phase 9: Testing and Validation
**Estimated Time: 3-5 days**

1. **Visual regression testing**
   - Compare old vs new Storybook output
   - Check all stories render correctly

2. **Interaction testing** (new in Storybook 8)
   ```typescript
   import { within, userEvent } from '@storybook/testing-library';
   import { expect } from '@storybook/jest';
   
   export const ClickButton: Story = {
     args: {
       children: 'Click me',
     },
     play: async ({ canvasElement }) => {
       const canvas = within(canvasElement);
       const button = canvas.getByRole('button');
       await userEvent.click(button);
       await expect(button).toHaveClass('clicked');
     },
   };
   ```

3. **Documentation review**
   - Check autodocs generation
   - Verify controls work
   - Test argTypes

4. **Performance check**
   - Vite should be significantly faster
   - Compare build times

## Breaking Changes Summary

### Major Breaking Changes

1. **CLI commands changed**
   - `start-storybook` → `storybook dev`
   - `build-storybook` → `storybook build`

2. **Configuration format**
   - Must export default from config files
   - TypeScript recommended

3. **Addon API changes**
   - Many addon APIs updated
   - Some addons may be incompatible

4. **Story format**
   - CSF 3.0 is preferred
   - Templates no longer needed

5. **MDX format**
   - MDX 2 syntax required
   - Import paths changed

6. **Webpack → Vite**
   - Different build system
   - Different configuration approach

### Removed Features

- `@storybook/addons` package (use `@storybook/manager-api`)
- `@storybook/addon-docs/blocks` (use `@storybook/blocks`)
- Legacy decorators API
- Some deprecated parameters

## Troubleshooting Common Issues

### Issue: Storybook won't start

**Solution:**
1. Clear cache: `rm -rf node_modules/.cache`
2. Reinstall: `pnpm install`
3. Check Node version (need 18+)

### Issue: Stories not loading

**Solution:**
1. Check story glob patterns in `main.ts`
2. Verify file extensions match
3. Check for syntax errors in stories

### Issue: Addon not working

**Solution:**
1. Check addon version compatibility
2. Update addon to v8-compatible version
3. Check addon documentation for breaking changes

### Issue: TypeScript errors

**Solution:**
1. Install `@storybook/types`
2. Update `tsconfig.json` to include `.storybook`
3. Add type imports from correct packages

## Migration Checklist

- [ ] Run automated upgrade tool
- [ ] Update all Storybook packages to 8.x
- [ ] Migrate `main.js` → `main.ts`
- [ ] Migrate `preview.js` → `preview.ts`
- [ ] Update `manager.js` if needed
- [ ] Migrate all `.stories.js` → `.stories.tsx`
- [ ] Convert stories to CSF 3.0 format
- [ ] Update MDX files to MDX 2
- [ ] Update package.json scripts
- [ ] Test all stories render
- [ ] Verify controls work
- [ ] Check autodocs generation
- [ ] Test build command
- [ ] Update deployment scripts
- [ ] Clear old build artifacts

## Dependencies

- **Requires React 18**: Storybook 8 needs React 18
- **Benefits from TypeScript**: Better type safety and autocomplete
- **Vite recommended**: Faster than Webpack

## Success Criteria

- [ ] Storybook 8.x installed and running
- [ ] All stories render correctly
- [ ] No console errors
- [ ] Controls work for all components
- [ ] Autodocs generated
- [ ] Build completes successfully
- [ ] Faster dev/build times with Vite
- [ ] All addons functional

## Resources

- [Storybook 8.0 Migration Guide](https://storybook.js.org/docs/migration-guide)
- [CSF 3.0 Documentation](https://storybook.js.org/docs/api/csf)
- [Vite Builder Documentation](https://storybook.js.org/docs/builders/vite)
- [Storybook 8 Release Notes](https://storybook.js.org/blog/storybook-8/)
