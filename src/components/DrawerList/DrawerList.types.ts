import { Translation } from "@/types/Translation";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";

export type UseDrawerListOptions = {
  translationKey: string;
};

export type UseDrawerListReturn = {
  user: any;
  data: Translation | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};

export type UseDrawerList = (
  options: UseDrawerListOptions
) => UseDrawerListReturn;

export type DrawerListProps = {
  toggleDrawer: (open: boolean) => any;
  setDrawerOpenState: (open: boolean) => any;
  showError: (message: string) => any;
  translationKey: string;
};

export type DrawerListView = React.FC<DrawerListProps>;
