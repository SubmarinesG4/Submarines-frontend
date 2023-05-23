import { Translation } from "@/types/Translation";
import React from "react";

export type UseHistoryListOptions = {};

export type UseHistoryListReturn = {};

export type UseHistoryList = (
  options: UseHistoryListOptions
) => UseHistoryListReturn;

export type HistoryListProps = {
  toggleDrawer: (open: boolean) => any;
  translation: Translation;
  translationKey: string;
};

export type HistoryListView = React.FC<HistoryListProps>;
