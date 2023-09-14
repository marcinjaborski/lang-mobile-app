import { StackScreenProps } from "@react-navigation/stack";

export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type LoginScreenProps = StackScreenProps<LoginStackParamList, "Login">;
export type RegisterScreenProps = StackScreenProps<LoginStackParamList, "Register">;
