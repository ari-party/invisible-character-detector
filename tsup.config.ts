import { defineConfig } from 'tsup';

export default defineConfig({
  outDir: 'dist',
  entry: ['index.ts'],
  clean: true,
  sourcemap: false,
  splitting: false,
  minify: true,
  target: 'node20',
  format: 'esm',
  dts: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
