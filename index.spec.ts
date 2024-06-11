/* eslint-disable import/no-extraneous-dependencies */

import { describe, expect, test } from '@jest/globals';

import hasInvisibleCharacters from './index';

import type { DictionaryValue } from './index';

describe('invisible-character-detector', () => {
  test('SOFT HYPHEN', () => {
    expect(hasInvisibleCharacters('hello w­orld')).toStrictEqual([
      'SOFT HYPHEN',
    ] as DictionaryValue[]);
  });

  test('WORD JOINER & SOFT HYPHEN', () => {
    expect(hasInvisibleCharacters('h⁠ello w­orld')).toStrictEqual([
      'WORD JOINER',
      'SOFT HYPHEN',
    ] as DictionaryValue[]);
  });

  test('NOTHING', () => {
    expect(hasInvisibleCharacters()).toStrictEqual([] as DictionaryValue[]);
  });
});
