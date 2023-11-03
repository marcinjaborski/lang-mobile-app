import { useQuestions, useScoreRepository, useStudySetRepository, useTermRepository } from "@src/hooks";
import { isNotNullable, StudySet, Term } from "@src/types";
import { calculateScore } from "@src/util";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const useQuizScreen = (studySet: StudySet) => {
  const { t } = useTranslation("study");
  const questions = useQuestions(studySet.id);
  const [answered, setAnswered] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [points, setPoints] = useState(0);
  const studySets = useStudySetRepository(studySet.id);
  const scores = useScoreRepository(studySet.sharedId);
  const terms = useTermRepository();

  const startTime = useMemo(() => performance.now(), []);

  const onEnd = () => {
    if (!questions) return;
    const elapsedTime = performance.now() - startTime;
    const answeredCorrectly = Object.entries(answered)
      .map(([key, value]) => {
        const question = questions.find((q) => q.term.base === key);
        if (question?.term.translation === value) return question.term.id;
      })
      .filter(isNotNullable);
    const timeInSeconds = Number((Math.round(elapsedTime) / 1000).toFixed(2));
    const score = calculateScore(timeInSeconds, answeredCorrectly.length / questions.length);
    setTimeTaken(timeInSeconds);
    setResult(answeredCorrectly.length);
    setPoints(score);
    terms.updateUnderstanding.mutate(answeredCorrectly);
    if (studySets.view.data) {
      scores.create.mutate({
        game: "quiz",
        studySetSharedId: studySets.view.data.sharedId,
        score,
      });
    }
  };

  const getAnswerColor = (term: Term, answer: string) => {
    if (result === null) return undefined;
    if (term.translation === answer) return "green";
    if (answered[term.base] === answer) return "red";
    return undefined;
  };
  return { t, questions, answered, setAnswered, result, onEnd, getAnswerColor, timeTaken, points };
};
