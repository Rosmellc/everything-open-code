#!/usr/bin/env node
// Session end - Save state on OpenCode session end
// Adapted from Claude Code's session-end.js

const fs = require('fs');
const path = require('path');

const CLAUDE_DIR = '.claude';
const OPENCODE_DIR = '.opencode';
const CONTEXT_DIR = path.join(OPENCODE_DIR, 'contexts');

/**
 * Save session state at end of OpenCode session
 * Captures files modified, decisions made, etc.
 */
function saveSessionState() {
  const state = {
    timestamp: new Date().toISOString(),
    working_directory: process.cwd(),
    modified_files: getModifiedFiles(),
    session_duration: calculateDuration(),
    agents_used: getAgentsUsed(),
    commands_invoked: getCommandsInvoked()
  };

  const stateFile = path.join(OPENCODE_DIR, 'last-session-state.json');
  try {
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
    console.log('[Session] State saved successfully');
  } catch (error) {
    console.error('[Session] Error saving state:', error.message);
  }
}

/**
 * Get list of files modified in current session
 * (This would need integration with OpenCode's change tracking)
 */
function getModifiedFiles() {
  // In a real implementation, this would track changes via OpenCode hooks
  // For now, return empty or check for known patterns
  return [];
}

/**
 * Calculate session duration
 */
function calculateDuration() {
  // Would need session start time tracking
  return Date.now();
}

/**
 * Get agents used during session
 */
function getAgentsUsed() {
  // Would track agent invocations
  return [];
}

/**
 * Get commands invoked during session
 */
function getCommandsInvoked() {
  // Would track command usage
  return [];
}

/**
 * Hook: On session end - save state and suggest compaction
 */
function onSessionEnd() {
  saveSessionState();

  // Could trigger compaction suggestions here
  console.log('[Session] End of session - state preserved');
  console.log('[Session] Use /checkpoint to save current progress');
  console.log('[Session] Use /evaluate-session to extract patterns');

  // Output summary for user
  console.log('\n--- Session Summary ---');
  console.log('Files modified: Check .opencode/last-session-state.json');
  console.log('Use /checkpoint to save current task progress');
  console.log('----------------------------------------');
}

/**
 * Export functions for use as hook
 */
module.exports = {
  onSessionEnd,
  saveSessionState,
  getModifiedFiles,
  calculateDuration,
  getAgentsUsed,
  getCommandsInvoked
};