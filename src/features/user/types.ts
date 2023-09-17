import { StackScreenProps } from "@react-navigation/stack";

export type UserStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

export type ProfileScreenProps = StackScreenProps<UserStackParamList, "Profile">;
export type SettingsScreenProps = StackScreenProps<UserStackParamList, "Settings">;
