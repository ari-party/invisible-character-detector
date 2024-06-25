export async function generateCharacterDictionary() {
  const data = await Bun.file('UnicodeData.txt').text();

  const dictionary = Object.fromEntries(
    data
      .split('\n')
      .filter((v) => v.trim())
      .map((line) => {
        const segments = line.trim().split(';');

        const decimal = parseInt(segments[0], 16);
        let runename = segments[1];

        if (runename === '<control>') runename = segments[10];

        return [decimal, runename];
      }),
  );

  return Object.fromEntries(
    Object.keys(dictionary).map((code) => {
      return [code, dictionary[code]];
    }),
  );
}
