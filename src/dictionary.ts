export async function generateDictionary() {
  const data = await Bun.file('UnicodeData.txt').text();

  const dictionary = Object.fromEntries(
    data.split('\n').map((line) => {
      const segments = line.split(';');

      const decimal = parseInt(segments[0], 16);
      let runename = segments[1];

      if (runename === '<control>') runename = segments[10];

      return [decimal, runename];
    }),
  );

  return Object.fromEntries(
    Object.keys(dictionary).map((code) => {
      return [code, dictionary[code] ?? `<unknown-${code}>`];
    }),
  );
}
