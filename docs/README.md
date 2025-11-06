# Migration Documentation

Comprehensive guides for modernizing the NSW Design System React library.

## 🚀 Start Here

**New to this migration?** → [Getting Started Guide](./getting-started.md)

## Overview

This folder contains detailed migration plans to upgrade the library from:
- **JavaScript → TypeScript**
- **React 17 → React 18**
- **Storybook 6.4 → Storybook 8.x**

## Documents

### 🎯 [Getting Started](./getting-started.md)
**Read this first!** Current problems, immediate actions, and decision guidance.

- Quick fixes for Storybook
- Migration decision matrix
- Debugging tips
- Next steps summary

### 📋 [Migration Roadmap](./migration-roadmap.md)
**Start here!** Executive overview with phased approach, timelines, and dependencies.

- 8-12 week timeline
- 8 distinct phases
- Risk assessment
- Resource requirements

### 🔷 [TypeScript Migration](./typescript-migration.md)
Detailed plan for converting JavaScript to TypeScript.

- Infrastructure setup
- Component conversion strategy
- Type definitions
- Testing updates
- Build tool changes

### ⚛️ [React Migration](./react-migration.md)
Guide for upgrading from React 17 to React 18.

- Dependency updates
- ReactDOM API changes
- Component updates
- Breaking changes
- Testing strategy

### 📚 [Storybook Migration](./storybook-migration.md)
Comprehensive guide for Storybook 6.4 → 8.x upgrade.

- Automated upgrade process
- Configuration migration
- CSF 3.0 story format
- Vite builder setup
- Addon compatibility

### ✅ [Checklist](./checklist.md)
Track progress through all migration phases.

- Phase-by-phase tasks
- Quality gates
- Quick commands
- Progress tracking

## Quick Start

```bash
# 1. Read the roadmap
cat docs/migration-roadmap.md

# 2. Set up TypeScript infrastructure
# Follow: docs/typescript-migration.md (Phase 1)

# 3. Update React
# Follow: docs/react-migration.md

# 4. Migrate components to TypeScript
# Follow: docs/typescript-migration.md (Phases 2-5)

# 5. Upgrade Storybook
# Follow: docs/storybook-migration.md
```

## Migration Order

```
TypeScript Setup → React 18 → TypeScript Migration → Storybook 8
       ↓              ↓              ↓                    ↓
    1-2 weeks     1-2 weeks     3-4 weeks           2-3 weeks
```

## Key Decisions

### Why TypeScript First?
- Better DX during migration
- Catch issues early
- Storybook 8 works better with TS
- React 18 types improve with TS

### Why React 18 Before Full TS Migration?
- React 18 has different type definitions
- Avoid double-migration of types
- Storybook 8 requires React 18
- Smaller, isolated change

### Why Storybook Last?
- Requires React 18
- Benefits from TypeScript completion
- Can validate entire migration

## Current Status

- [x] Documentation created
- [ ] Migration started
- [ ] TypeScript infrastructure
- [ ] React 18 upgrade
- [ ] Component migration
- [ ] Storybook upgrade
- [ ] Testing complete
- [ ] v2.0.0 released

## Breaking Changes

This migration will result in **v2.0.0** with breaking changes:

1. **Minimum React version**: 18.0.0
2. **TypeScript types**: Required for TS consumers
3. **Build output**: May change format
4. **Deprecated props**: May be removed
5. **Node.js version**: Minimum 18.x

## Support

For questions or issues during migration:

1. Check individual migration docs
2. Review breaking changes section
3. Test incrementally
4. Keep `master` branch stable

## Resources

- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Storybook 8 Migration](https://storybook.js.org/docs/migration-guide)
- [NSW Design System](https://www.digital.nsw.gov.au/design-system)
