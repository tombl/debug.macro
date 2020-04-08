import * as t from "@babel/types";

import { createMacro } from "babel-plugin-macros";
import { expression } from "@babel/template";
import generate from "@babel/generator";

const template = expression(
  `require("debug.macro/runtime-dist/index.js")(%%code%%, () => %%expression%%, (...parts) => { console.log(...parts) })`
);

export = createMacro(({ references }) => {
  references.default.reverse().forEach((path) => {
    if (t.isCallExpression(path.parent) && path.parent.arguments.length > 0) {
      path.parentPath.replaceWith(
        template({
          code: t.stringLiteral(
            generate(path.parent.arguments[0], { concise: true }).code
          ),
          expression: path.parent.arguments[0],
        })
      );
    }
  });
});
