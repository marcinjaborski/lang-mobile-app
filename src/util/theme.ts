import { DefaultTheme as DefaultNavigationTheme } from "@react-navigation/native";
import { tailwindColors } from "@src/util/tailwindConfig";
import { MD3LightTheme as DefaultPaperTheme } from "react-native-paper";

export const paperTheme = {
  ...DefaultPaperTheme,
  colors: {
    ...DefaultPaperTheme.colors,
    ...tailwindColors,
  },
};

export const navigationTheme = {
  ...DefaultNavigationTheme,
  colors: {
    ...DefaultNavigationTheme.colors,
    ...tailwindColors,
  },
};
