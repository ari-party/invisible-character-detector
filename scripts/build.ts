import dts from 'bun-plugin-dts';

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: {
    identifiers: true,
    syntax: true,
    whitespace: true,
  },
  splitting: false,
  format: 'esm',
  target: 'browser',
  plugins: [
    dts({
      output: {
        noBanner: true,
      },
    }),
  ],
});
