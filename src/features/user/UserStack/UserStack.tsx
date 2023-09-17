import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen, SettingsScreen } from "@src/features/user";
import { UserStackParamList } from "@src/features/user/types";

const Stack = createStackNavigator<UserStackParamList>();

export const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={ProfileScreen} name="Profile" />
      <Stack.Screen component={SettingsScreen} name="Settings" />
    </Stack.Navigator>
  );
};
