import { createStackNavigator } from "@react-navigation/stack";
import {
  FlashcardsScreen,
  LeaderboardsScreen,
  MatchScreen,
  QuizScreen,
  StudySetsScreen,
  StudyStackParamList,
} from "@src/features/studying";
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
      <Stack.Screen component={FlashcardsScreen} name="Flashcards" options={{ title: t("flashcards") }} />
      <Stack.Screen component={QuizScreen} name="Quiz" options={{ title: t("quiz") }} />
      <Stack.Screen component={MatchScreen} name="Match" options={{ title: t("match") }} />
      <Stack.Screen component={LeaderboardsScreen} name="Leaderboards" options={{ title: t("leaderboards") }} />
    </Stack.Navigator>
  );
};
