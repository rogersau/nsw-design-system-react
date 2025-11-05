# Migration Checklist

Quick reference checklist for tracking migration progress.

## Phase 1: Foundation Setup ⬜

### Repository Preparation
- [ ] Create feature branch: `feat/modernization`
- [ ] Document current build process
- [ ] Create baseline test coverage report
- [ ] Set up CI/CD validation

### TypeScript Infrastructure
- [ ] Install TypeScript: `pnpm add -D typescript @types/react @types/react-dom @types/node`
- [ ] Create `tsconfig.json`
- [ ] Install build tool: `pnpm add -D tsup` (or Rollup alternative)
- [ ] Update package.json scripts
- [ ] Test TypeScript compiles

**Validation:** `tsc --noEmit` runs without errors (even with no TS files)

---

## Phase 2: React 18 Upgrade ⬜

### Dependencies
- [ ] Update React: `pnpm add react@^18.3.1 react-dom@^18.3.1`
- [ ] Update types: `pnpm add -D @types/react@^18.3.1 @types/react-dom@^18.3.1`
- [ ] Update testing libs: `pnpm add -D @testing-library/react@^14.0.0`
- [ ] Update peer dependencies in package.json

### Code Changes
- [ ] Update `example/src/index.js`: ReactDOM.render → createRoot
- [ ] Test all components with React 18
- [ ] Fix Strict Mode warnings
- [ ] Update useEffect cleanup patterns

### Validation
- [ ] All tests pass
- [ ] Example app runs
- [ ] No console warnings
- [ ] Storybook still works (if working)

---

## Phase 3: TypeScript Migration ⬜

### Batch 1: Simple Components (Week 3-4)
- [ ] Button
- [ ] Alert
- [ ] Breadcrumbs
- [ ] Callout
- [ ] Tags
- [ ] Link List
- [ ] Section

### Batch 2: Form Components (Week 4-5)
- [ ] FormText
- [ ] FormCheckbox
- [ ] FormRadio
- [ ] FormSelect
- [ ] ProgressIndicator
- [ ] Form group elements

### Batch 3: Complex Components (Week 5-6)
- [ ] Accordion
- [ ] Tabs
- [ ] Table
- [ ] Pagination
- [ ] Header/Masthead
- [ ] Footer
- [ ] MainNav
- [ ] HeroBanner
- [ ] Card
- [ ] Media
- [ ] InPageNavLinks
- [ ] ContentBlock
- [ ] GlobalAlert

### Infrastructure
- [ ] Rename `src/index.js` → `src/index.ts`
- [ ] Export all component types
- [ ] Update test files to `.test.tsx`
- [ ] Configure Jest for TypeScript
- [ ] Update ESLint config
- [ ] Remove all PropTypes dependencies

### Validation
- [ ] `tsc --noEmit` passes
- [ ] All tests pass
- [ ] Build produces `.d.ts` files
- [ ] No `any` types (or <5%)

---

## Phase 4: Storybook 8 Migration ⬜

### Automated Upgrade
- [ ] Run: `pnpm dlx storybook@latest upgrade`
- [ ] Review changes
- [ ] Fix issues

### Configuration
- [ ] Update `.storybook/main.js` → `.storybook/main.ts`
- [ ] Update `.storybook/preview.js` → `.storybook/preview.ts`
- [ ] Update `.storybook/manager.js` → `.storybook/manager.ts`
- [ ] Configure Vite builder
- [ ] Update addons
- [ ] Check HTML addon compatibility

### Stories - Batch 1 (Week 7)
- [ ] Button stories
- [ ] Alert stories
- [ ] Breadcrumb stories
- [ ] Callout stories
- [ ] Card stories
- [ ] Section stories
- [ ] Tags stories
- [ ] Link List stories

### Stories - Batch 2 (Week 7-8)
- [ ] Form stories (all)
- [ ] Accordion stories
- [ ] Tabs stories
- [ ] Table stories
- [ ] Pagination stories
- [ ] Header stories
- [ ] Footer stories
- [ ] Navigation stories
- [ ] Hero Banner stories
- [ ] Media stories
- [ ] Content Block stories
- [ ] Global Alert stories
- [ ] InPage Nav stories

### Story Format
- [ ] All stories use CSF 3.0
- [ ] All stories have TypeScript types
- [ ] All stories have `tags: ['autodocs']`
- [ ] ArgTypes defined for complex props
- [ ] No Template pattern (deprecated)

### Validation
- [ ] `pnpm storybook` runs
- [ ] All stories render
- [ ] Controls work
- [ ] Autodocs generate
- [ ] `pnpm build-storybook` succeeds

---

## Phase 5: Build & Tooling ⬜

### Build Configuration
- [ ] Configure tsup/Rollup
- [ ] Set up ESM + CJS outputs
- [ ] Enable sourcemaps
- [ ] Configure tree-shaking
- [ ] Optimize bundle size

### Scripts
- [ ] Update build script
- [ ] Update dev script
- [ ] Update test script
- [ ] Update lint script

### Validation
- [ ] Build completes
- [ ] ESM bundle works
- [ ] CJS bundle works
- [ ] Type declarations generated
- [ ] Bundle size acceptable

---

## Phase 6: Documentation ⬜

### Core Documentation
- [ ] Update README.md
- [ ] Create TypeScript usage guide
- [ ] Document breaking changes
- [ ] Create consumer migration guide
- [ ] Update contributing guidelines

### Examples
- [ ] Update example app to TypeScript
- [ ] Add TypeScript usage examples
- [ ] Update code samples

### Developer Experience
- [ ] Add `.vscode/settings.json`
- [ ] Add `.vscode/extensions.json`
- [ ] Add debugging configs
- [ ] Create troubleshooting guide

---

## Phase 7: Testing & Validation ⬜

### Testing
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] Visual regression tests
- [ ] Build tests (ESM/CJS)
- [ ] Type tests
- [ ] Browser compatibility tests

### Package Testing
- [ ] Create test consuming app
- [ ] Test npm install
- [ ] Test type definitions
- [ ] Test tree-shaking
- [ ] Verify bundle sizes

### Bug Fixes
- [ ] Fix all type errors
- [ ] Fix test failures
- [ ] Fix Storybook issues
- [ ] Fix build issues
- [ ] Address feedback

---

## Phase 8: Release ⬜

### Version Planning
- [ ] Decide version: `2.0.0`
- [ ] Write changelog
- [ ] Document breaking changes
- [ ] Update package.json version

### Release Assets
- [ ] Build final package
- [ ] Generate type declarations
- [ ] Create release notes
- [ ] Write migration guide for consumers

### Pre-release
- [ ] Publish beta: `2.0.0-beta.1`
- [ ] Test beta in real project
- [ ] Gather feedback
- [ ] Fix critical issues

### Release
- [ ] Tag release: `v2.0.0`
- [ ] Publish to npm
- [ ] Deploy Storybook
- [ ] Update documentation
- [ ] Announce release

---

## Quality Gates

### After Each Phase
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Documentation updated
- [ ] Code reviewed

### Before Release
- [ ] Test coverage ≥ current
- [ ] Bundle size ≤ current
- [ ] Performance ≥ current
- [ ] All docs updated
- [ ] Migration guide complete

---

## Rollback Points

- **After Phase 1:** Can abandon TypeScript
- **After Phase 2:** Can stay on React 18 with JS
- **After Phase 3:** Can release v2.0 without Storybook
- **After Phase 4:** Can release without build optimization

---

## Quick Commands

```bash
# TypeScript
pnpm add -D typescript @types/react @types/react-dom @types/node
tsc --noEmit

# React 18
pnpm add react@^18.3.1 react-dom@^18.3.1
pnpm add -D @types/react@^18.3.1 @types/react-dom@^18.3.1

# Storybook 8
pnpm dlx storybook@latest upgrade

# Build
pnpm add -D tsup
pnpm build

# Test
pnpm test
pnpm test:coverage

# Lint
pnpm lint
pnpm lint:fix
```

---

## Progress Tracking

**Overall Progress:** 0/8 phases complete

- [ ] Phase 1: Foundation (0%)
- [ ] Phase 2: React 18 (0%)
- [ ] Phase 3: TypeScript (0%)
- [ ] Phase 4: Storybook 8 (0%)
- [ ] Phase 5: Build Tools (0%)
- [ ] Phase 6: Documentation (0%)
- [ ] Phase 7: Testing (0%)
- [ ] Phase 8: Release (0%)

**Current Phase:** Planning  
**Next Milestone:** Foundation Setup  
**Target Release:** TBD
