import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "@src/features/user";
import { UserStackParamList } from "@src/features/user/types";

const Stack = createStackNavigator<UserStackParamList>();

export const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={ProfileScreen} name="Profile" />
    </Stack.Navigator>
  );
};
