import { Translation } from "@/types/Translation";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React from "react";

export type UseHistoryListOptions = {
	translationKey: string;
};

export type UseHistoryListReturn = {
	data: Translation | undefined;
	isLoading: boolean;
	error: FetchBaseQueryError | SerializedError | undefined;
};

export type HistoryListProps = {
	toggleDrawer: (open: boolean) => any;
	showError: (message: string) => any;
	translationKey: string;
};