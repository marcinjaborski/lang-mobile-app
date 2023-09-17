import { NoteShelf } from "@src/features/modules";
import { useModuleRepository, useUserRepository } from "@src/hooks";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const ModulesScreen = () => {
  const { t } = useTranslation("modules");
  const modules = useModuleRepository();
  const { currentUser } = useUserRepository();

  const onRefresh = async () => {
    await modules.list.refetch();
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-3 content-start">
      <ScrollView refreshControl={<RefreshControl refreshing={modules.list.isLoading} onRefresh={onRefresh} />}>
        <Text variant="displayMedium">{t("hello", { username: currentUser?.username || "" })}</Text>
        <Divider />
        {modules.list.data?.map((module) => <NoteShelf key={module.id} module={module} />)}
      </ScrollView>
    </SafeAreaView>
  );
};
