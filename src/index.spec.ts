import { expect, test } from 'bun:test';

import findInvisibleCharacters, { Detection } from './index.ts';

function getRunenames(detections: Detection[]) {
  return detections.map((detection) => detection.runename);
}

test('SOFT HYPHEN', () => {
  expect(getRunenames(findInvisibleCharacters('h­ello world'))).toStrictEqual([
    'SOFT HYPHEN',
  ]);

  expect(
    getRunenames(findInvisibleCharacters('­hello­ ­world­')),
  ).toStrictEqual([]);
});

test('ZERO WIDTH JOINER', () => {
  expect(getRunenames(findInvisibleCharacters('h‍ello world'))).toStrictEqual([
    'ZERO WIDTH JOINER',
  ]);

  expect(findInvisibleCharacters('👐🏻')).toStrictEqual([]);
});

test('WORD JOINER & SOFT HYPHEN', () => {
  expect(getRunenames(findInvisibleCharacters('h⁠ello w­orld'))).toStrictEqual([
    'WORD JOINER',
    'SOFT HYPHEN',
  ]);
});

test('TAG DIGIT NINE', () => {
  expect(getRunenames(findInvisibleCharacters('h󠀹ello world'))).toStrictEqual([
    '<unknown-db40>',
    '<unknown-dc39>',
  ]);
});

test('VARIATION SELECTOR-16', () => {
  // these are tests that have shown false positives in production

  expect(getRunenames(findInvisibleCharacters('h️ello world'))).toStrictEqual([
    'VARIATION SELECTOR-16',
  ]);

  expect(
    getRunenames(findInvisibleCharacters('‼hello world‼')),
  ).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('✋🏻🙂‍↕️'))).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('👨‍🦽'))).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('🏳️‍⚧️'))).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('‼️‼️‼️'))).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('♟️♟️'))).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('❤️❤️'))).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('🗣️🗣️'))).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('9️⃣'))).toStrictEqual([]);

  expect(getRunenames(findInvisibleCharacters('🧍‍♂️AAAAAA'))).toStrictEqual([]);
});

test('NOTHING', () => {
  expect(getRunenames(findInvisibleCharacters('hello world'))).toStrictEqual(
    [],
  );
});
