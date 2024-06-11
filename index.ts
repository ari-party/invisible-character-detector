const dictionary = Object.freeze({
  173: 'SOFT HYPHEN',
  1564: 'ARABIC LETTER MARK',
  // 6158 'MONGOLIAN VOWEL SEPERATOR' is special and has own code below
  8236: 'POP DIRECTIONAL FORMATTING',
  8237: 'LEFT-TO-RIGHT OVERRIDE',
  8238: 'RIGHT-TO-LEFT OVERRIDE',
  8288: 'WORD JOINER',
  8289: 'FUNCTION APPLICATION',
  8290: 'INVISIBLE TIMES',
  8291: 'INVISIBLE SEPERATOR',
  8292: 'INVISIBLE PLUS',
  8294: 'LEFT-TO-RIGHT ISOLATE',
  8295: 'RIGHT-TO-LEFT ISOLATE',
  8296: 'FIRST STRONG ISOLATE',
  8297: 'POP DIRECTIONAL ISOLATE',
  // tag characters (U+E0020 to U+E007F) for some reason have this character when sent
  // (private use character)
  56128: 'HIGH SURROGATES',
  // deprecated characters, should not be used in messages
  8298: 'INHIBIT SYMMETRIC SWAPPING',
  8299: 'ACTIVATE SYMMETRIC SWAPPING',
  8300: 'INHIBIT ARABIC FORM SHAPING',
  8301: 'ACTIVATE ARABIC FORM SHAPING',
  8302: 'NATIONAL DIGIT SHAPES',
  8303: 'NOMINAL DIGIT SHAPES',
  917505: 'LANGUAGE TAG',
});

export type DictionaryValue = (typeof dictionary)[keyof typeof dictionary];

export default function hasInvisibleCharacters(
  text: string = '',
): DictionaryValue[] {
  const detectedValues: DictionaryValue[] = [];

  for (const word of text.split(' ')) {
    for (
      let characterIndex = 0;
      characterIndex < word.length;
      characterIndex += 1
    ) {
      const character = word.charAt(characterIndex);
      const codePoint = character.codePointAt(0) as
        | keyof typeof dictionary
        | undefined;
      if (!codePoint) continue;

      if (
        characterIndex !== 0 &&
        characterIndex !== word.length - 1 &&
        dictionary[codePoint]
      ) {
        detectedValues.push(dictionary[codePoint]);
        continue;
      }

      // @ts-expect-error U+180E (6158) is only allowed before U+1820 (6176) and U+1821 (6177)
      if (codePoint === 6158) {
        const characterName = 'MONGOLIAN VOWEL SEPARATOR' as DictionaryValue;

        const nextCharacter = word.charAt(characterIndex + 1);
        const nextCodePoint = nextCharacter.codePointAt(0);
        if (!nextCodePoint || ![6176, 6177].includes(nextCodePoint))
          detectedValues.push(characterName); // no continue as it is the last line of the loop(s)
      }
    }
  }

  return detectedValues;
}
