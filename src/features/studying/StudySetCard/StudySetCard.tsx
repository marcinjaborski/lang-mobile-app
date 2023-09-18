import { StudySetsScreenProps } from "@src/features/studying";
import { useSettings } from "@src/hooks";
import { StudySet, TermUnderstanding } from "@src/types";
import { DEFAULT_SEPARATOR, getProgress, tailwindColors } from "@src/util";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Dialog, Portal, ProgressBar, Text } from "react-native-paper";

type StudySetCardProps = {
  studySet: StudySet;
  navigate: StudySetsScreenProps["navigation"]["navigate"];
};

export const StudySetCard = ({ studySet, navigate }: StudySetCardProps) => {
  const { t } = useTranslation("study");
  const settings = useSettings();
  const [termsDialogVisible, setTermsDialogVisible] = useState(false);

  const mapColorUnderstanding: Record<TermUnderstanding, string> = {
    0: "crimson",
    1: "tomato",
    2: "orange",
    3: "seagreen",
  };

  return (
    <Card className="mb-3">
      <Card.Title title={studySet.title} />
      <Card.Content className="my-2 gap-2">
        <ProgressBar color={tailwindColors.secondary} progress={getProgress(studySet.expand.terms)} />
        <Button onPress={() => setTermsDialogVisible(true)}>{t("terms")}</Button>
        <Button onPress={() => navigate("Flashcards", { studySet })}>{t("flashcards")}</Button>
        <Button onPress={() => navigate("Quiz", { studySet })}>{t("quiz")}</Button>
        <Button onPress={() => navigate("Match", { studySet })}>{t("match")}</Button>
        <Button onPress={() => navigate("Leaderboards", { studySet })}>{t("leaderboards")}</Button>
      </Card.Content>
      <Portal>
        <Dialog visible={termsDialogVisible} onDismiss={() => setTermsDialogVisible(false)}>
          <Dialog.Title>{t("terms")}</Dialog.Title>
          <Dialog.Content>
            {studySet.expand.terms?.map((term) => (
              <Text key={term.id} style={{ color: mapColorUnderstanding[term.understanding] }}>
                {term.base}
                {settings?.separator || DEFAULT_SEPARATOR}
                {term.translation}
              </Text>
            ))}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setTermsDialogVisible(false)}>{t("dismiss")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Card>
  );
};
