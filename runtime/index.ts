import { generateTheme, highlight } from "prism-console";

import { languages } from "prismjs";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import themeCSS from "prism-material-themes/themes/material-default.css";

const theme = generateTheme(themeCSS);

export default function<T>(
  code: string,
  getValue: () => T,
  log: (...parts: unknown[]) => void
): T {
  try {
    const value = getValue();
    log(...highlight(code, languages.javascript, theme), "=", value);
    return value;
  } catch (err) {
    log(...highlight(code, languages.javascript, theme), "threw", err);
    throw err;
  }
}
