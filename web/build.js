// build.js
import { build } from "esbuild";

await build({
  entryPoints: ["src/index.js"],
  bundle: true,
  outfile: "../site/content/bundle.js",
  format: "iife",
  sourcemap: true,
  platform: "browser",
  inject: [],
  define: { global: "window" },
  alias: {
    crypto: "crypto-browserify",
  },
  loader: {
    ".css": "css"
  }
}).catch(() => process.exit(1));
