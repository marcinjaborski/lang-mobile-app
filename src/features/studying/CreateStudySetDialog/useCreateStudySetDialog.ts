import {
  useModuleRepository,
  useNoteRepository,
  useStudySetRepository,
  useTagRepository,
  useTermRepository,
} from "@src/hooks";
import { Term } from "@src/types";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type TermsFrom = "all" | "module" | "note";

type ListItem = {
  _id: string;
  value: string;
};

type SelectState = {
  value: string;
  list: ListItem[];
  selectedList: ListItem[];
};

const initialSelectState = {
  value: "",
  list: [],
  selectedList: [],
};

export const useCreateStudySetDialog = (onClose: () => void) => {
  const { t } = useTranslation("study", { keyPrefix: "createDialog" });
  const [name, setName] = useState("");
  const [from, setFrom] = useState<TermsFrom>("all");
  const [selectedModule, setSelectedModule] = useState<SelectState>(initialSelectState);
  const [selectedNote, setSelectedNote] = useState<SelectState>(initialSelectState);
  const [includeTags, setIncludeTags] = useState<SelectState>(initialSelectState);
  const [excludeTags, setExcludeTags] = useState<SelectState>(initialSelectState);
  const [studySetTerms, setStudySetTerms] = useState<Term[]>([]);
  const modules = useModuleRepository();
  const notes = useNoteRepository();
  const tags = useTagRepository();
  const terms = useTermRepository();
  const studySets = useStudySetRepository();
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedModule.list.length !== 0) return;
    setSelectedModule((prevState) => ({
      ...prevState,
      list: modules.list.data?.map((module) => ({ _id: module.id, value: module.name })) || [],
    }));
  }, [modules.list.data, selectedModule.list.length]);

  useEffect(() => {
    if (selectedNote.list.length !== 0) return;
    setSelectedNote((prevState) => ({
      ...prevState,
      list: notes.list.data?.map((note) => ({ _id: note.id, value: note.title })) || [],
    }));
  }, [notes.list.data, selectedNote.list.length]);

  useEffect(() => {
    const list = tags.list.data?.map((tag) => ({ _id: tag.id, value: tag.label })) || [];
    if (includeTags.list.length === 0) {
      setIncludeTags((prevState) => ({ ...prevState, list }));
    }
    if (excludeTags.list.length === 0) {
      setExcludeTags((prevState) => ({ ...prevState, list }));
    }
  }, [excludeTags.list.length, includeTags.list.length, tags.list.data]);

  useEffect(() => {
    let termsInStudySet = terms.list.data;
    if (!termsInStudySet) return;
    if (from === "module") {
      const module = modules.list.data?.find(({ id }) => id === selectedModule.selectedList.at(0)?._id);
      termsInStudySet = termsInStudySet.filter(
        (term) => module?.expand["notes(module)"]?.find((note) => note.id === term.note),
      );
    }
    if (from === "note") {
      const note = notes.list.data?.find(({ id }) => id === selectedNote.selectedList.at(0)?._id);
      termsInStudySet = termsInStudySet.filter((term) => term.note === note?.id);
    }
    if (includeTags.selectedList.length > 0) {
      termsInStudySet = termsInStudySet.filter(
        (term) => _.intersection(term.tags, includeTags.selectedList?.map((tag) => tag._id)).length > 0,
      );
    }
    if (excludeTags.selectedList.length > 0) {
      termsInStudySet = termsInStudySet.filter(
        (term) => _.intersection(term.tags, excludeTags.selectedList?.map((tag) => tag._id)).length === 0,
      );
    }
    setStudySetTerms(termsInStudySet);
  }, [
    excludeTags.selectedList,
    from,
    includeTags.selectedList,
    modules.list.data,
    notes.list.data,
    selectedModule.selectedList,
    selectedNote.selectedList,
    terms.list.data,
  ]);

  const onDismiss = () => {
    onClose();
    setName("");
    setFrom("all");
    setSelectedModule(initialSelectState);
  };

  const onCreate = () => {
    if (name === "") {
      setError(t("emptyName"));
      return;
    }
    if (from === "module" && selectedModule.selectedList.length === 0) {
      setError(t("selectModule"));
      return;
    }
    if (from === "note" && selectedNote.selectedList.length === 0) {
      setError(t("selectNote"));
      return;
    }
    if (studySetTerms.length === 0) {
      setError(t("noTerms"));
      return;
    }
    studySets.create.mutate(
      { title: name, terms: studySetTerms.map((term) => term.id), shared: [] },
      {
        onSuccess() {
          onDismiss();
        },
      },
    );
  };

  return {
    t,
    onDismiss,
    name,
    setName,
    from,
    setFrom,
    selectedModule,
    selectedNote,
    setSelectedModule,
    setSelectedNote,
    includeTags,
    setIncludeTags,
    excludeTags,
    setExcludeTags,
    studySetTerms,
    onCreate,
    error,
    setError,
  };
};
