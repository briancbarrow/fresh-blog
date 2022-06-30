import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
import * as colors from "twind/colors";
export * from "twind";

export const theme = {
  colors: {
    blue: colors.blue,
    black: "#12130F",
    gray: colors.gray,
    green: colors.green,
    white: colors.white,
    yellow: colors.yellow,
    transparent: "transparent",
    darkGreen: "#003e29",
    lightBlue: "#c1dbe3",
    lightGreen: "#467061",
    lightGrey: "#F1F5F8",
    borderGrey: "#d8dee4",
  },
};

export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
};
if (IS_BROWSER) setup(config);
