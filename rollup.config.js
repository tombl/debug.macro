import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import { string } from "rollup-plugin-string";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "runtime/index.ts",
  output: {
    dir: "runtime-dist",
    format: "cjs",
  },
  plugins: [
    string({ include: "**/*.css" }),
    nodeResolve(),
    commonjs({ namedExports: { prismjs: ["languages", "tokenize"] } }),
    typescript({ tsconfig: "tsconfig.runtime.json" }),
    terser(),
  ],
};
