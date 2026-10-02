---
description: Run verification loop for implemented features
---
# /verify - Run Verification Loop

This command invokes the **verify** agent to run verification loops and validate implementation.

## What This Command Does

1. **Run Verification Tests** - Execute test suite
2. **Check Coverage** - Verify test coverage meets thresholds
3. **Validate Requirements** - Confirm all requirements are met
4. **Identify Gaps** - Surface any missing test cases or validations
5. **Provide Report** - Comprehensive verification results

## When to Use

- After implementing a feature
- Before commits/PRs
- When verifying bug fixes
- During code review process
- Regular quality checks

## How It Works

The verify agent will:

1. **Run the test suite** - `npm test` or equivalent
2. **Capture results**:
   - Tests passed/failed
   - Coverage percentage
   - Any failures or errors
   - Performance metrics if applicable

3. **Analyze coverage** - Compare against 80%+ threshold
4. **Identify gaps** - Missing test cases, untested paths
5. **Check requirements** - Verify all planned requirements implemented
6. **Generate report** - Detailed verification results

## Report Format

```markdown
# Verification Report

## Test Results
- **Tests run**: [number]
- **Passed**: [number]
- **Failed**: [number]
- **Skipped**: [number]

## Coverage
- **Overall**: [percentage]%
- **Threshold**: 80%+
- **Status**: ✅ Pass / ❌ Needs improvement

## Requirements Validation
- [ ] Requirement 1: [status]
- [ ] Requirement 2: [status]
- [ ] Requirement 3: [status]

## Issues Found
- [List any issues, failures, gaps]

## Recommendations
- [Action items to address issues]
```

## Integration with Other Commands

- Use `/plan` before implementation
- Use `/tdd` during implementation
- Use `/code-review` after implementation
- Use `/checkpoint` to save state between sessions

## Related Agents

This command invokes the `verify` agent located at:
`.opencode/agents/verify.md` (if exists) or uses built-in verification