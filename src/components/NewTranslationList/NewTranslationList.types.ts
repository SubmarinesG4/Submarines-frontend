import { TranslationSend } from "@/types/TranslationSend";
import React from "react";

export type UseNewTranslationListOptions = {};

export type UseNewTranslationListReturn = {
  tenant: string;
  languages: string[];
  defaultTranslationLanguage: string;
};

export type UseNewTranslationList = (
  options: UseNewTranslationListOptions
) => UseNewTranslationListReturn;

export type NewTranslationListProps = {
  toggleDrawer: (open: boolean) => any;
  setDrawerOpenState: (open: boolean) => any;
  showError: (message: string) => any;
};

export type NewTranslationListView = React.FC<NewTranslationListProps>;
