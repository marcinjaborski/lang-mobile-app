import { LoginData, User, UserToCreate } from "@src/types";
import { pb, PbError } from "@src/util";
import { RecordAuthResponse } from "pocketbase";
import { useMutation } from "react-query";

export const useUserRepository = () => {
  const currentUser = pb.authStore.model as User | null;

  const login = useMutation<RecordAuthResponse<User>, PbError, LoginData>(({ username, password }) => {
    return pb.collection("users").authWithPassword(username, password, { expand: "friends" });
  });

  const register = useMutation<User, PbError, UserToCreate>(
    (data) => {
      return pb.collection("users").create(data);
    },
    {
      onSuccess(_, { username, password }) {
        login.mutate({ username, password });
      },
    },
  );

  return { currentUser, login, register };
};
