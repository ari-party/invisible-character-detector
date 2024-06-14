import { expect, test } from 'bun:test';

import hasInvisibleCharacters from '../dist/index';

test('SOFT HYPHEN', () => {
  expect(hasInvisibleCharacters('hello w­orld')).toStrictEqual(['SOFT HYPHEN']);
});

test('WORD JOINER & SOFT HYPHEN', () => {
  expect(hasInvisibleCharacters('h⁠ello w­orld')).toStrictEqual([
    'WORD JOINER',
    'SOFT HYPHEN',
  ]);
});

test('TAG DIGIT NINE', () => {
  expect(hasInvisibleCharacters('h󠀹ello world')).toStrictEqual([
    'TAG DIGIT NINE',
  ]);
});

test('🗣️🗣️', () => {
  expect(hasInvisibleCharacters('🗣️🗣️')).toStrictEqual([]);
});

test('NOTHING', () => {
  expect(hasInvisibleCharacters('hello world')).toStrictEqual([]);
});
