import { useScoreRepository, useUserRepository } from "@src/hooks";
import { User } from "@src/types";
import { getAvatarColor, PB_FILES } from "@src/util";
import { useTranslation } from "react-i18next";
import { Avatar, Chip } from "react-native-paper";

type FriendChipProps = {
  friend: User;
};

export const FriendChip = ({ friend }: FriendChipProps) => {
  const { t } = useTranslation("user");
  const { updateUser } = useUserRepository();
  const scores = useScoreRepository();

  const onDeleteFriend = () => {
    updateUser.mutate({
      "friends-": friend.id,
    });
  };

  const getPoints = (userId: string) =>
    scores.list.data?.reduce((acc, score) => {
      if (score.user !== userId) return acc;
      return acc + score.score;
    }, 0);

  return (
    <Chip
      avatar={
        friend.avatar ? (
          <Avatar.Image source={{ uri: `${PB_FILES}/users/${friend.id}/${friend.avatar}` }} />
        ) : (
          <Avatar.Text
            label={friend.username.at(0)?.toUpperCase() || "U"}
            size={24}
            style={{ backgroundColor: getAvatarColor(friend.username) }}
          />
        )
      }
      onClose={onDeleteFriend}
    >
      {friend.username} - {t("points", { points: getPoints(friend.id) })}
    </Chip>
  );
};
