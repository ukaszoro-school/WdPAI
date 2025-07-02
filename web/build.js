// build.js
import { build } from "esbuild";

await build({
  entryPoints: ["src/index.js"],
  bundle: true,
  outfile: "dist/bundle.js",
  format: "iife",           // Immediately-Invoked Function Expression
  globalName: "MyLibrary",  // Global var name
  minify: true,
  sourcemap: true,
});
