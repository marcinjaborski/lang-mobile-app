import { Tag } from "@src/types";
import { pb, PbError } from "@src/util";
import { useQuery } from "react-query";

export const useTagRepository = () => {
  const list = useQuery<Tag[], PbError>("list-tags", () => {
    return pb.collection("tags").getFullList<Tag>();
  });

  return { list };
};
