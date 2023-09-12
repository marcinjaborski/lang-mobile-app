import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ModulesScreen } from "@src/features/modules";
import { StudyingScreen } from "@src/features/studying";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  const { t } = useTranslation("navigation");
  const ICON_SIZE = 26;

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          component={ModulesScreen}
          name={t("notes")}
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons color={color} name="playlist-edit" size={ICON_SIZE} />,
          }}
        />
        <Tab.Screen
          component={StudyingScreen}
          name="Study"
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons color={color} name="school" size={ICON_SIZE} />,
          }}
        />
        <Tab.Screen
          component={StudyingScreen}
          name="Profile"
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons color={color} name="account" size={ICON_SIZE} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
