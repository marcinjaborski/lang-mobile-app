import { NoteCard, OpenNoteFunction } from "@src/features/notes";
import { Module } from "@src/types";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

type NoteShelfProps = {
  module: Module;
  openNote: OpenNoteFunction;
};

export const NoteShelf = ({ module, openNote }: NoteShelfProps) => {
  return (
    <>
      <Text variant="headlineSmall">{module.name}</Text>
      <ScrollView className="p-3 gap-5" horizontal>
        {module.expand?.["notes(module)"]?.map((note) => <NoteCard key={note.id} note={note} openNote={openNote} />)}
      </ScrollView>
    </>
  );
};
