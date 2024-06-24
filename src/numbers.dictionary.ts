import { generateDictionary } from './dictionary';

export async function generateNumberDictionary() {
  const dictionary = await generateDictionary();

  const numberCodePoints: number[] = [];

  for (const stringCodePoint of Object.keys(dictionary)) {
    const codePoint = Number(stringCodePoint);
    const rune = dictionary[codePoint];

    if (rune.includes('DIGIT')) numberCodePoints.push(codePoint);
  }

  return numberCodePoints;
}
