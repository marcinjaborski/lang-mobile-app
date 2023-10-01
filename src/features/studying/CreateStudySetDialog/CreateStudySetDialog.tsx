import { ScrollView } from "react-native";
import { Button, Dialog, RadioButton, Snackbar, Text, TextInput } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";

import { TermsFrom, useCreateStudySetDialog } from "./useCreateStudySetDialog";

type CreateStudySetDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export const CreateStudySetDialog = ({ visible, onClose }: CreateStudySetDialogProps) => {
  const {
    t,
    name,
    setName,
    from,
    setFrom,
    selectedModule,
    selectedNote,
    onDismiss,
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
  } = useCreateStudySetDialog(onClose);

  return (
    <>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{t("title")}</Dialog.Title>
        <Dialog.Content>
          <Dialog.ScrollArea className="max-h-80">
            <ScrollView>
              <TextInput label={t("name")} value={name} onChangeText={setName} />
              <RadioButton.Group value={from} onValueChange={(value) => setFrom(value as TermsFrom)}>
                <RadioButton.Item label={t("all")} value="all" />
                <RadioButton.Item label={t("module")} value="module" />
                <RadioButton.Item label={t("note")} value="note" />
              </RadioButton.Group>
              {from === "module" ? (
                <PaperSelect
                  arrayList={selectedModule.list}
                  label={t("module")}
                  multiEnable={false}
                  selectedArrayList={selectedModule.selectedList}
                  value={selectedModule.value}
                  onSelection={(value) => {
                    setSelectedModule((prevState) => ({
                      ...prevState,
                      value: value.text,
                      selectedList: value.selectedList,
                    }));
                  }}
                />
              ) : null}
              {from === "note" ? (
                <PaperSelect
                  arrayList={selectedNote.list}
                  label={t("note")}
                  multiEnable={false}
                  selectedArrayList={selectedNote.selectedList}
                  value={selectedNote.value}
                  onSelection={(value) => {
                    setSelectedNote((prevState) => ({
                      ...prevState,
                      value: value.text,
                      selectedList: value.selectedList,
                    }));
                  }}
                />
              ) : null}
              <PaperSelect
                arrayList={includeTags.list}
                label={t("includeTags")}
                multiEnable
                selectedArrayList={includeTags.selectedList}
                value={includeTags.value}
                onSelection={(value) => {
                  setIncludeTags((prevState) => ({
                    ...prevState,
                    value: value.text,
                    selectedList: value.selectedList,
                  }));
                }}
              />
              <PaperSelect
                arrayList={excludeTags.list}
                label={t("excludeTags")}
                multiEnable
                selectedArrayList={excludeTags.selectedList}
                value={excludeTags.value}
                onSelection={(value) => {
                  setExcludeTags((prevState) => ({
                    ...prevState,
                    value: value.text,
                    selectedList: value.selectedList,
                  }));
                }}
              />
              <Text>{t("summary", { terms: studySetTerms.length })}</Text>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>{t("cancel")}</Button>
          <Button onPress={onCreate}>{t("create")}</Button>
        </Dialog.Actions>
      </Dialog>
      <Snackbar
        action={{ label: t("dismiss"), onPress: () => setError("") }}
        visible={error !== ""}
        onDismiss={() => setError("")}
      >
        {error}
      </Snackbar>
    </>
  );
};
