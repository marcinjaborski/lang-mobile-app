import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginData, User, UserToCreate } from "@src/types";
import { pb, PbError } from "@src/util";
import { RecordAuthResponse } from "pocketbase";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

const COLLECTION = "users";
export const CREDENTIALS = "credentials";

export const useUserRepository = () => {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model as User | null);

  const getByUsername = (username: string) =>
    pb.collection(COLLECTION).getFirstListItem<User>(`username="${username}"`);

  const login = useMutation<RecordAuthResponse<User>, PbError, LoginData>(
    ({ username, password }) => {
      return pb.collection(COLLECTION).authWithPassword(username, password, { expand: "friends" });
    },
    {
      async onSuccess(_, credentials) {
        await AsyncStorage.setItem(CREDENTIALS, JSON.stringify(credentials)).catch((e) => console.log(e));
      },
    },
  );

  const register = useMutation<User, PbError, UserToCreate>(
    (data) => {
      return pb.collection(COLLECTION).create(data);
    },
    {
      onSuccess(_, { username, email, password }) {
        login.mutate({ username: username || email, password });
      },
    },
  );

  const logout = async () => {
    pb.authStore.clear();
    await AsyncStorage.removeItem(CREDENTIALS).catch((e) => console.log(e));
  };

  const updateUser = useMutation<User, PbError, Partial<User>>(
    (user) => {
      return pb.collection(COLLECTION).update(currentUser?.id || "", user, { expand: "friends" });
    },
    {
      onSuccess(newUser) {
        setCurrentUser(newUser);
      },
    },
  );

  useEffect(() => {
    pb.authStore.onChange((_, model) => {
      setCurrentUser(model as User);
    });
  }, []);

  return { currentUser, getByUsername, login, register, logout, updateUser };
};
