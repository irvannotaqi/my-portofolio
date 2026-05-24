/**
 * syntaxHighlight.ts
 * JSON tokeniser and syntax highlighter for displaying pretty-printed JSON
 * with colour-coded tokens in a terminal-like UI.
 *
 * The function is split into two layers:
 * 1. tokeniseJson() - pure, returns Token[] (no React dependency)
 * 2. syntaxHighlight() - thin wrapper that maps tokens → React <span> elements
 */

import React from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type TokenType = 'key' | 'string' | 'number' | 'boolean' | 'null' | 'punctuation' | 'whitespace';

export interface Token {
  value: string;
  type: TokenType;
}

// ============================================================================
// PURE TOKENISER (No React, fully testable)
// ============================================================================

/**
 * tokeniseJson
 * Walks a pretty-printed JSON string and classifies each token.
 * Returns an array of tokens without any React rendering.
 *
 * @param json - A JSON string (typically from JSON.stringify(data, null, 2))
 * @returns Array of Token objects with value and type
 */
export function tokeniseJson(json: string): Token[] {
  const tokenRegex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}[\],:])/g;

  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(json)) !== null) {
    const tokenValue = match[0];
    const start = match.index;

    // Push any whitespace/newlines between tokens
    if (start > lastIndex) {
      const whitespace = json.slice(lastIndex, start);
      if (whitespace) {
        tokens.push({
          value: whitespace,
          type: 'whitespace',
        });
      }
    }

    // Classify token
    let type: TokenType = 'punctuation';

    if (/^"/.test(tokenValue)) {
      if (/:$/.test(tokenValue)) {
        type = 'key';
      } else {
        type = 'string';
      }
    } else if (/true|false/.test(tokenValue)) {
      type = 'boolean';
    } else if (/null/.test(tokenValue)) {
      type = 'null';
    } else if (/^-?\d/.test(tokenValue)) {
      type = 'number';
    }

    tokens.push({
      value: tokenValue,
      type,
    });

    lastIndex = start + tokenValue.length;
  }

  // Trailing whitespace
  if (lastIndex < json.length) {
    tokens.push({
      value: json.slice(lastIndex),
      type: 'whitespace',
    });
  }

  return tokens;
}

// ============================================================================
// COLOUR MAPPING (Tailwind classes)
// ============================================================================

function getColourClass(type: TokenType): string {
  switch (type) {
    case 'key':
      return 'text-sky-400';
    case 'string':
      return 'text-emerald-400';
    case 'number':
      return 'text-amber-400';
    case 'boolean':
      return 'text-rose-400';
    case 'null':
      return 'text-rose-300';
    case 'punctuation':
      return 'text-slate-400';
    case 'whitespace':
    default:
      return '';
  }
}

// ============================================================================
// REACT RENDERER (Thin wrapper)
// ============================================================================

/**
 * syntaxHighlight
 * Takes a JSON string and returns an array of React nodes with colour-coded spans.
 * Uses tokeniseJson() internally.
 *
 * @param json - A JSON string
 * @returns Array of React.ReactNode with <span> elements for each token
 */
export function syntaxHighlight(json: string): React.ReactNode[] {
  const tokens = tokeniseJson(json);

  return tokens.map((token, idx) => {
    const colourClass = getColourClass(token.type);

    if (!colourClass) {
      // Whitespace: render as plain text
      return token.value;
    }

    return React.createElement(
      'span',
      { key: idx, className: colourClass },
      token.value
    );
  });
}
