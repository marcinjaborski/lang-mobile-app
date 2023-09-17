import { useUserRepository } from "@src/hooks";
import { User } from "@src/types";
import { getAvatarColor, PB_FILES } from "@src/util";
import { Avatar, Chip } from "react-native-paper";

type FriendChipProps = {
  friend: User;
};

export const FriendChip = ({ friend }: FriendChipProps) => {
  const { updateUser } = useUserRepository();

  const onDeleteFriend = () => {
    updateUser.mutate({
      "friends-": friend.id,
    });
  };

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
      {friend.username}
    </Chip>
  );
};
