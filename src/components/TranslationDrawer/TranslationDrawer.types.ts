import { Translation } from "@/types/Translation";
import React from "react";

export type UseTranslationDrawerOptions = {
  translationKey: string;
  translation: Translation;
};

export type UseTranslationDrawerReturn = {
  handleSave: (obj: Translation) => void;
  translation: Translation;
};

export type UseTranslationDrawer = (
  options: UseTranslationDrawerOptions
) => UseTranslationDrawerReturn;

export type TranslationDrawerProps = {
  open: boolean;
  toggleDrawer: (open: boolean) => any;
  translation: Translation;
  translationKey: string;
};

export type TranslationDrawerView = React.FC<TranslationDrawerProps>;
