import { generateNormalDictionary } from './normal.dictionary' with { type: 'macro' };
import { generateNumberDictionary } from './numbers.dictionary' with { type: 'macro' };

const dictionary = await generateNormalDictionary();
const numberDictionary = await generateNumberDictionary();

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
      else if (codePoint === 6158) {
        const characterName = 'MONGOLIAN VOWEL SEPARATOR';

        // MVS only allowed infront of the following characters:
        if (nextCodePoint)
          if (
            ![
              // Character "Mongolian Letter A"
              6176,
              // Character "Mongolian Letter E"
              6177,
            ].includes(nextCodePoint)
          )
            detectedValues.push(characterName);
      }
      //
      else if (codePoint === 65039) {
        const characterName = 'VARIATION SELECTOR-16';

        if (previousCodePoint) {
          const previousIsInWhitelistedBlock =
            // Block "General Punctation"
            (previousCodePoint >= 8192 && previousCodePoint <= 8303) ||
            // Block "Letterlike Symbols"
            (previousCodePoint >= 8448 && previousCodePoint <= 8527) ||
            // Block "Arrows"
            (previousCodePoint >= 8592 && previousCodePoint <= 8703) ||
            // Block "Miscellaneous Symbols"
            (previousCodePoint >= 9728 && previousCodePoint <= 9983) ||
            // Block "Dingbats"
            (previousCodePoint >= 9984 && previousCodePoint <= 10175) ||
            // Block "Miscellaneous Symbols and Pictographs"
            (previousCodePoint >= 127744 && previousCodePoint <= 128511);

          if (
            previousCodePoint === 56803 ||
            previousCodePoint === 57331 ||
            isSurrogates(previousCodePoint) ||
            numberDictionary.includes(previousCodePoint) ||
            previousIsInWhitelistedBlock
          )
            continue;
        }

        if (nextCodePoint) {
          if (isSurrogates(nextCodePoint)) continue;
        }

        detectedValues.push(characterName);
      }
      //
      else if (codePoint === 8205) {
        const characterName = 'ZERO WIDTH JOINER';

        if (previousCodePoint) {
          if (isSurrogates(previousCodePoint)) continue;
        }

        if (nextCodePoint) {
          const nextIsInWhitelistedBlock =
            // Block "Miscellaneous Symbols"
            (nextCodePoint >= 9728 && nextCodePoint <= 9983) ||
            // Block "Supplemental Symbols and Pictographs"
            (nextCodePoint >= 129280 && nextCodePoint <= 129535);

          if (isSurrogates(nextCodePoint) || nextIsInWhitelistedBlock) continue;
        }

        detectedValues.push(characterName);
      }
    }
  }

  return detectedValues;
}
