import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { LoggedAppScreenProps } from "@src/features/layout";
import { ModulesScreen } from "@src/features/modules";
import { StudyingScreen } from "@src/features/studying";
import { UserStack } from "@src/features/user";
import { useUserRepository } from "@src/hooks";
import { tailwindColors } from "@src/util";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = ({ navigation }: LoggedAppScreenProps) => {
  const { t } = useTranslation("navigation");
  const { currentUser } = useUserRepository();
  const ICON_SIZE = 26;

  useEffect(() => {
    if (!currentUser) navigation.navigate("Login");
  }, [navigation, currentUser]);

  return (
    <Tab.Navigator barStyle={{ backgroundColor: tailwindColors.primary }} shifting={true}>
      <Tab.Screen
        component={ModulesScreen}
        name="Notes"
        options={{
          tabBarLabel: t("notes"),
          tabBarIcon: ({ color }) => <Icon color={color} name="playlist-edit" size={ICON_SIZE} />,
        }}
      />
      <Tab.Screen
        component={StudyingScreen}
        name="Study"
        options={{
          tabBarLabel: t("study"),
          tabBarIcon: ({ color }) => <Icon color={color} name="school" size={ICON_SIZE} />,
        }}
      />
      <Tab.Screen
        component={UserStack}
        name="User"
        options={{
          tabBarLabel: t("profile"),
          tabBarIcon: ({ color }) => <Icon color={color} name="account" size={ICON_SIZE} />,
        }}
      />
    </Tab.Navigator>
  );
};
