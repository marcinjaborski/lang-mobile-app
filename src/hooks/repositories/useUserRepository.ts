import { LoginData, User, UserToCreate } from "@src/types";
import { pb, PbError } from "@src/util";
import { RecordAuthResponse } from "pocketbase";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export const useUserRepository = () => {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model as User | null);

  useEffect(() => {
    pb.authStore.onChange((_, model) => {
      setCurrentUser(model as User);
    });
  }, []);

  const getByUsername = (username: string) => pb.collection("users").getFirstListItem<User>(`username="${username}"`);

  const login = useMutation<RecordAuthResponse<User>, PbError, LoginData>(({ username, password }) => {
    return pb.collection("users").authWithPassword(username, password, { expand: "friends" });
  });

  const register = useMutation<User, PbError, UserToCreate>(
    (data) => {
      return pb.collection("users").create(data);
    },
    {
      onSuccess(_, { username, email, password }) {
        login.mutate({ username: username || email, password });
      },
    },
  );

  const logout = () => {
    pb.authStore.clear();
  };

  const updateUser = useMutation<User, PbError, Partial<User>>(
    (user) => {
      return pb.collection("users").update(currentUser?.id || "", user, { expand: "friends" });
    },
    {
      onSuccess(newUser) {
        setCurrentUser(newUser);
      },
    },
  );

  return { currentUser, getByUsername, login, register, logout, updateUser };
};
