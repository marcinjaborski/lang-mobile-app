import { useModuleRepository } from "@src/hooks";
import { Text, View } from "react-native";

export const ModulesScreen = () => {
  const { list } = useModuleRepository();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text>{JSON.stringify(list.data)}</Text>
    </View>
  );
};
