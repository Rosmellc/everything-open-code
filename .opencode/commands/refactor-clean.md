---
description: Dead code removal and refactoring
---
# /refactor-clean - Dead Code Removal

This command invokes the **refactor-cleaner** agent to remove dead code and improve code structure.

## What This Command Does

1. **Analyze Codebase** - Scan for dead code, unused imports, deprecated features
2. **Identify Removal Candidates** - Find code that can be safely removed
3. **Remove Dead Code** - Delete unused functions, variables, imports, components
4. **Verify Changes** - Run tests to ensure nothing broken
5. **Report Results** - What was removed and impact

## When to Use

- Code maintenance
- Before large refactors
- Reducing bundle size
- Technical debt cleanup
- Preparing for new features

## How It Works

The refactor-cleaner agent will:

1. **Scan the codebase** using Grep/Glob to find:
   - Unused imports
   - Unused exported functions/variables
   - Deprecated code
   - Commented-out code
   - Dead branches/conditions

2. **Present candidates** for removal with:
   - File paths
   - Code snippets
   - Risk assessment (Low/Medium/High)

3. **Apply removals** after your confirmation

4. **Run tests** to verify nothing broke

5. **Generate report** of what was cleaned

## Example Usage

```
User: /refactor-clean

Agent (refactor-cleaner):
# Refactoring Cleanup Session

### Dead Code Found: 5 items

1. **Unused import** in `src/utils/format.ts`
   - Line 1: `import { deprecatedFunction } from './old-module'`
   - Reason: `deprecatedFunction` not used anywhere
   - Risk: Low

2. **Unused function** in `src/api/client.ts:45`
   - Function: `fetchLegacyData()`
   - Reason: No callers found in codebase
   - Risk: Low

3. **Commented-out code** in `components/OldFeature.tsx`
   - Block from previous refactor
   - Risk: Low (explicitly commented)

4. **Unused variable** in `hooks/use-effects.ts:12`
   - Variable: `const ignoredValue = ...`
   - Reason: Never assigned/used
   - Risk: Very Low

5. **Dead branch** in `lib/validation.ts:88`
   - Condition never evaluates to true
   - Risk: Medium (may indicate logic issue)

### After Cleanup:
- Removed 5 dead code items
- Run tests: 15/15 passed
- Bundle size reduced by ~2KB

Would you like me to proceed with removing these items?
```