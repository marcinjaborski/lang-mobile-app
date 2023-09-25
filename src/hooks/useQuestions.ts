import { useStudySetRepository } from "@src/hooks";
import { Question } from "@src/types";
import { QUIZ_ANSWERS, QUIZ_QUESTIONS } from "@src/util";
import _ from "lodash";
import { useMemo } from "react";

export const useQuestions = (studySetId: string, allowTheSameBaseAndTranslation = true): Question[] | null => {
  const studySets = useStudySetRepository(studySetId);

  return useMemo(() => {
    if (!studySets.view.data) return null;
    const allTerms = studySets.view.data.expand.terms || [];
    const termsToStudy = [...allTerms]
      .sort((term1, term2) => (term1.understanding > term2.understanding ? 1 : -1))
      .filter((term) => allowTheSameBaseAndTranslation || term.base !== term.translation)
      .slice(0, QUIZ_QUESTIONS);
    const allAnswers = allTerms.map((term) => term.translation);
    return termsToStudy.map((term) => {
      let remainingAnswers = [...allAnswers];
      const answers = [term.translation];
      while (answers.length < QUIZ_ANSWERS) {
        const randomAnswer = _.sample(remainingAnswers);
        if (!randomAnswer) break;
        if (answers.includes(randomAnswer)) {
          remainingAnswers = remainingAnswers.filter((answer) => answer !== randomAnswer);
        } else {
          answers.push(randomAnswer);
        }
      }
      return {
        term,
        answers: _.shuffle(answers),
      };
    });
  }, [allowTheSameBaseAndTranslation, studySets.view.data]);
};
