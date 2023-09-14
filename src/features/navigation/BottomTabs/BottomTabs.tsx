import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { ModulesScreen } from "@src/features/modules";
import { StudyingScreen } from "@src/features/studying";
import { tailwindColors } from "@src/util";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  const { t } = useTranslation("navigation");
  const ICON_SIZE = 26;

  return (
    <Tab.Navigator barStyle={{ backgroundColor: tailwindColors.primary }} shifting={true}>
      <Tab.Screen
        component={ModulesScreen}
        name={t("notes")}
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name="playlist-edit" size={ICON_SIZE} />,
        }}
      />
      <Tab.Screen
        component={StudyingScreen}
        name="Study"
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name="school" size={ICON_SIZE} />,
        }}
      />
      <Tab.Screen
        component={StudyingScreen}
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => <Icon color={color} name="account" size={ICON_SIZE} />,
        }}
      />
    </Tab.Navigator>
  );
};
