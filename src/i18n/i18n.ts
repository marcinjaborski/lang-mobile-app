import { DEFAULT_LANG } from "@src/util";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./resources_en";
import { pl } from "./resources_pl";

export const defaultNS = "shared";
export const resources = {
  en,
  pl,
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources,
    defaultNS,
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then();
