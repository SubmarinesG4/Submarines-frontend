import { QueryClient } from "react-query";

import { useTranslationGetQuery } from "./useTranslationGetQuery";
import { useTranslationGetAllQuery } from "./useTranslationGetAllQuery";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
			retry: 0
		},
	},
})

export { queryClient, useTranslationGetQuery, useTranslationGetAllQuery }
