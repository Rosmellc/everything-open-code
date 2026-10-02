---
description: Quality review of code changes
---
# /code-review - Code Quality Review

This command invokes the **code-reviewer** agent to review code for quality, security, and maintainability.

## What This Command Does

1. **Analyze Code** - Review recently modified files
2. **Check Quality** - Readability, structure, patterns
3. **Identify Issues** - Security, performance, maintainability
4. **Provide Recommendations** - Specific fixes and improvements
5. **Final Verdict** - Approve, request changes, or request major rewrite

## When to Use

- After writing code
- Before commits
- Before PRs
- When fixing bugs
- Before merging

## How It Works

The code-reviewer agent will:

1. **Read the modified files** 
2. **Analyze against project standards**
3. **Check security practices**
4. **Identify code smells**
5. **Review test coverage**
6. **Assess performance implications**
7. **Provide detailed report**
8. **Make final recommendation**

## Report Format

```markdown
# Code Review: [file/path]

## Summary
Brief overview of code quality.

## Strengths
- What is well done

## Issues
### Critical
- [security, data loss risk]
### High
- [maintainability, readability]
### Medium
- [style, performance]
### Low
- [cosmetic, minor]

## Recommendations
- Specific fixes for each issue
- Refactoring suggestions
- Best practices to follow

## Final Verdict
- ✅ Approve
- 🔄 Request changes
- ⚠️ Request major rewrite
```

## Integration with Other Commands

- Use `/plan` before starting for complex features
- Use `/tdd` when implementing with test-driven development
- Use `/build-fix` if build errors occur during implementation

## Related Agents

This command invokes the `code-reviewer` agent located at:
`.opencode/agents/code-reviewer.md`