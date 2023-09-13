import { Module } from "@src/types";
import { pb } from "@src/util";
import { useQuery } from "react-query";

export const useModuleRepository = () => {
  const list = useQuery<Module[]>("list-modules", () => {
    return pb.collection("modules").getFullList<Module>({
      expand: "notes(module)",
    });
  });

  return { list };
};
