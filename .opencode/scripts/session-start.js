#!/usr/bin/env node
// Session start - Load context on OpenCode session start
// Adapted from Claude Code's session-start.js

const fs = require('fs');
const path = require('path');

const CLAUDE_DIR = '.claude';
const OPENCODE_DIR = '.opencode';
const CONTEXT_DIR = path.join(OPENCODE_DIR, 'contexts');

/**
 * Load session context from last session or create fresh context
 * This runs at the start of each OpenCode session
 */
function loadSessionContext() {
  const contextFile = path.join(OPENCODE_DIR, 'session-context.json');
  let context = {};

  try {
    if (fs.existsSync(contextFile)) {
      const data = fs.readFileSync(contextFile, 'utf-8');
      context = JSON.parse(data);
      console.log('[Session] Loaded previous session context');
    } else {
      console.log('[Session] No previous context found - starting fresh');
    }
  } catch (error) {
    console.error('[Session] Error loading context:', error.message);
    context = {};
  }

  return context;
}

/**
 * Save current session context for next session
 * Called at session end
 */
function saveSessionContext(context) {
  const contextFile = path.join(OPENCODE_DIR, 'session-context.json');
  try {
    fs.writeFileSync(contextFile, JSON.stringify(context, null, 2));
    console.log('[Session] Context saved for next session');
  } catch (error) {
    console.error('[Session] Error saving context:', error.message);
  }
}

/**
 * Initialize session - set up directories and check configuration
 */
function initializeSession() {
  console.log('[Session] Initializing OpenCode session...');

  // Ensure directories exist
  if (!fs.existsSync(OPENCODE_DIR)) {
    fs.mkdirSync(OPENCODE_DIR, { recursive: true });
  }

  if (!fs.existsSync(CONTEXT_DIR)) {
    fs.mkdirSync(CONTEXT_DIR, { recursive: true });
  }

  // Load existing context
  const context = loadSessionContext();

  // Check for any pending checkpoints or tasks
  const checkpointFile = path.join(OPENCODE_DIR, 'pending-checkpoint.json');
  if (fs.existsSync(checkpointFile)) {
    const checkpoint = JSON.parse(fs.readFileSync(checkpointFile, 'utf-8'));
    console.log('[Session] Pending checkpoint found:', checkpoint.task);
    // Could auto-resume or ask user
    fs.unlinkSync(checkpointFile);
  }

  return context;
}

/**
 * Hook: On session start - load context and set up environment
 */
function onSessionStart() {
  const context = initializeSession();

  // Log session information
  console.log('[Session] Session ID: ', new Date().toISOString());
  console.log('[Session] Working directory: ', process.cwd());

  // Output context for use in the session
  // This can be accessed via $context in prompts
  return context;
}

/**
 * Export functions for use as hook
 */
module.exports = {
  onSessionStart,
  saveSessionContext,
  loadSessionContext,
  initializeSession
};