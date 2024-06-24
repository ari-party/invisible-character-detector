import { generateDictionary } from './dictionary';

export async function generateNumberDictionary() {
  const dictionary = await generateDictionary();

  const numberCodePoints: number[] = [];

  for (const stringCodePoint of Object.keys(dictionary)) {
    const codePoint = Number(stringCodePoint);
    const runename = dictionary[codePoint];

    // all runes with digit, but not tag (tag characters are invisible)
    if (runename && runename.includes('DIGIT') && !runename.includes('TAG'))
      numberCodePoints.push(codePoint);
  }

  return numberCodePoints;
}
