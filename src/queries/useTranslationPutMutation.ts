import { putData } from "@/globals/axios";
import { Translation } from "@/types/Translation";
import { useMutation, useQueryClient } from "react-query";

async function putTranslation(translation: Translation) {
	const response = await putData<Translation>(`/translation/create`, translation)
	return response.data
}

export const useTranslationPutMutation = () => {
	const queryClient = useQueryClient()

	return useMutation(
		putTranslation,
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["translations"])
			}
		})
}
