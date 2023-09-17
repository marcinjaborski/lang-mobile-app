import { NoteCard } from "@src/features/modules";
import { Module } from "@src/types";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

type NoteShelfProps = {
  module: Module;
};

export const NoteShelf = ({ module }: NoteShelfProps) => {
  return (
    <>
      <Text variant="headlineSmall">{module.name}</Text>
      <ScrollView className="p-3 gap-5" horizontal>
        {module.expand?.["notes(module)"]?.map((note) => <NoteCard key={note.id} note={note} />)}
      </ScrollView>
    </>
  );
};
