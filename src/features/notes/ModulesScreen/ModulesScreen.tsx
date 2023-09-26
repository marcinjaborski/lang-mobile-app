import { ModulesScreenProps, NoteShelf, OpenNoteFunction } from "@src/features/notes";
import { useModuleRepository, useUserRepository } from "@src/hooks";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const ModulesScreen = ({ navigation }: ModulesScreenProps) => {
  const { t } = useTranslation("notes");
  const modules = useModuleRepository();
  const { currentUser } = useUserRepository();

  const onRefresh = useCallback(async () => {
    await modules.list.refetch();
  }, [modules]);

  useEffect(() => {
    if (currentUser) onRefresh();
  }, [currentUser, onRefresh]);

  const openNote: OpenNoteFunction = (note) => {
    navigation.navigate("Note", { note });
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-3 content-start">
      <ScrollView refreshControl={<RefreshControl refreshing={modules.list.isLoading} onRefresh={onRefresh} />}>
        <Text variant="displayMedium">{t("hello", { username: currentUser?.username || "" })}</Text>
        <Divider />
        {modules.list.data?.map((module) => <NoteShelf key={module.id} module={module} openNote={openNote} />)}
      </ScrollView>
    </SafeAreaView>
  );
};
