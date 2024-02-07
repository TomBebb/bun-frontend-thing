import html from "bun-plugin-html"

await Bun.build({
    target: "browser",
  entrypoints: ['./src/index.html'],
  outdir: './dist',
  plugins: [
    html()
  ],
  
})