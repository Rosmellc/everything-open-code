---
description: Save verification state for later continuation
---
# /checkpoint - Save Verification State

This command invokes the **checkpoint** skill to save the current session state for later resumption.

## What This Command Does

1. **Capture Current State** - Save where you are in the current task
2. **Preserve Context** - Save progress, decisions, remaining work
3. **Enable Resumption** - Return to exact point later
4. **Prevent Loss** - Avoid losing progress between sessions

## When to Use

- Before taking a break
- When switching to another task
- Before risky operations
- When session time is limited
- When context might be lost

## How It Works

The checkpoint agent will:

1. **Capture session context**:
   - Current task and progress
   - Files being modified
   - Decisions made so far
   - Remaining steps
   - Any blockers or questions

2. **Save as checkpoint file** - in `.opencode/checkpoints/` or specified location

3. **Provide resumption instructions** - how to get back to this state

## Example Checkpoint

```
# Checkpoint: User Authentication Feature
- **Progress**: 3/5 phases complete
- **Current file**: `src/auth/middleware.ts`
- **Next step**: Implement token refresh logic
- **Decisions made**: Using JWT with refresh tokens
- **Blockers**: Awaiting API specification
- **Last test run**: 12/12 passed
```

## Resumption

To resume from a checkpoint:
- Use `/resume-checkpoint` command
- Or reference the checkpoint file name
- Agent will restore context and continue

## Integration

Checkpoints are stored in:
- `.opencode/checkpoints/`
- Can be configured in `opencode.json`
- Automatic checkpointing available via hook configuration

## Related Skills

This invokes the `checkpoint` skill located at:
`.opencode/skills/continuous-learning/checkpoint/`