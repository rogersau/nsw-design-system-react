# TypeScript Migration Plan

## Current State
- Pure JavaScript codebase (no TypeScript)
- PropTypes for runtime type checking
- React 17 with class components and functional components
- Build tool: microbundle-crl
- Test framework: react-scripts (Jest)

## Target State
- Full TypeScript implementation
- Type-safe component props and exports
- React 18 with TypeScript types
- Modern build tooling with TypeScript support

## Migration Strategy

### Phase 1: Setup TypeScript Infrastructure
**Estimated Time: 1-2 days**

1. **Install TypeScript dependencies**
   ```bash
   pnpm add -D typescript @types/react @types/react-dom @types/node
   pnpm add -D @types/prop-types
   ```

2. **Create tsconfig.json**
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "jsx": "react-jsx",
       "module": "ESNext",
       "moduleResolution": "bundler",
       "resolveJsonModule": true,
       "allowJs": true,
       "checkJs": false,
       "outDir": "./dist",
       "declaration": true,
       "declarationMap": true,
       "sourceMap": true,
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true,
       "allowSyntheticDefaultImports": true,
       "isolatedModules": true
     },
     "include": ["src"],
     "exclude": ["node_modules", "dist", "example", "**/*.stories.tsx"]
   }
   ```

3. **Update build tooling**
   - Replace microbundle-crl with modern bundler (Rollup or tsup)
   - Option A: Use `tsup` (recommended for simplicity)
     ```bash
     pnpm add -D tsup
     ```
   - Option B: Use Rollup with TypeScript plugin
     ```bash
     pnpm add -D rollup @rollup/plugin-typescript @rollup/plugin-node-resolve @rollup/plugin-commonjs
     ```

4. **Update package.json scripts**
   ```json
   {
     "scripts": {
       "build": "tsup src/index.ts --format esm,cjs --dts --clean",
       "dev": "tsup src/index.ts --format esm,cjs --dts --watch"
     },
     "main": "./dist/index.js",
     "module": "./dist/index.mjs",
     "types": "./dist/index.d.ts",
     "exports": {
       ".": {
         "import": "./dist/index.mjs",
         "require": "./dist/index.js",
         "types": "./dist/index.d.ts"
       }
     }
   }
   ```

### Phase 2: Incremental Component Migration
**Estimated Time: 2-3 weeks**

**Migration Order (recommended):**
1. Utility functions and helpers first
2. Simple presentational components (Button, Alert)
3. Form components (FormText, FormCheckbox, etc.)
4. Complex components (Accordion, Tabs, Table)
5. Layout components (Header, Footer, Section)
6. Composite components (HeroBanner, Card)

**Per-Component Migration Steps:**

1. **Rename file**: `component.js` → `component.tsx`
2. **Define interfaces** for props:
   ```typescript
   export interface ButtonProps {
     linkComponent?: React.ElementType | 'a';
     link?: string;
     children: React.ReactNode;
     style?: 'primary' | 'dark-outline' | 'dark-outline-solid' | 'light' | 'light-outline' | 'danger';
     type?: 'button' | 'submit' | 'reset';
     block?: boolean;
     className?: string;
   }
   ```
3. **Remove PropTypes** imports and definitions
4. **Add TypeScript annotations** to function parameters
5. **Export types** from component files
6. **Update imports** across codebase

**Example Migration:**

Before (button.js):
```javascript
import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({
  linkComponent, link, children, style, type, block, className = '', ...attributeOptions
}) => {
  // implementation
};

Button.propTypes = {
  linkComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  link: PropTypes.string,
  children: PropTypes.node.isRequired,
  // ...
};
```

After (button.tsx):
```typescript
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  linkComponent?: React.ElementType | 'a';
  link?: string;
  children: React.ReactNode;
  style?: 'primary' | 'dark-outline' | 'dark-outline-solid' | 'light' | 'light-outline' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  block?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  linkComponent, 
  link, 
  children, 
  style = 'primary', 
  type = 'button', 
  block, 
  className = '', 
  ...attributeOptions
}) => {
  // implementation
};
```

### Phase 3: Update Index and Exports
**Estimated Time: 1 day**

1. **Rename**: `src/index.js` → `src/index.ts`
2. **Update all exports** to include type exports:
   ```typescript
   export { Button } from './component/button/button';
   export type { ButtonProps } from './component/button/button';
   ```

### Phase 4: Testing Updates
**Estimated Time: 2-3 days**

1. **Update test files**: Rename `.test.js` → `.test.tsx`
2. **Install testing type definitions**:
   ```bash
   pnpm add -D @testing-library/react @testing-library/jest-dom @types/jest
   ```
3. **Update test imports and assertions** with proper types
4. **Configure Jest** to handle TypeScript:
   ```json
   {
     "jest": {
       "preset": "ts-jest",
       "testEnvironment": "jsdom",
       "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"]
     }
   }
   ```

### Phase 5: Validation and Cleanup
**Estimated Time: 2-3 days**

1. **Run TypeScript compiler**: `pnpm tsc --noEmit`
2. **Fix all type errors** progressively
3. **Remove all PropTypes** dependencies
4. **Update eslint configuration** for TypeScript:
   ```bash
   pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```
5. **Update .eslintrc**:
   ```json
   {
     "parser": "@typescript-eslint/parser",
     "plugins": ["@typescript-eslint"],
     "extends": [
       "eslint:recommended",
       "plugin:@typescript-eslint/recommended",
       "plugin:react/recommended",
       "plugin:react-hooks/recommended"
     ]
   }
   ```

## Risk Mitigation

### Challenges
1. **Breaking changes** in prop interfaces
2. **Generic components** with flexible prop types
3. **Third-party type definitions** may be incomplete
4. **Build process** changes may affect consumers

### Solutions
1. **Maintain backward compatibility** where possible
2. **Use utility types** (`Partial<>`, `Pick<>`, `Omit<>`) for flexibility
3. **Create custom type definitions** for untyped dependencies
4. **Semantic versioning**: Bump to v2.0.0 for breaking changes
5. **Provide migration guide** for consumers

## Success Criteria
- [ ] All components converted to TypeScript
- [ ] Zero TypeScript compilation errors
- [ ] All tests passing
- [ ] Type definitions exported for consumers
- [ ] Build produces valid .d.ts files
- [ ] Documentation updated

## Dependencies
- Must complete before Storybook migration (Storybook 8 has better TS support)
- Should align with React 18 migration for modern typing
