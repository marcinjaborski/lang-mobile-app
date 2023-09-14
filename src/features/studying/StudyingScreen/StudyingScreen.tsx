import { pb } from "@src/util";
import { View } from "react-native";
import { Button } from "react-native-paper";

export const StudyingScreen = () => {
  return (
    <View className="flex-1 align-center justify-center">
      <Button onPress={() => pb.authStore.clear()}>Logout</Button>
    </View>
  );
};
