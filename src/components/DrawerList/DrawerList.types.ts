import { Translation } from "@/types/Translation";
import React from "react";

export type UseDrawerListOptions = {};

export type UseDrawerListReturn = {};

export type UseDrawerList = (
  options: UseDrawerListOptions
) => UseDrawerListReturn;

export type DrawerListProps = {
  toggleDrawer: (open: boolean) => any;
  setDrawerOpenState: (open: boolean) => any;
  translationKey: string;
};

export type DrawerListView = React.FC<DrawerListProps>;
