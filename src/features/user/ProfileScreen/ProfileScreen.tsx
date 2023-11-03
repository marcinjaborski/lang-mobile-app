import AsyncStorage from "@react-native-async-storage/async-storage";
import { FriendChip, ProfileScreenProps } from "@src/features/user";
import { useScoreRepository, useUserRepository } from "@src/hooks";
import { getAvatarColor, PB_FILES } from "@src/util";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Avatar, Button, Switch, Text, TextInput } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import { SafeAreaView } from "react-native-safe-area-context";

type ListItem = {
  _id: string;
  value: string;
};

type SelectState = {
  value: string;
  list: ListItem[];
  selectedList: ListItem[];
};

const languageMap = {
  English: "en",
  Polski: "pl",
};

export const ProfileScreen = ({}: ProfileScreenProps) => {
  const { t, i18n } = useTranslation("user");
  const { currentUser, updateUser, logout, getByUsername } = useUserRepository();
  const [newFriend, setNewFriend] = useState("");
  const scores = useScoreRepository();
  const [language, setLanguage] = useState<SelectState>({
    value: i18n.language === "en" ? "English" : "Polski",
    list: [
      { _id: "en", value: "English" },
      { _id: "pl", value: "Polski" },
    ],
    selectedList: [],
  });

  const points = scores.list.data?.reduce((acc, score) => {
    if (score.user !== currentUser?.id) return acc;
    return acc + score.score;
  }, 0);

  const onPublicChange = (value: boolean) => {
    updateUser.mutate({ public: value });
  };

  const onLogout = () => {
    logout();
  };

  const onAddFriend = async () => {
    try {
      const friend = await getByUsername(newFriend);
      updateUser.mutate(
        {
          "friends+": friend.id,
        },
        {
          onSuccess() {
            setNewFriend("");
          },
        },
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (!currentUser) {
    return <></>;
  }

  return (
    <SafeAreaView className="flex-1 bg-background items-center justify-center gap-3 p-3">
      {currentUser.avatar ? (
        <Avatar.Image size={96} source={{ uri: `${PB_FILES}/users/${currentUser.id}/${currentUser.avatar}` }} />
      ) : (
        <Avatar.Text
          label={currentUser.username.at(0)?.toUpperCase() || "U"}
          size={96}
          style={{ backgroundColor: getAvatarColor(currentUser.username) }}
        />
      )}
      <Text variant="headlineLarge">{currentUser.username}</Text>
      <Text variant="headlineMedium">{t("points", { points })}</Text>
      <View className="flex-row items-center">
        <Switch value={currentUser.public} onValueChange={onPublicChange} />
        <Text>{t("public")}</Text>
      </View>
      <View className="self-stretch">
        <PaperSelect
          arrayList={language.list}
          label={t("language")}
          multiEnable={false}
          selectedArrayList={language.selectedList}
          value={language.value}
          onSelection={(value) => {
            const lang = languageMap[value.text as keyof typeof languageMap];
            i18n.changeLanguage(lang);
            AsyncStorage.setItem("settings.lang", lang);
            setLanguage((prevState) => ({
              ...prevState,
              value: value.text,
              selectedList: value.selectedList,
            }));
          }}
        />
      </View>
      <TextInput
        className="self-stretch"
        label={t("newFriend")}
        right={<TextInput.Icon icon="plus" onPress={onAddFriend} />}
        value={newFriend}
        onChangeText={setNewFriend}
      />
      <View className="flex-row gap-2 flex-wrap">
        {currentUser.expand?.friends?.map((friend) => <FriendChip friend={friend} key={friend.id} />)}
      </View>
      <Button onPress={onLogout}>{t("logout")}</Button>
    </SafeAreaView>
  );
};
