import { TranslationSend } from "@/types/TranslationSend";
import React from "react";

export type UseNewTranslationListOptions = {};

export type UseNewTranslationListReturn = {};

export type UseNewTranslationList = (
  options: UseNewTranslationListOptions
) => UseNewTranslationListReturn;

export type NewTranslationListProps = {
  toggleDrawer: (open: boolean) => any;
  setDrawerOpenState: (open: boolean) => any;
  showError: (message: string) => any;
  languages: string[];
  defaultTranslationLanguage: string;
};

export type NewTranslationListView = React.FC<NewTranslationListProps>;
