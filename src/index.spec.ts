import { expect, test } from 'bun:test';

import hasInvisibleCharacters from '../dist/index';

test('SOFT HYPHEN', () => {
  expect(hasInvisibleCharacters('hello w­orld')).toStrictEqual(['SOFT HYPHEN']);
});

test('SOFT HYPHEN SUFFIX', () => {
  expect(hasInvisibleCharacters('hello world­')).toStrictEqual(['SOFT HYPHEN']);
});

test('WORD JOINER & SOFT HYPHEN', () => {
  expect(hasInvisibleCharacters('h⁠ello w­orld')).toStrictEqual([
    'WORD JOINER',
    'SOFT HYPHEN',
  ]);
});

test('TAG DIGIT NINE', () => {
  expect(hasInvisibleCharacters('h󠀹ello world')).toStrictEqual([
    '<unknown-db40>',
    '<unknown-dc39>',
  ]);
});

test('🗣️🗣️', () => {
  expect(hasInvisibleCharacters('🗣️🗣️')).toStrictEqual([]);
});

test('❤️❤️', () => {
  expect(hasInvisibleCharacters('❤️❤️')).toStrictEqual([]);
});

test('♟️♟️', () => {
  expect(hasInvisibleCharacters('♟️♟️')).toStrictEqual([]);
});

test('‼️‼️‼️', () => {
  expect(hasInvisibleCharacters('‼️‼️‼️')).toStrictEqual([]);
});

test('🏳️‍⚧️', () => {
  expect(hasInvisibleCharacters('🏳️‍⚧️')).toStrictEqual([]);
});

test('👨‍🦽', () => {
  expect(hasInvisibleCharacters('👨‍🦽')).toStrictEqual([]);
});

test('VARIATION SELECTOR-16', () => {
  expect(hasInvisibleCharacters('h️ello world')).toStrictEqual([
    'VARIATION SELECTOR-16',
  ]);
});

test('NOTHING', () => {
  expect(hasInvisibleCharacters('hello world')).toStrictEqual([]);
});
