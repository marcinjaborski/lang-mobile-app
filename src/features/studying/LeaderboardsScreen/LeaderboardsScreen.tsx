import { LeaderboardsScreenProps } from "@src/features/studying";
import { useScoreRepository } from "@src/hooks";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const LeaderboardsScreen = ({ route }: LeaderboardsScreenProps) => {
  const studySet = route.params.studySet;
  const { t } = useTranslation("study");
  const scores = useScoreRepository(studySet.sharedId);

  const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "numeric",
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t("user")}</DataTable.Title>
            <DataTable.Title>{t("game")}</DataTable.Title>
            <DataTable.Title>{t("date")}</DataTable.Title>
            <DataTable.Title>{t("score")}</DataTable.Title>
          </DataTable.Header>
          {scores.list.data?.map(({ id, expand: { user }, game, score, created }) => (
            <DataTable.Row key={id}>
              <DataTable.Cell>{user?.username}</DataTable.Cell>
              <DataTable.Cell>{game}</DataTable.Cell>
              <DataTable.Cell>{dateTimeFormat.format(new Date(created))}</DataTable.Cell>
              <DataTable.Cell numeric>{score}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
};
