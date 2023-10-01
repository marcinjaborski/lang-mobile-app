import { Note } from "@src/types";
import { pb, PbError } from "@src/util";
import { useQuery } from "react-query";

export const useNoteRepository = () => {
  const list = useQuery<Note[], PbError>("list-notes", () => {
    return pb.collection("notes").getFullList<Note>();
  });

  return { list };
};
