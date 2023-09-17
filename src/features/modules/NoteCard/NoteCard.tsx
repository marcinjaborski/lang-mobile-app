import { Note } from "@src/types";
import { ScrollView } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

type NoteCardProps = {
  note: Note;
};

export const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <Card className="m-3 w-56" collapsable elevation={1}>
      <Card.Title title={note.title} titleVariant="headlineSmall" />
      <Card.Content>
        <ScrollView className="max-h-52">
          <Text>{note.excerpt || note.content}</Text>
        </ScrollView>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="eye" mode="contained-tonal" size={24} onPress={() => console.log(note.id)} />
      </Card.Actions>
    </Card>
  );
};
