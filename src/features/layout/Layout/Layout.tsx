import { createStackNavigator } from "@react-navigation/stack";
import { LayoutStackParamList } from "@src/features/layout";
import { LoginScreen, RegisterScreen } from "@src/features/login";
import { BottomTabs } from "@src/features/navigation";

const Stack = createStackNavigator<LayoutStackParamList>();

export const Layout = () => {
  return (
    <Stack.Navigator initialRouteName="LoggedApp" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabs} name="LoggedApp" />
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={RegisterScreen} name="Register" />
    </Stack.Navigator>
  );
};
