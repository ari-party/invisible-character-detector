import { generateInvisibleCharacterDictionary } from './macros/data/invisibleCharacterDictionary' with { type: 'macro' };
import isLetter from './utils/isLetter';

const characterDictionary = await generateInvisibleCharacterDictionary();

export default function hasInvisibleCharacters(text: string = ''): string[] {
  const detectedValues: string[] = [];

  for (const word of text.split(' '))
    for (
      let characterIndex = 0;
      characterIndex < word.length;
      characterIndex += 1
    ) {
      const character = word.charAt(characterIndex);
      const codePoint = character.codePointAt(0);
      if (!codePoint) continue;

      const runename = characterDictionary[codePoint];
      if (!runename) continue;

      const cleanWord = word
        .split('')
        // remove all characters in this word that are included in the blacklisted dictionary
        .filter((v) => {
          const innerCodePoint = v.codePointAt(0);
          if (!innerCodePoint) return false;
          return !characterDictionary[innerCodePoint];
        })
        .join('');
      const previousCharacter = cleanWord.charAt(characterIndex - 1);
      const nextCharacter = cleanWord.charAt(characterIndex + 1);

      if (isLetter(previousCharacter) && isLetter(nextCharacter))
        detectedValues.push(runename);
    }

  return detectedValues;
}
