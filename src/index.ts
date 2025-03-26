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

export function findInvisibleCharacters(str: string = '') {
  const detections: Detection[] = [];

  const characters: { char: string; index: number }[] = [];
  let offset = 0;
  for (const char of Array.from(str)) {
    characters.push({ char, index: offset });
    offset += char.length;
  }

  for (
    let characterIndex = 0;
    characterIndex < characters.length;
    characterIndex += 1
  ) {
    const { char, index } = characters[characterIndex];
    const codePoint = char.codePointAt(0)!;
    const runename = invisibleCharacterDictionary[codePoint];
    if (!runename) continue;

    //? skips invisible characters that are part of an emoji
    // zero-width joiner (U+200D)
    if (
      codePoint === 0x200d &&
      characterIndex > 0 &&
      characterIndex < characters.length - 1
    )
      if (
        isEmoji(characters[characterIndex - 1].char) &&
        isEmoji(characters[characterIndex + 1].char)
      )
        continue;
    // variation selector-16 (U+FE0F)
    if (codePoint === 0xfe0f && characterIndex > 0)
      if (isEmoji(characters[characterIndex - 1].char)) continue;

    // check for letters on the left
    let leftContextEligible = false;
    for (let i = characterIndex - 1; i >= 0; i -= 1) {
      const precedingChar = characters[i].char;
      if (precedingChar === ' ') break;
      if (isLetter(precedingChar)) {
        leftContextEligible = true;
        break;
      }
    }

    // check for letters on the right
    let rightContextEligible = false;
    for (let i = characterIndex + 1; i < characters.length; i += 1) {
      const followingChar = characters[i].char;
      if (followingChar === ' ') break;
      if (isLetter(followingChar)) {
        rightContextEligible = true;
        break;
      }
    }

    if (leftContextEligible && rightContextEligible)
      detections.push({
        codePoint,
        runename,
        character: char,
        position: index,
      });
  }

  return detections;
}
