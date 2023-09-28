import { MatchScreenProps } from "@src/features/studying";
import { Dialog, Portal, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMatchGame } from "./useMatchGame";
import { WordCard } from "./WordCard";

export const MatchScreen = ({ navigation, route }: MatchScreenProps) => {
  const studySet = route.params.studySet;
  const {
    t,
    mounted,
    words,
    flipped,
    incorrectCounter,
    scoreEarned,
    selected,
    incorrect,
    timeScore,
    setTimeScore,
    onPress,
  } = useMatchGame(studySet);

  const hideDialog = () => {
    setTimeScore(null);
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-backgoround flex-row flex-wrap m-3">
      {mounted &&
        words?.map((word) => (
          <WordCard
            flipped={flipped.value[word]}
            incorrect={incorrect.includes(word)}
            key={word}
            selected={selected === word}
            word={word}
            onPress={onPress}
          />
        ))}
      <Portal>
        <Dialog visible={timeScore !== null} onDismiss={hideDialog}>
          <Dialog.Title>{t("matchEnd")}</Dialog.Title>
          <Dialog.Content>
            <Text>{t("timeScore", { timeScore })}</Text>
            <Text>{t("misses", { incorrectCounter })}</Text>
            <Text>
              {t("score")}: {scoreEarned}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};
