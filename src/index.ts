import { generateDictionary } from './dictionary' with { type: 'macro' };

const dictionary = await generateDictionary();

export default function hasInvisibleCharacters(text: string = ''): string[] {
  const detectedValues: string[] = [];

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

      // U+180E (6158) is only allowed before U+1820 (6176) and U+1821 (6177)
      if (codePoint === 6158) {
        const characterName = 'MONGOLIAN VOWEL SEPARATOR';
        const nextCharacter = word.charAt(characterIndex + 1);
        const nextCodePoint = nextCharacter.codePointAt(0);
        if (!nextCodePoint || ![6176, 6177].includes(nextCodePoint))
          detectedValues.push(characterName); // no continue as it is the last line of the loop(s)
      }
    }
  }

  return detectedValues;
}
