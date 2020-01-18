import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.js", // our source file
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es" // the preferred format
    },
    {
      file: pkg.browser,
      format: "iife",
      name: "SvelteStyledSystem" // the global which can be used in a browser
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    terser(), // minifies generated bundles
    resolve()
  ]
};
