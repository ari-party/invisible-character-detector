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
      } else if (codePoint === 6158) {
        const characterName = 'MONGOLIAN VOWEL SEPARATOR';

        const nextCharacter = word.charAt(characterIndex + 1);
        const nextCodePoint = nextCharacter.codePointAt(0);

        if (nextCodePoint && ![6176, 6177].includes(nextCodePoint))
          detectedValues.push(characterName);
      } else if (codePoint === 65039) {
        const characterName = 'VARIATION SELECTOR-16';

        const previousCharacter = word.charAt(characterIndex - 1);
        const previousCodePoint = previousCharacter.codePointAt(0);
        const nextCharacter = word.charAt(characterIndex + 1);
        const nextCodePoint = nextCharacter.codePointAt(0);

        if (previousCodePoint) {
          const previousInWBlock =
            (previousCodePoint >= 9728 && previousCodePoint <= 9983) ||
            (previousCodePoint >= 9984 && previousCodePoint <= 10175) ||
            (previousCodePoint >= 55296 && previousCodePoint <= 56191);

          if (previousCodePoint === 56803 || previousInWBlock) continue;
        }

        if (nextCodePoint) {
          const nextInWBlock = nextCodePoint >= 55296 && nextCodePoint <= 56191;

          if (nextInWBlock) continue;
        }

        detectedValues.push(characterName);
      } else if (codePoint === 8205) {
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
