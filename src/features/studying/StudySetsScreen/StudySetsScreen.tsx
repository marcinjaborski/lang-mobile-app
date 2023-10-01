import { CreateStudySetDialog, StudySetCard, StudySetsScreenProps } from "@src/features/studying";
import { useStudySetRepository } from "@src/hooks";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, View } from "react-native";
import { AnimatedFAB } from "react-native-paper";

export const StudySetsScreen = ({ navigation }: StudySetsScreenProps) => {
  const { t } = useTranslation("study");
  const studySets = useStudySetRepository();
  const [createDialogVisible, setCreateDialogVisible] = useState(false);

  const onRefresh = useCallback(async () => {
    await studySets.list.refetch();
  }, [studySets]);

  const closeCreateDialog = () => {
    setCreateDialogVisible(false);
  };

  return (
    <View>
      <ScrollView refreshControl={<RefreshControl refreshing={studySets.list.isLoading} onRefresh={onRefresh} />}>
        <View className="flex-1 bg-background p-3">
          {studySets.list.data?.map((studySet) => (
            <StudySetCard key={studySet.id} navigate={navigation.navigate} studySet={studySet} />
          ))}
        </View>
      </ScrollView>
      <AnimatedFAB
        className="right-3 bottom-3 bg-primary"
        extended={false}
        icon="plus"
        label={t("newStudySet")}
        visible
        onPress={() => setCreateDialogVisible(true)}
      />
      <CreateStudySetDialog visible={createDialogVisible} onClose={closeCreateDialog} />
    </View>
  );
};
