import { StudySetCard } from "@src/features/studying";
import { useStudySetRepository } from "@src/hooks";
import { ScrollView, View } from "react-native";

export const StudySetsScreen = () => {
  const studySets = useStudySetRepository();

  return (
    <ScrollView>
      <View className="flex-1 bg-background p-3">
        {studySets.list.data?.map((studySet) => <StudySetCard key={studySet.id} studySet={studySet} />)}
      </View>
    </ScrollView>
  );
};
