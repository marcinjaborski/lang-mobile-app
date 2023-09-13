import { tailwindColors } from "@src/util/tailwindConfig";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...tailwindColors,
  },
};
