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
    setResult(answeredCorrectly.length);
    terms.updateUnderstanding.mutate(answeredCorrectly);
    if (studySets.view.data) {
      scores.create.mutate({
        game: "quiz",
        studySetSharedId: studySets.view.data.sharedId,
        score: calculateScore(Math.round(elapsedTime) / 1000, answeredCorrectly.length / questions.length),
      });
    }
  };

  const getAnswerColor = (term: Term, answer: string) => {
    if (result === null) return undefined;
    if (term.translation === answer) return "green";
    if (answered[term.base] === answer) return "red";
    return undefined;
  };
  return { t, questions, answered, setAnswered, result, onEnd, getAnswerColor };
};
