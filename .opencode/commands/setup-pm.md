---
description: Configure package manager for OpenCode project
---
# /setup-pm - Configure Package Manager

This command invokes the **package manager setup** skill to detect and configure your preferred package manager.

## What This Command Does

1. **Detect Current PM** - Check which package manager is available
2. **Set Preferred PM** - Configure npm, pnpm, yarn, or bun
3. **Create Config Files** - Generate necessary configuration
4. **Ensure Consistency** - Make project use consistent PM

## When to Use

- New project setup
- Changing package managers
- When PM detection fails
- On fresh checkout
- Team standardization

## How It Works

The setup-pm skill will:

1. **Detect Available PMs**:
   - Check environment variable `CLAUDE_PACKAGE_MANAGER`
   - Check `.claude/package-manager.json`
   - Check `package.json` `packageManager` field
   - Check lock files (package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb)
   - Check global config `~/.claude/package-manager.json`
   - Fallback: First available PM

2. **Set Configuration**:
   - Create `.claude/package-manager.json` with selected PM
   - Update `package.json` if needed
   - Generate appropriate lock file

3. **Provide Setup Commands**:
   - How to install dependencies with new PM
   - Any migration steps needed
   - Verification commands

## Package Manager Priority

```text
1. Environment variable: CLAUDE_PACKAGE_MANAGER
2. Project config: .claude/package-manager.json
3. package.json: packageManager field
4. Lock file: Detection from lock files
5. Global config: ~/.claude/package-manager.json
6. Fallback: First available package manager
```

## Example Usage

```
User: /setup-pm pnpm

Agent (setup-pm):
# Package Manager Setup

### Detected Available PMs:
- npm: [yes/no]
- pnpm: [yes/no]
- yarn: [yes/no]
- bun: [yes/no]

### Selected: pnpm
- ✓ Available on system
- ✓ Will be used for this project

### Configuration Created:
- `.claude/package-manager.json` updated
- `package.json` updated with `"packageManager": "pnpm@latest"`

### Next Steps:
```bash
# Install dependencies
pnpm install

# Or for existing project:
pnpm update

# Verify
pnpm --version
```

## Integration

Package manager settings are stored in:
- `.claude/package-manager.json` (project level)
- `~/.claude/package-manager.json` (global level)
- `package.json` `packageManager` field

## Related Scripts

This invokes the `setup-package-manager` script located at:
`.opencode/scripts/setup-package-manager.js`