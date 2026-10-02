---
description: Fix build errors automatically
---
# /build-fix - Fix Build Errors

This command invokes the **build-error-resolver** agent to automatically fix build errors and compilation issues.

## What This Command Does

1. **Identify Build Errors** - Analyze the build output
2. **Determine Root Causes** - Find the source of each error
3. **Apply Fixes** - Fix errors minimally and correctly
4. **Verify Build** - Run build again to confirm fixes
5. **Check for Regressions** - Ensure no new errors introduced

## When to Use

- When build fails
- After code changes that break compilation
- Before commits/PRs
- When integrating new dependencies

## How It Works

The build-error-resolver agent will:

1. **Run the build command** and capture all errors
2. **Analyze each error** - type, location, cause
3. **Apply minimal fixes** - one error at a time
4. **Re-run build** - verify the fix works
5. **Continue until build passes**
6. **Run tests** - ensure nothing is broken
7. **Report** all fixes applied and remaining issues

## Common Fix Types

- TypeScript type errors
- Import/export issues
- Configuration problems
- Dependency conflicts
- Syntax errors

## Example Usage

```
User: /build-fix

Agent (build-error-resolver):
# Build Fix Session

### Errors Found: 3

1. **Error in src/utils.ts:15** - Missing type definition
   - Fix: Add proper type annotation
   - Verification: Build passes

2. **Error in routes/api.ts:22** - Unused import
   - Fix: Remove unused import
   - Verification: Build passes

3. **Error in components/Button.tsx:404** - JSX type mismatch
   - Fix: Update component signature
   - Verification: Build passes

### Final Status: Build successful ✅
### Tests: 12/12 passed
```

## Related Agents

This command invokes the `build-error-resolver` agent located at:
`.opencode/agents/build-error-resolver.md`