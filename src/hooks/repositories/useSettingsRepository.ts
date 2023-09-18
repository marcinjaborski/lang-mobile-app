import { Settings } from "@src/types";
import { pb } from "@src/util";
import { useQuery } from "react-query";

export const useSettingsRepository = () => {
  const view = useQuery<Settings>("view-settings", () => pb.collection("settings").getFirstListItem<Settings>(""), {
    retry: 0,
  });

  return { view };
};
