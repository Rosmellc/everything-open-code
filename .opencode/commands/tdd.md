---
description: Test-driven development workflow
---
# /tdd - Test-Driven Development

This command invokes the **tdd-guide** agent to implement features using test-driven development.

## What This Command Does

1. **Define Interfaces** - Define the API/interfaces first
2. **Write Failing Tests (RED)** - Write minimal tests that fail
3. **Implement Minimal Code (GREEN)** - Write just enough to pass tests
4. **Refactor (IMPROVE)** - Clean up while tests pass
5. **Verify 80%+ Coverage** - Ensure adequate test coverage

## When to Use

- New features
- Bug fixes
- Refactoring with risk
- Critical path code

## How It Works

The tdd-guide agent will:

1. **Define interfaces** and API design
2. **Write failing tests** for the required functionality
3. **Run tests** to confirm they fail (RED)
4. **Implement minimum code** to make tests pass (GREEN)
5. **Refactor** the implementation
6. **Verify** test coverage is 80%+
7. **Report** results and remaining tasks

## Example Usage

```
User: /tdd Add user authentication middleware

Agent (tdd-guide):
# TDD Implementation: User Authentication

## Step 1: Define Interfaces
- Create auth middleware type definitions
- Define request/response interfaces

## Step 2: Write Failing Tests (RED)
```typescript
// tests/auth.middleware.test.ts
describe('Authentication Middleware', () => {
  it('should reject requests without token', () => {
    // test setup
  })
  
  it('should validate token successfully', () => {
    // test setup
  })
})
```
Run tests → Fail (RED)

## Step 3: Implement Minimal Code (GREEN)
- Create the middleware function
- Implement minimal authentication logic
- Run tests → Pass (GREEN)

## Step 4: Refactor (IMPROVE)
- Clean up code structure
- Add error handling
- Improve types
- Maintain test coverage

## Step 5: Verify Coverage
- Run coverage report
- Ensure 80%+ coverage
- Address any gaps

## Integration with Other Commands

- Use `/plan` before starting for complex features
- Use `/code-review` after implementation
- Use `/build-fix` if build errors occur

## Related Agents

This command invokes the `tdd-guide` agent located at:
`.opencode/agents/tdd-guide.md`
```

## Important Notes

**RED-GREEN-REFactor Cycle**: Always follow this order. Never implement code before writing tests.

**80% Coverage Rule**: Minimum threshold. Add tests until this is met before considering a feature complete.