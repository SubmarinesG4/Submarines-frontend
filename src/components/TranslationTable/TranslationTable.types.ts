import { Translation } from "@/types/Translation";
import { TranslationFromList } from "@/types/TranslationFromList";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";

export type UseTranslationTableOptions = {
  filter: { phrase: string; date: string; published: string };
};

export type UseTranslationTableReturn = {
  data: TranslationFromList[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};

export type UseTranslationTable = (
  options: UseTranslationTableOptions
) => UseTranslationTableReturn;

export type TranslationTableProps = {
  toggleDrawer: (open: boolean) => any;
  showEdit: (translationKey: string) => any;
  showHistory: (translationKey: string) => any;
  showNew: () => any;
};

export type TranslationTableView = React.FC<TranslationTableProps>;
