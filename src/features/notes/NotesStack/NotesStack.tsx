import { createStackNavigator } from "@react-navigation/stack";
import { ModulesScreen, NoteScreen, NotesStackParamList } from "@src/features/notes";
import { tailwindColors } from "@src/util";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator<NotesStackParamList>();

export const NotesStack = () => {
  const { t } = useTranslation("notes");

  return (
    <Stack.Navigator
      initialRouteName="Modules"
      screenOptions={{ headerStyle: { backgroundColor: tailwindColors.primary } }}
    >
      <Stack.Screen component={ModulesScreen} name="Modules" options={{ title: t("modulesHeader") }} />
      <Stack.Screen component={NoteScreen} name="Note" options={{ title: t("noteHeader") }} />
    </Stack.Navigator>
  );
};
