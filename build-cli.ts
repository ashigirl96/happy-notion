void Bun.build({
  entrypoints: ['./src/cli.ts'],
  outdir: './dist',
  minify: false,
  target: 'bun',
  sourcemap: 'linked',
})
