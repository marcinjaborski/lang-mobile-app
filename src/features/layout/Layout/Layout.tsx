import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { LayoutStackParamList } from "@src/features/layout";
import { LoginScreen, RegisterScreen } from "@src/features/login";
import { BottomTabs } from "@src/features/navigation";
import { CREDENTIALS, useUserRepository } from "@src/hooks";
import { STORE_LANGUAGE_KEY } from "@src/util";
import * as Localization from "expo-localization";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator<LayoutStackParamList>();

export const Layout = () => {
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { login, currentUser } = useUserRepository();
  const { i18n } = useTranslation("navigation");

  useEffect(() => {
    if (loginAttempted || currentUser) return;
    try {
      AsyncStorage.getItem(CREDENTIALS).then((credentials) => {
        if (!credentials) return;
        login.mutate(JSON.parse(credentials));
      });
    } catch (ignore) {
    } finally {
      setLoginAttempted(true);
    }
  }, [login, loginAttempted, currentUser]);

  useEffect(() => {
    try {
      AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language: string | null) => {
        i18n.changeLanguage(language || Localization.locale);
      });
    } catch (error) {
      console.log("Error reading language", error);
    }
  }, [i18n]);

  return (
    <Stack.Navigator initialRouteName="LoggedApp" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabs} name="LoggedApp" />
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={RegisterScreen} name="Register" />
    </Stack.Navigator>
  );
};
