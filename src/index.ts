import { generateDictionary } from './dictionary' with { type: 'macro' };

const dictionary = await generateDictionary();

export function isSurrogates(codePoint: number): boolean {
  return (
    (codePoint >= 55296 && codePoint <= 56191) ||
    (codePoint >= 56192 && codePoint <= 56319) ||
    (codePoint >= 56320 && codePoint <= 57343)
  );
}

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

      const previousCharacter = word.charAt(characterIndex - 1);
      const previousCodePoint = previousCharacter.codePointAt(0);
      const nextCharacter = word.charAt(characterIndex + 1);
      const nextCodePoint = nextCharacter.codePointAt(0);

      if (dictionary[codePoint]) detectedValues.push(dictionary[codePoint]);
      //
      else if (codePoint === 6158) {
        const characterName = 'MONGOLIAN VOWEL SEPARATOR';

        if (nextCodePoint)
          if (![6176, 6177].includes(nextCodePoint))
            detectedValues.push(characterName);
      }
      //
      else if (codePoint === 65039) {
        const characterName = 'VARIATION SELECTOR-16';

        if (previousCodePoint) {
          const previousIsInWhitelistedBlock =
            (previousCodePoint >= 8192 && previousCodePoint <= 8303) ||
            (previousCodePoint >= 9728 && previousCodePoint <= 9983) ||
            (previousCodePoint >= 9984 && previousCodePoint <= 10175) ||
            (previousCodePoint >= 55296 && previousCodePoint <= 56191) ||
            (previousCodePoint >= 127744 && previousCodePoint <= 128511);

          if (
            previousCodePoint === 56803 ||
            previousCodePoint === 57331 ||
            previousIsInWhitelistedBlock
          )
            continue;
        }

        if (nextCodePoint) {
          const nextIsInWhitelistedBlock =
            nextCodePoint >= 55296 && nextCodePoint <= 56191;

          if (nextIsInWhitelistedBlock) continue;
        }

        detectedValues.push(characterName);
      } //
      else if (codePoint === 8205) {
        const characterName = 'ZERO WIDTH JOINER';

        if (nextCodePoint) {
          const nextIsInWhitelistedBlock =
            (nextCodePoint >= 9728 && nextCodePoint <= 9983) ||
            (nextCodePoint >= 129280 && nextCodePoint <= 129535);

          if (nextIsInWhitelistedBlock || isSurrogates(nextCodePoint)) continue;
        }

        detectedValues.push(characterName);
      }
    }
  }

  return detectedValues;
}
