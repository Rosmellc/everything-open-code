// Cross-platform utilities for OpenCode
// Adapted from everything-claude-code scripts/lib/utils.js

/**
 * Utility functions for OpenCode adaptation
 */

const fs = require('fs');
const path = require('path');

const OPENCODE_DIR = '.opencode';
const CLAUDE_DIR = '.claude';

/**
 * Detect preferred package manager
 * Priority: env > project config > package.json > lock file > global config > fallback
 */
function detectPackageManager() {
  // Check environment variable
  if (process.env.CLAUDE_PACKAGE_MANAGER) {
    return process.env.CLAUDE_PACKAGE_MANAGER;
  }

  // Check project config
  const projectConfigPath = path.join(OPENCODE_DIR, 'package-manager.json');
  if (fs.existsSync(projectConfigPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(projectConfigPath, 'utf-8'));
      return config.packageManager;
    } catch (e) {
      // ignore
    }
  }

  // Check package.json
  const packageJsonPath = path.join('package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      if (packageJson.packageManager) {
        return packageJson.packageManager;
      }
    } catch (e) {
      // ignore
    }
  }

  // Check lock files
  const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lockb'];
  for (const lockFile of lockFiles) {
    if (fs.existsSync(lockFile)) {
      // Return based on lock file type
      if (lockFile === 'bun.lockb') return 'bun';
      if (lockFile.includes('pnpm')) return 'pnpm';
      if (lockFile.includes('yarn')) return 'yarn';
      return 'npm';
    }
  }

  // Check global config
  const globalConfigPath = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'package-manager.json');
  if (fs.existsSync(globalConfigPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));
      return config.packageManager;
    } catch (e) {
      // ignore
    }
  }

  // Fallback: check which is available
  const available = ['npm', 'pnpm', 'yarn', 'bun'];
  for (const pm of available) {
    try {
      require('child_process').execSync(`which ${pm} || true`, { stdio: 'pipe' });
      return pm;
    } catch (e) {
      // not available, continue
    }
  }

  return 'npm'; // ultimate fallback
}

/**
 * Read MCP configuration and return enabled servers
 * @param {string} configPath - Path to mcp-servers.json
 * @returns {Object} Enabled MCP servers
 */
function readMCPConfig(configPath = 'mcp-servers.json') {
  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return config.mcpServers || {};
  } catch (e) {
    console.error('Error reading MCP config:', e.message);
    return {};
  }
}

/**
 * Get MCP server configuration by name
 * @param {string} serverName - Name of the MCP server
 * @returns {Object|undefined} Server config or undefined
 */
function getMCPServerConfig(serverName, configPath = 'mcp-servers.json') {
  const servers = readMCPConfig(configPath);
  return servers[serverName];
}

/**
 * Format file size to human readable
 * @param {number} bytes - File size in bytes
 * @returns {string} Human readable size
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Check if path matches any of the given patterns
 * @param {string} filePath - Path to check
 * @param {string|string[]} patterns - Glob patterns
 * @returns {boolean} Whether path matches
 */
function matchesPatterns(filePath, patterns) {
  if (!Array.isArray(patterns)) {
    patterns = [patterns];
  }

  // Simple glob matching - for production use micromatch or similar
  const basename = path.basename(filePath);

  return patterns.some(pattern => {
    // Handle simple * wildcard
    if (pattern === '**' || pattern === '*') {
      return true;
    }
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
      return regex.test(basename);
    }
    return basename === pattern;
  });
}

/**
 * Load session context from previous session
 * @returns {Object} Session context
 */
function loadSessionContext() {
  const contextPath = path.join(OPENCODE_DIR, 'session-context.json');
  try {
    if (fs.existsSync(contextPath)) {
      return JSON.parse(fs.readFileSync(contextPath, 'utf-8'));
    }
  } catch (e) {
    // ignore
  }
  return {};
}

/**
 * Save session context for next session
 * @param {Object} context - Context to save
 */
function saveSessionContext(context) {
  const contextPath = path.join(OPENCODE_DIR, 'session-context.json');
  try {
    fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));
  } catch (e) {
    console.error('Error saving session context:', e.message);
  }
}

/**
 * Get project root directory
 * @returns {string} Project root
 */
function getProjectRoot() {
  // Look for package.json or .git directory
  let current = process.cwd();
  
  while (current !== path.dirname(current)) {
    if (fs.existsSync(path.join(current, 'package.json')) || 
        fs.existsSync(path.join(current, '.git'))) {
      return current;
    }
    current = path.dirname(current);
  }
  
  return process.cwd();
}

/**
 * Export all utilities
 */
module.exports = {
  detectPackageManager,
  readMCPConfig,
  getMCPServerConfig,
  formatBytes,
  matchesPatterns,
  loadSessionContext,
  saveSessionContext,
  getProjectRoot
};