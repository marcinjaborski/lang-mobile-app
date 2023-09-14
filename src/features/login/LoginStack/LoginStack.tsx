import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, RegisterScreen } from "@src/features/login";
import { LoginStackParamList } from "@src/features/login/types";

const Stack = createStackNavigator<LoginStackParamList>();

export const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={RegisterScreen} name="Register" />
    </Stack.Navigator>
  );
};
