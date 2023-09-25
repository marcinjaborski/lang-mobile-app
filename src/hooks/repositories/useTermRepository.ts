import { Term } from "@src/types";
import { pb, PB_CUSTOM_ROUTES, PbError } from "@src/util";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useTermRepository = () => {
  const queryClient = useQueryClient();

  const list = useQuery<Term[]>("list-terms", () => {
    return pb.collection("terms").getFullList<Term>({
      expand: "note,tags",
    });
  });

  const updateUnderstanding = useMutation<void, PbError, string[]>((terms) => {
    return pb.send(`${PB_CUSTOM_ROUTES}/updateUnderstanding`, { method: "POST", body: { terms } });
  });

  const deleteMutation = useMutation<boolean, PbError, string>(
    (id) => {
      return pb.collection("terms").delete(id);
    },
    {
      async onSuccess() {
        await queryClient.invalidateQueries("list-terms");
      },
    },
  );

  return { list, updateUnderstanding, delete: deleteMutation };
};
