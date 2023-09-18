import { NoteScreenProps } from "@src/features/notes";
import { useSettings } from "@src/hooks";
import { serialize, toCountryCode } from "@src/util";
import { ScrollView, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const NoteScreen = ({ route }: NoteScreenProps) => {
  const note = route.params.note;
  const settings = useSettings();

  return (
    <SafeAreaView className="bg-background flex-1 p-3">
      <ScrollView>
        <View className="flex-row gap-2 items-center">
          <Text variant="displayMedium">{note.title}</Text>
          <CountryFlag isoCode={toCountryCode(note.baseLang || settings?.baseLang || "")} size={24} />
          <CountryFlag isoCode={toCountryCode(note.targetLang || settings?.targetLang || "")} size={24} />
        </View>
        <Text>{serialize(note.content)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
