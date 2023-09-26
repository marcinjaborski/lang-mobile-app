import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { LayoutStackParamList } from "@src/features/layout";
import { LoginScreen, RegisterScreen } from "@src/features/login";
import { BottomTabs } from "@src/features/navigation";
import { CREDENTIALS, useUserRepository } from "@src/hooks";
import { useEffect, useState } from "react";

const Stack = createStackNavigator<LayoutStackParamList>();

export const Layout = () => {
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { login, currentUser } = useUserRepository();

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

  return (
    <Stack.Navigator initialRouteName="LoggedApp" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabs} name="LoggedApp" />
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={RegisterScreen} name="Register" />
    </Stack.Navigator>
  );
};
