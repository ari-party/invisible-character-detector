import { expect, test } from 'bun:test';

import hasInvisibleCharacters from './index';

test('SOFT HYPHEN', () => {
  expect(hasInvisibleCharacters('hello w­orld')).toStrictEqual(['SOFT HYPHEN']);
});

test('WORD JOINER & SOFT HYPHEN', () => {
  expect(hasInvisibleCharacters('h⁠ello w­orld')).toStrictEqual([
    'WORD JOINER',
    'SOFT HYPHEN',
  ]);
});

test('NOTHING', () => {
  expect(hasInvisibleCharacters()).toStrictEqual([]);
});
