import { expect, test } from 'bun:test';

import hasInvisibleCharacters from '../dist/index';

test('SOFT HYPHEN', () => {
  expect(hasInvisibleCharacters('h­ello world')).toStrictEqual(['SOFT HYPHEN']);

  expect(hasInvisibleCharacters('­hello­ ­world­')).toStrictEqual([]);
});

test('ZERO WIDTH JOINER', () => {
  expect(hasInvisibleCharacters('h‍ello world')).toStrictEqual([
    'ZERO WIDTH JOINER',
  ]);

  expect(hasInvisibleCharacters('👐🏻')).toStrictEqual([]);
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

test('VARIATION SELECTOR-16', () => {
  expect(hasInvisibleCharacters('h️ello world')).toStrictEqual([
    'VARIATION SELECTOR-16',
  ]);

  expect(hasInvisibleCharacters('‼hello world‼')).toStrictEqual([]);

  expect(hasInvisibleCharacters('✋🏻🙂‍↕️')).toStrictEqual([]);

  expect(hasInvisibleCharacters('👨‍🦽')).toStrictEqual([]);

  expect(hasInvisibleCharacters('🏳️‍⚧️')).toStrictEqual([]);

  expect(hasInvisibleCharacters('‼️‼️‼️')).toStrictEqual([]);

  expect(hasInvisibleCharacters('♟️♟️')).toStrictEqual([]);

  expect(hasInvisibleCharacters('❤️❤️')).toStrictEqual([]);

  expect(hasInvisibleCharacters('🗣️🗣️')).toStrictEqual([]);

  expect(hasInvisibleCharacters('9️⃣')).toStrictEqual([]);
});

test('NOTHING', () => {
  expect(hasInvisibleCharacters('hello world')).toStrictEqual([]);
});
