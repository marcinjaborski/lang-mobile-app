import { createStackNavigator } from "@react-navigation/stack";
import { StudySetsScreen, StudyStackParamList } from "@src/features/studying";
import { tailwindColors } from "@src/util";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator<StudyStackParamList>();

export const StudyStack = () => {
  const { t } = useTranslation("study");

  return (
    <Stack.Navigator
      initialRouteName="StudySets"
      screenOptions={{ headerStyle: { backgroundColor: tailwindColors.primary } }}
    >
      <Stack.Screen component={StudySetsScreen} name="StudySets" options={{ title: t("study") }} />
      <Stack.Screen component={StudySetsScreen} name="Flashcards" options={{ title: t("flashcards") }} />
      <Stack.Screen component={StudySetsScreen} name="Quiz" options={{ title: t("quiz") }} />
      <Stack.Screen component={StudySetsScreen} name="Match" options={{ title: t("match") }} />
      <Stack.Screen component={StudySetsScreen} name="Leaderboards" options={{ title: t("leaderboards") }} />
    </Stack.Navigator>
  );
};
