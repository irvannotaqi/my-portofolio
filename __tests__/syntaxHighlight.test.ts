/**
 * syntaxHighlight.test.ts
 * Unit tests for the JSON tokeniser (tokeniseJson).
 *
 * We test the pure tokenisation layer, NOT the React renderer.
 * This ensures the tokeniser correctly classifies all JSON token types.
 */

import { describe, it, expect } from 'vitest';
import { tokeniseJson, type Token } from '../utils/syntaxHighlight';

// ============================================================================
// TEST SUITE
// ============================================================================

describe('tokeniseJson', () => {
  // ──────────────────────────────────────────────────────────────────────
  // TOKEN TYPE CLASSIFICATION TESTS
  // ──────────────────────────────────────────────────────────────────────

  it('should classify object keys correctly', () => {
    const json = '{\n  "name": "John"\n}';
    const tokens = tokeniseJson(json);

    // Find the "name": token
    const keyToken = tokens.find((t) => t.type === 'key');
    expect(keyToken).toBeDefined();
    expect(keyToken?.value).toBe('"name":');
  });

  it('should classify string values correctly', () => {
    const json = '{\n  "message": "Hello, World!"\n}';
    const tokens = tokeniseJson(json);

    // Find the "Hello, World!" string token (not the key)
    const stringTokens = tokens.filter((t) => t.type === 'string');
    expect(stringTokens.length).toBeGreaterThan(0);
    expect(stringTokens[0]?.value).toBe('"Hello, World!"');
  });

  it('should classify number tokens correctly', () => {
    const json = '{\n  "age": 42\n}';
    const tokens = tokeniseJson(json);

    // Find the 42 number token
    const numberToken = tokens.find((t) => t.type === 'number');
    expect(numberToken).toBeDefined();
    expect(numberToken?.value).toBe('42');
  });

  it('should classify boolean tokens correctly', () => {
    const json = '{\n  "active": true,\n  "deleted": false\n}';
    const tokens = tokeniseJson(json);

    // Find true and false tokens
    const boolTokens = tokens.filter((t) => t.type === 'boolean');
    expect(boolTokens.length).toBe(2);
    expect(boolTokens[0]?.value).toBe('true');
    expect(boolTokens[1]?.value).toBe('false');
  });

  it('should classify null tokens correctly', () => {
    const json = '{\n  "empty": null\n}';
    const tokens = tokeniseJson(json);

    // Find the null token
    const nullToken = tokens.find((t) => t.type === 'null');
    expect(nullToken).toBeDefined();
    expect(nullToken?.value).toBe('null');
  });

  // ──────────────────────────────────────────────────────────────────────
  // COMPLEX JSON TEST
  // ──────────────────────────────────────────────────────────────────────

  it('should tokenise a complex JSON object correctly', () => {
    const json = JSON.stringify(
      {
        name: 'Alice',
        age: 30,
        active: true,
        bio: null,
        tags: ['a', 'b'],
      },
      null,
      2
    );

    const tokens = tokeniseJson(json);

    // Should have at least one token of each type
    const types = new Set(tokens.map((t) => t.type));
    expect(types.has('key')).toBe(true);
    expect(types.has('string')).toBe(true);
    expect(types.has('number')).toBe(true);
    expect(types.has('boolean')).toBe(true);
    expect(types.has('null')).toBe(true);

    // Verify token count is reasonable (should be more than 5 tokens)
    expect(tokens.length).toBeGreaterThan(5);
  });
});
