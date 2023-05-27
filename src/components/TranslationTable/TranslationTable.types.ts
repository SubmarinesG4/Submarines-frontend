import { TranslationFromList } from "@/types/TranslationFromList";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export type UseTranslationTableOptions = {
	filter: { phrase: string; date: string; published: string };
	tenantName: string
};

export type UseTranslationTableReturn = {
	data: TranslationFromList[];
	isLoading: boolean;
	error: FetchBaseQueryError | SerializedError | undefined;
};

export type TranslationTableProps = {
	toggleDrawer: (open: boolean) => any;
	showEdit: (translationKey: string) => any;
	showHistory: (translationKey: string) => any;
	showNew: () => any;
	tenantName: string
};
