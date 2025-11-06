# React Migration Plan (17 → 18)

## Current State
- React 17.0.2
- React DOM 17.0.2
- react-scripts 4.0.3
- Peer dependency: `^16.0.0` (outdated)

## Target State
- React 18.3.x (latest stable)
- React DOM 18.3.x
- Updated testing libraries
- Modern concurrent features support

## Migration Strategy

### Phase 1: Update Dependencies
**Estimated Time: 1 day**

1. **Update core React packages**
   ```bash
   pnpm add react@^18.3.1 react-dom@^18.3.1
   pnpm add -D @types/react@^18.3.1 @types/react-dom@^18.3.1
   ```

2. **Update peer dependencies in package.json**
   ```json
   {
     "peerDependencies": {
       "react": "^18.0.0",
       "react-dom": "^18.0.0"
     }
   }
   ```

3. **Update testing libraries**
   ```bash
   pnpm add -D @testing-library/react@^14.0.0
   pnpm add -D @testing-library/jest-dom@^6.0.0
   pnpm add -D @testing-library/user-event@^14.0.0
   ```

4. **Replace react-scripts** (if still using)
   - Consider migrating to Vite for faster builds
   - Or update to latest react-scripts 5.x (legacy)

### Phase 2: Update ReactDOM Rendering
**Estimated Time: 1 day**

#### Breaking Change: New Root API

**Before (React 17):**
```javascript
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

**After (React 18):**
```javascript
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Files to Update:**
- `example/src/index.js` → `example/src/index.tsx`
- Any demo or documentation files using ReactDOM.render

### Phase 3: Component Updates
**Estimated Time: 2-3 days**

#### 1. Remove deprecated APIs

**ReactDOM.render** → Use `createRoot`
**ReactDOM.hydrate** → Use `hydrateRoot`
**ReactDOM.unmountComponentAtNode** → Use `root.unmount()`

#### 2. Update Event Types (TypeScript)

React 18 has stricter event typing:
```typescript
// Before
const handleClick = (e) => { }

// After
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { }
```

#### 3. Component Type Updates

**Before:**
```typescript
const Button: React.FC<ButtonProps> = ({ children }) => { }
```

**After (recommended):**
```typescript
const Button = ({ children }: ButtonProps) => { }
// Or explicitly:
const Button = ({ children }: ButtonProps): JSX.Element => { }
```

**Note:** `React.FC` now excludes `children` by default. Be explicit.

#### 4. Update Class Component Lifecycle (if any)

No breaking changes for class components, but:
- `componentWillMount` → Use `componentDidMount` or `constructor`
- `componentWillReceiveProps` → Use `getDerivedStateFromProps`
- `componentWillUpdate` → Use `getSnapshotBeforeUpdate`

### Phase 4: Strict Mode Updates
**Estimated Time: 1 day**

React 18 Strict Mode is more aggressive:

1. **Double-invoking effects** in development
   - useEffect cleanup functions must be idempotent
   - Effects may run twice in dev mode

2. **Update useEffect patterns**:
   ```typescript
   // Ensure cleanup is safe
   useEffect(() => {
     const controller = new AbortController();
     
     fetchData(controller.signal);
     
     return () => controller.abort(); // Cleanup
   }, []);
   ```

3. **Check for state updates** on unmounted components
   - Add cleanup to prevent memory leaks

### Phase 5: Test Updates
**Estimated Time: 2-3 days**

#### 1. Update test rendering

**Before:**
```javascript
import { render } from '@testing-library/react';
render(<Button>Click</Button>);
```

**After (same API, updated library):**
```javascript
import { render } from '@testing-library/react';
render(<Button>Click</Button>);
```

No changes needed in most cases, but update library versions.

#### 2. Update async utilities

Use `waitFor` instead of deprecated `wait`:
```javascript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

#### 3. Update act() warnings

React 18 has automatic batching; fewer `act()` warnings expected.

### Phase 6: Enable Concurrent Features (Optional)
**Estimated Time: Ongoing**

After basic migration, consider adding:

#### 1. Suspense for data fetching
```typescript
import { Suspense } from 'react';

<Suspense fallback={<Loading />}>
  <ComponentThatFetches />
</Suspense>
```

#### 2. useTransition for non-urgent updates
```typescript
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchTerm(input); // Lower priority
});
```

#### 3. useDeferredValue for expensive renders
```typescript
import { useDeferredValue } from 'react';

const deferredValue = useDeferredValue(value);
```

## Breaking Changes Summary

### Critical Breaking Changes
1. **ReactDOM.render** removed → Use `createRoot`
2. **ReactDOM.hydrate** removed → Use `hydrateRoot`
3. **React.FC** no longer includes `children` implicitly
4. **IE 11** no longer supported (minimum: ES6)

### Behavioral Changes
1. **Automatic batching** for all updates (was only for React events)
2. **Stricter Strict Mode** in development
3. **useEffect** runs twice in dev with Strict Mode
4. **Consistent useEffect timing** (no more sync execution)

### Type Changes (TypeScript)
1. **`React.FC<Props>`** → `(props: Props) => JSX.Element`
2. **`children` not implicit** in React.FC
3. **Event types** more specific

## Testing Strategy

1. **Run full test suite** after dependency updates
2. **Test in Strict Mode** to catch issues early
3. **Check for console warnings** (React provides helpful migration warnings)
4. **Manual testing** of all components in Storybook
5. **Check for memory leaks** using React DevTools Profiler

## Compatibility Notes

### Backward Compatibility
- React 18 is mostly backward compatible
- Most React 17 code runs without changes
- Main issue: ReactDOM rendering API

### Forward Compatibility
- Prepare for React 19 features
- Consider Server Components (future)
- Modern hooks are stable

## Dependencies

- **Complements TypeScript migration**: Better type safety with React 18 types
- **Required before Storybook 8**: Storybook 8 requires React 18
- **Build tools may need updates**: Ensure bundler supports React 18

## Rollback Plan

If issues arise:
1. Revert package.json dependencies
2. Run `pnpm install`
3. Revert rendering API changes
4. Document specific incompatibilities

## Success Criteria

- [ ] React and ReactDOM updated to 18.x
- [ ] All rendering uses createRoot API
- [ ] No console warnings in development
- [ ] All tests passing
- [ ] Storybook renders all components
- [ ] Example app runs without errors
- [ ] Type checking passes (with TypeScript)
- [ ] No runtime errors in production build

## Resources

- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [React 18 Release Notes](https://react.dev/blog/2022/03/29/react-v18)
- [Automatic Batching](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#automatic-batching)
- [New Hooks Reference](https://react.dev/reference/react)
