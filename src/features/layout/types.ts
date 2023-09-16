import { StackScreenProps } from "@react-navigation/stack";

export type LayoutStackParamList = {
  LoggedApp: undefined;
  Login: undefined;
  Register: undefined;
};

export type LoginScreenProps = StackScreenProps<LayoutStackParamList, "Login">;
export type RegisterScreenProps = StackScreenProps<LayoutStackParamList, "Register">;
export type LoggedAppScreenProps = StackScreenProps<LayoutStackParamList, "LoggedApp">;
