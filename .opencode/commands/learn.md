---
description: Extract patterns mid-session for OpenCode
---
# /learn - Extract Patterns Mid-Session

This command invokes the **continuous-learning** skill to extract patterns from your current session for reuse.

## What This Command Does

1. **Analyze Current Session** - Review what you've been working on
2. **Identify Patterns** - Extract recurring solutions, patterns, conventions
3. **Create Reusable Skill** - Save the pattern as a reusable skill/command
4. **Store for Future Use** - Make it available for future sessions/projects

## When to Use

- When you solve a recurring problem
- When you create a useful utility or pattern
- When you want to avoid solving the same problem twice
- When establishing team conventions
- When onboarding to new projects

## How It Works

The learn agent will:

1. **Review your session activity** - what files you've read/edited, what tools you've used
2. **Identify recurring patterns** - common solutions, configurations, code structures
3. **Summarize the pattern** - clear description, when to use, example
4. **Save as a skill** - in `.opencode/skills/` directory
5. **Make available** for future sessions via `/use-skill` or automatic loading

## Example Patterns Extracted

- **Authentication middleware pattern** - reusable auth setup
- **API response handler** - standard error/success response format
- **Component library structure** - consistent component organization
- **Database query pattern** - reusable query builders
- **Error handling convention** - consistent error reporting

## Example Usage

```
User: /learn I just created a new error handling pattern

Agent (continuous-learning):
# Learning Session

## Patterns Identified

### Error Handling Pattern: CustomError Class
- **When to use**: Any time you need structured error handling
- **Example**:
```typescript
class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public success = false
  ) {
    super(message)
    this.name = 'CustomError'
  }
}
```

- **Usage**: `throw new CustomError('Not found', 404)`

### Usage
- Can now be invoked with `/use-skill error-handling`
- Available in future sessions automatically
- Can be shared across team projects

## Integration

Extracted skills are stored in:
- `.opencode/skills/continuous-learning/`
- Can be invoked via `/use-skill <skill-name>`
- Automatically loaded based on project context

## Related Skills

This invokes the `continuous-learning` skill located at:
`.opencode/skills/continuous-learning/`