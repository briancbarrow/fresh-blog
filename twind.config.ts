import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
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
  },
} as Options;
