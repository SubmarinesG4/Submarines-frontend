import { getData } from "@/globals/axios";
import { Translation } from "@/types/Translation";
import { useQuery } from "react-query";

type GetAllTranslationsResponse = {
	items: Translation[]
}

async function getAllTranslations() {
	const response = await getData<GetAllTranslationsResponse>(`/translation/1/`)
	return response.data
}

export const useTranslationGetAllQuery = () => useQuery(['translations'], () => getAllTranslations())
