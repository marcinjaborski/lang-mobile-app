import { StudySet, StudySetToCreate, UpdateRecord } from "@src/types";
import { pb, PB_CUSTOM_ROUTES, PbError } from "@src/util";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useStudySetRepository = (studySetId = "") => {
  const queryClient = useQueryClient();

  const view = useQuery<StudySet>(["view-studySets", studySetId], () => {
    if (!studySetId) return new Promise<StudySet>(() => {});
    return pb.collection("studySets").getOne<StudySet>(studySetId, {
      expand: "terms,shared",
    });
  });

  const list = useQuery<StudySet[]>("list-studySets", () => {
    return pb.collection("studySets").getFullList<StudySet>({
      expand: "terms,shared",
    });
  });

  const create = useMutation<StudySet, PbError, StudySetToCreate>(
    (studySet) => {
      return pb.collection("studySets").create({
        ...studySet,
        sharedId: crypto.randomUUID(),
        owner: pb.authStore.model!.id,
      });
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-studySets");
      },
    },
  );

  const update = useMutation<StudySet, PbError, UpdateRecord<StudySetToCreate>>(
    ({ id, record }) => {
      return pb.collection("studySets").update(id, record);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-studySets");
      },
    },
  );

  const share = useMutation<void, PbError, { user: string; studySet: string }>((shareData) => {
    return pb.send(`${PB_CUSTOM_ROUTES}/shareStudySet`, { method: "PATCH", body: shareData });
  });

  const deleteMutation = useMutation<boolean, PbError, string>(
    (id) => {
      return pb.collection("studySets").delete(id);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-studySets");
      },
    },
  );

  return { view, list, create, update, share, delete: deleteMutation };
};
