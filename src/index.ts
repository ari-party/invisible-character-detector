import { generateDictionary } from './dictionary' with { type: 'macro' };

const dictionary = await generateDictionary();

export default function hasInvisibleCharacters(rawText: string = ''): string[] {
  const text = rawText;

  const detectedValues: string[] = [];

  for (const word of text.split(' ')) {
    for (
      let characterIndex = 0;
      characterIndex < word.length;
      characterIndex += 1
    ) {
      const character = word.charAt(characterIndex);
      const codePoint = character.codePointAt(0);
      if (!codePoint) continue;

      if (
        characterIndex !== 0 &&
        characterIndex !== word.length - 1 &&
        dictionary[codePoint]
      ) {
        detectedValues.push(dictionary[codePoint]);
        continue;
      }

      // U+180E (6158) is only allowed before U+1820 (6176) and U+1821 (6177)
      if (codePoint === 6158) {
        const characterName = 'MONGOLIAN VOWEL SEPARATOR';
        const nextCharacter = word.charAt(characterIndex + 1);
        const nextCodePoint = nextCharacter.codePointAt(0);

        if (nextCodePoint && ![6176, 6177].includes(nextCodePoint))
          detectedValues.push(characterName);
      }

      // U+FE0F (65039) is only allowed before a character in the U+D800 (55296) - U+DB7F (56191) block
      else if (codePoint === 65039) {
        const characterName = 'VARIATION SELECTOR-16';
        const nextCharacter = word.charAt(characterIndex + 1);
        const nextCodePoint = nextCharacter.codePointAt(0);

        if (
          nextCodePoint &&
          !(nextCodePoint >= 55296 && nextCodePoint <= 56191)
        )
          detectedValues.push(characterName);
      }

      // U+200D (8205) is only allowed before a character in the U+2600 (9728) - U+26FF (9983) block
      else if (codePoint === 8205) {
        const characterName = 'ZERO WIDTH JOINER';
        const nextCharacter = word.charAt(characterIndex + 1);
        const nextCodePoint = nextCharacter.codePointAt(0);

        if (nextCodePoint && !(nextCodePoint >= 9728 && nextCodePoint <= 9983))
          detectedValues.push(characterName);
      }
    }
  }

  return detectedValues;
}
