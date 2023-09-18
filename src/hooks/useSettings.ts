import { useSettingsRepository } from "@src/hooks";
import { AppLanguage } from "@src/i18n/types";
import { Language } from "@src/types";
import { DEFAULT_BASE_LANG, DEFAULT_LANG, DEFAULT_SEPARATOR, DEFAULT_TRANSLATION_LANG } from "@src/util";
import { useMemo } from "react";

export type UserSettings = {
  language: AppLanguage;
  separator: string;
  baseLang: Language;
  targetLang: Language;
};

export const useSettings = (): UserSettings | null => {
  const settingsRepository = useSettingsRepository();
  const settings = settingsRepository.view.data;

  return useMemo(() => {
    if (settingsRepository.view.isLoading || settingsRepository.view.isError) return null;

    if (!settings)
      return {
        language: DEFAULT_LANG,
        separator: DEFAULT_SEPARATOR,
        baseLang: DEFAULT_BASE_LANG,
        targetLang: DEFAULT_TRANSLATION_LANG,
      };

    return {
      language: settings.userLanguage || DEFAULT_LANG,
      separator: settings.separator || DEFAULT_SEPARATOR,
      baseLang: settings.defaultBaseLang || DEFAULT_BASE_LANG,
      targetLang: settings.defaultTargetLang || DEFAULT_TRANSLATION_LANG,
    };
  }, [settings, settingsRepository.view.isError, settingsRepository.view.isLoading]);
};
