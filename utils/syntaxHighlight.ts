/**
 * syntaxHighlight.ts
 * JSON tokeniser and syntax highlighter for displaying pretty-printed JSON
 * with colour-coded tokens in a terminal-like UI.
 *
 * Architecture:
 * 1. tokeniseJson() - pure tokeniser, returns Token[] (no React, fully testable)
 * 2. syntaxHighlight() - maps tokens → an HTML string with inline hex color styles
 *    Rendered via dangerouslySetInnerHTML in the <pre> block; input is HTML-escaped
 *    before processing to prevent injection. Inline styles bypass Tailwind JIT purging.
 */

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
 * Returns an array of tokens without any rendering logic.
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

    // Capture any whitespace/newlines between tokens
    if (start > lastIndex) {
      const whitespace = json.slice(lastIndex, start);
      if (whitespace) {
        tokens.push({ value: whitespace, type: 'whitespace' });
      }
    }

    // Classify token type
    let type: TokenType = 'punctuation';

    if (/^"/.test(tokenValue)) {
      type = /:$/.test(tokenValue) ? 'key' : 'string';
    } else if (/true|false/.test(tokenValue)) {
      type = 'boolean';
    } else if (/null/.test(tokenValue)) {
      type = 'null';
    } else if (/^-?\d/.test(tokenValue)) {
      type = 'number';
    }

    tokens.push({ value: tokenValue, type });
    lastIndex = start + tokenValue.length;
  }

  // Capture any trailing whitespace
  if (lastIndex < json.length) {
    tokens.push({ value: json.slice(lastIndex), type: 'whitespace' });
  }

  return tokens;
}

// ============================================================================
// HTML STRING RENDERER WITH INLINE HEX STYLES
// ============================================================================

/**
 * syntaxHighlight
 * Takes a pretty-printed JSON string and returns an HTML string with
 * colour-coded <span> elements using inline hex color styles.
 * Designed to be rendered via dangerouslySetInnerHTML inside a <pre> block.
 *
 * HTML-escapes the input before processing to prevent injection.
 * Inline styles bypass Tailwind JIT purging and guarantee browser paint.
 *
 * @param json - A JSON string (from JSON.stringify(data, null, 2))
 * @returns HTML string with inline <span style="color: #...;"> colour tokens
 */
export function syntaxHighlight(json: string | object): string {
  if (!json) return '';

  let jsonStr = typeof json !== 'string' ? JSON.stringify(json, null, 2) : json;

  // HTML-escape before processing to prevent injection
  jsonStr = jsonStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Robust JSON token matcher: keys, string values, booleans, nulls, numbers
  return jsonStr.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"\s*:)?("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    function (match) {
      // Using inline hex styles to guarantee presentation, bypassing Tailwind purging
      let style = 'color: #e2e8f0;'; // Default light gray (slate-200)

      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          // KEY: Force vibrant Amber (#fcd34d) with medium font-weight
          style = 'color: #fcd34d; font-weight: 500;';
          return '<span style="' + style + '">' + match.replace(':', '') + '</span><span style="color: #94a3b8;">:</span>';
        } else {
          // STRING VALUE: Force rich Emerald green (#34d399)
          style = 'color: #34d399;';
        }
      } else if (/true|false/.test(match)) {
        // Boolean values: Purple-400 (#c084fc)
        style = 'color: #c084fc;';
      } else if (/null/.test(match)) {
        // Null values: Zinc-500 (#71717a)
        style = 'color: #71717a;';
      } else {
        // Numeric values: Sky-400 (#38bdf8)
        style = 'color: #38bdf8;';
      }

      return '<span style="' + style + '">' + match + '</span>';
    }
  );
}
