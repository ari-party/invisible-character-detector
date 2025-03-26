import dts from 'bun-plugin-dts';

const buildStart = performance.now();

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: { identifiers: true, syntax: true, whitespace: true },
  splitting: false,
  format: 'esm',
  target: 'browser',
  plugins: [dts({ output: { noBanner: true } })],
});

console.log(
  `Build completed in ${((performance.now() - buildStart) / 1_000).toPrecision(3)}s`,
);
