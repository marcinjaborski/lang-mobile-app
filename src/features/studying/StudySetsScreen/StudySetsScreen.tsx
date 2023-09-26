import { StudySetCard, StudySetsScreenProps } from "@src/features/studying";
import { useStudySetRepository } from "@src/hooks";
import { useCallback } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

export const StudySetsScreen = ({ navigation }: StudySetsScreenProps) => {
  const studySets = useStudySetRepository();

  const onRefresh = useCallback(async () => {
    await studySets.list.refetch();
  }, [studySets]);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={studySets.list.isLoading} onRefresh={onRefresh} />}>
      <View className="flex-1 bg-background p-3">
        {studySets.list.data?.map((studySet) => (
          <StudySetCard key={studySet.id} navigate={navigation.navigate} studySet={studySet} />
        ))}
      </View>
    </ScrollView>
  );
};
