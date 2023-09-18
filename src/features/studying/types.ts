import { StackScreenProps } from "@react-navigation/stack";
import { StudySet } from "@src/types";

export type StudyStackParamList = {
  StudySets: undefined;
  Flashcards: { studySet: StudySet };
  Quiz: { studySet: StudySet };
  Match: { studySet: StudySet };
  Leaderboards: { studySet: StudySet };
};

export type StudySetsScreenProps = StackScreenProps<StudyStackParamList, "StudySets">;
export type FlashcardsScreenProps = StackScreenProps<StudyStackParamList, "Flashcards">;
export type QuizScreenProps = StackScreenProps<StudyStackParamList, "Quiz">;
export type MatchScreenProps = StackScreenProps<StudyStackParamList, "Match">;
export type LeaderboardsScreenProps = StackScreenProps<StudyStackParamList, "Leaderboards">;
