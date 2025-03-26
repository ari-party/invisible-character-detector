import { generateInvisibleCharacterDictionary } from './macros/data/invisibleCharacterDictionary' with { type: 'macro' };
import isLetter from './utils/isLetter';
import isEmoji from './utils/isEmoji';

const invisibleCharacterDictionary =
  await generateInvisibleCharacterDictionary();

export interface Detection {
  codePoint: number;
  runename: string;
  character: string;
  position: number;
}

export function findInvisibleCharacters(
  str: string = '',
  ignoreEmojis: boolean = false,
) {
  const detections: Detection[] = [];

  for (
    let characterIndex = 0;
    characterIndex < str.length;
    characterIndex += 1
  ) {
    const character = str.charAt(characterIndex);
    const codePoint = character.codePointAt(0)!;

    const runename = invisibleCharacterDictionary[codePoint];
    if (!runename) continue;

    // check for letters (or emojis) on the left
    // goal is to skip over duplicate invisible characters within a word
    let leftContextValid = false;
    for (let i = characterIndex - 1; i >= 0; i -= 1) {
      const precedingChar = str.charAt(i);

      if (precedingChar === ' ') break;

      if (isLetter(precedingChar) || (ignoreEmojis && isEmoji(precedingChar))) {
        leftContextValid = true;
        break;
      }
    }

    // check for letters on the right
    let rightContextValid = false;
    for (let i = characterIndex + 1; i < str.length; i += 1) {
      const followingChar = str.charAt(i);

      if (followingChar === ' ') break;

      if (isLetter(followingChar)) {
        rightContextValid = true;
        break;
      }
    }

    if (leftContextValid && rightContextValid)
      detections.push({
        codePoint,
        runename,
        character,
        position: characterIndex,
      });
  }

  return detections;
}
