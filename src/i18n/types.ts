import { defaultNS, resources } from "./i18n";
import { en } from "./resources_en";

export type Resource = typeof en;

export type AppLanguage = keyof typeof resources;

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}
