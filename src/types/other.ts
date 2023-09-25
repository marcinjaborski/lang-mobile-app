import { Term } from "@src/types";
import React from "react";

export const languages = ["pl", "en", "fr", "es", "it", "de"] as const;
export type Language = (typeof languages)[number];

export const shortcuts = ["b", "i", "u", "t", "l", "e", "r", "j"] as const;
export type Shortcut = (typeof shortcuts)[number];

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type NoteUrlParams = {
  id: string;
};

export type FlashcardsUrlParams = {
  id: string;
};

export type WithComponent<T> = T & { component?: React.ElementType };

export type DeeplResponse = {
  translations: {
    text: string;
    detected_source_language: string;
  }[];
};

export type Question = {
  term: Term;
  answers: string[];
};
