import { SettingsScreenProps } from "@src/features/user";
import { Button } from "react-native-paper";

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  return <Button onPress={() => navigation.goBack()}>Go back</Button>;
};
