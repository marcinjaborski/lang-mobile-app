import { QuizScreenProps } from "@src/features/studying";
import { tailwindColors } from "@src/util";
import { useRef } from "react";
import { ActivityIndicator, Button, Card, RadioButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import { useQuizScreen } from "./useQuizScreen";

export const QuizScreen = ({ route }: QuizScreenProps) => {
  const studySet = route.params.studySet;
  const { t, questions, result, answered, setAnswered, getAnswerColor, onEnd, timeTaken, points } =
    useQuizScreen(studySet);
  const ref = useRef<Swiper>(null);

  if (!questions)
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center">
      {result !== null ? <Text variant="displaySmall">{t("result", { result })}</Text> : null}
      {result !== null ? <Text variant="headlineLarge">{t("timeTaken", { timeTaken })}</Text> : null}
      {result !== null ? <Text variant="headlineLarge">{t("points", { points })}</Text> : null}
      <Swiper activeDotColor={tailwindColors.primary} ref={ref}>
        {questions.map(({ term, answers }) => (
          <Card className="w-3/4 m-auto" key={term.id}>
            <Card.Title title={term.base} titleVariant="headlineMedium" />
            <Card.Content>
              {answers.map((answer) => (
                <RadioButton.Group
                  key={answer}
                  value={answered[term.base]}
                  onValueChange={(value) => {
                    if (result !== null) return;
                    setAnswered((prevState) => ({ ...prevState, [term.base]: value }));
                    ref.current?.scrollBy(1);
                  }}
                >
                  <RadioButton.Item
                    label={answer}
                    labelStyle={{ color: getAnswerColor(term, answer) }}
                    value={answer}
                  />
                </RadioButton.Group>
              ))}
            </Card.Content>
          </Card>
        ))}
      </Swiper>
      <Button className="m-3" disabled={result !== null} onPress={onEnd}>
        {t("endAttempt")}
      </Button>
    </SafeAreaView>
  );
};
