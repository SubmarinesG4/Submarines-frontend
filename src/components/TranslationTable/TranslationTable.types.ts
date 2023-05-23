import { Translation } from "@/types/Translation";
import React from "react";

export type UseTranslationTableOptions = {
  translationKey: string;
};

export type UseTranslationTableReturn = {};

export type UseTranslationTable = (
  options: UseTranslationTableOptions
) => UseTranslationTableReturn;

export type TranslationTableProps = {
  toggleDrawer: (open: boolean) => any;
  items: Translation[];
  showEdit: (translationKey: string) => any;
  showHistory: (translationKey: string) => any;
  showNew: () => any;
};

export type TranslationTableView = React.FC<TranslationTableProps>;
