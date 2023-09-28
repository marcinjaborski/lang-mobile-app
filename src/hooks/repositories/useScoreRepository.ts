import { useUserRepository } from "@src/hooks";
import { Score, ScoreToCreate } from "@src/types";
import { pb, PbError } from "@src/util";
import { useMutation, useQuery } from "react-query";

const COLLECTION = "scores";

export const useScoreRepository = (studySetSharedId?: string) => {
  const { currentUser } = useUserRepository();

  const list = useQuery(["list-scores", studySetSharedId], () => {
    return pb.collection(COLLECTION).getFullList<Score>({
      ...(studySetSharedId && { filter: `studySetSharedId = "${studySetSharedId}"` }),
      expand: "user",
      sort: "-score",
    });
  });

  const create = useMutation<Score, PbError, ScoreToCreate>((score) => {
    return pb.collection(COLLECTION).create({ ...score, user: currentUser?.id });
  });

  return { list, create };
};
