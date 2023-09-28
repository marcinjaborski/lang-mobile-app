import { FriendChip, ProfileScreenProps } from "@src/features/user";
import { useScoreRepository, useUserRepository } from "@src/hooks";
import { getAvatarColor, PB_FILES } from "@src/util";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Avatar, Button, Switch, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProfileScreen = ({}: ProfileScreenProps) => {
  const { t } = useTranslation("user");
  const { currentUser, updateUser, logout, getByUsername } = useUserRepository();
  const [newFriend, setNewFriend] = useState("");
  const scores = useScoreRepository();

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
        <Avatar.Image source={{ uri: `${PB_FILES}/users/${currentUser.id}/${currentUser.avatar}` }} />
      ) : (
        <Avatar.Text
          label={currentUser.username.at(0)?.toUpperCase() || "U"}
          style={{ backgroundColor: getAvatarColor(currentUser.username) }}
        />
      )}
      <Text variant="headlineLarge">{currentUser.username}</Text>
      <Text variant="headlineMedium">{t("points", { points })}</Text>
      <View className="flex-row items-center">
        <Switch value={currentUser.public} onValueChange={onPublicChange} />
        <Text>{t("public")}</Text>
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
