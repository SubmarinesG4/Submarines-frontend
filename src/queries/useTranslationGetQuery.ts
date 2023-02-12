import { getData } from "@/globals/axios";
import { Translation } from "@/types/Translation";
import { useQuery } from "react-query";

async function getTranslation(key: string) {
	const response = await getData<Translation>(`/translation/1/${key}`)
	return response.data
}

export const useTranslationGetQuery = (key: string) => useQuery(['translation', key], () => getTranslation(key))
