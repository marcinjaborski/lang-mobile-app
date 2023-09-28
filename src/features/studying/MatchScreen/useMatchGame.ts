import { useQuestions, useScoreRepository, useStudySetRepository, useTermRepository } from "@src/hooks";
import { StudySet } from "@src/types";
import { calculateScore, MATCH_INCORRECT_TIME } from "@src/util";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSharedValue } from "react-native-reanimated";

export const useMatchGame = (studySet: StudySet) => {
  const { t } = useTranslation("study");
  const questions = useQuestions(studySet.id, false);
  const terms = useTermRepository();
  const scores = useScoreRepository(studySet.sharedId);
  const studySets = useStudySetRepository(studySet.id);
  const flipped = useSharedValue<Record<string, number>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [incorrect, setIncorrect] = useState<[string, string]>(["", ""]);
  const [incorrectCounter, setIncorrectCounter] = useState(0);
  const [timeScore, setTimeScore] = useState<number | null>(null);
  const [scoreEarned, setScoreEarned] = useState<number | null>(null);

  const words = useMemo(
    () => questions && _.shuffle(_.flatten(questions.map(({ term }) => [term.base, term.translation]))),
    [questions],
  );

  const startTime = useMemo(() => performance.now(), []);

  useEffect(() => {
    if (!words || mounted) return;
    words.forEach((word) => (flipped.value[word] = 0));
    setMounted(true);
  }, [flipped.value, mounted, words]);

  const onPress = (word: string) => {
    if (selected === null) {
      setSelected(word);
      return;
    }

    if (selected === word) {
      setSelected(null);
      return;
    }

    const question = questions?.find((q) => q.term.base === word || q.term.translation === word);
    if (!question) return;

    setSelected(null);

    const isCorrect =
      (question.term.base === word && question.term.translation === selected) ||
      (question.term.base === selected && question.term.translation === word);

    if (isCorrect) {
      flipped.value[word] = 1;
      flipped.value[selected] = 1;
      if (Object.values(flipped.value).every((value) => value === 1)) onEnd();
      return;
    }

    setIncorrect([word, selected]);
    setIncorrectCounter((prevState) => prevState + 1);
    setTimeout(() => {
      setIncorrect(["", ""]);
    }, MATCH_INCORRECT_TIME);
  };

  const onEnd = () => {
    if (!questions) return;

    const elapsedTime = performance.now() - startTime;
    setTimeScore(Number((elapsedTime / 1000).toFixed(2)));
    terms.updateUnderstanding.mutate(questions.map(({ term }) => term.id));
    const score = calculateScore(
      Math.round(elapsedTime) / 1000,
      (questions.length - incorrectCounter) / questions.length,
    );
    setScoreEarned(score);

    if (studySets.view.data) {
      scores.create.mutate({
        game: "match",
        studySetSharedId: studySets.view.data.sharedId,
        score,
      });
    }
  };

  return {
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
  };
};
