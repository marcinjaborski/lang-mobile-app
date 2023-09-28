import resolveConfig from "tailwindcss/resolveConfig";

import twConfig from "../../tailwind.config.js";

export const tailwindConfig = resolveConfig(twConfig);

export type Colors = Record<"primary" | "secondary" | "background" | "white" | "text" | "error", string>;

export const tailwindColors = tailwindConfig.theme!.colors! as Colors;
