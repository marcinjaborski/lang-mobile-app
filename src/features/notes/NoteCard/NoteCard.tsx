import { OpenNoteFunction } from "@src/features/notes";
import { useSettings } from "@src/hooks";
import { Note } from "@src/types";
import { serialize, toCountryCode } from "@src/util";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import CountryFlag from "react-native-country-flag";
import { Card, IconButton, Text } from "react-native-paper";

type NoteCardProps = {
  note: Note;
  openNote: OpenNoteFunction;
};

export const NoteCard = ({ note, openNote }: NoteCardProps) => {
  const { t } = useTranslation("notes");
  const settings = useSettings();

  return (
    <Card className="m-3 w-56" collapsable elevation={1}>
      <Card.Title
        className="mr-4"
        left={() => <CountryFlag isoCode={toCountryCode(note.baseLang || settings?.baseLang || "")} size={24} />}
        right={() => <CountryFlag isoCode={toCountryCode(note.targetLang || settings?.targetLang || "")} size={24} />}
        title={note.title}
        titleVariant="headlineSmall"
      />
      <Card.Content>
        <ScrollView className="max-h-52">
          <Text>{note.excerpt || serialize(note.content) || <Text className="italic">{t("noContent")}</Text>}</Text>
        </ScrollView>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="eye" mode="contained-tonal" size={24} onPress={() => openNote(note)} />
      </Card.Actions>
    </Card>
  );
};
