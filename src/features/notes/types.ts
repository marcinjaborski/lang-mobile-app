import { StackScreenProps } from "@react-navigation/stack";
import { Note } from "@src/types";

export type NotesStackParamList = {
  Modules: undefined;
  Note: { note: Note };
};

export type ModulesScreenProps = StackScreenProps<NotesStackParamList, "Modules">;
export type NoteScreenProps = StackScreenProps<NotesStackParamList, "Note">;

export type OpenNoteFunction = (note: Note) => void;
