import { useTranslationGetAllQuery, useTranslationPutMutation } from "@/queries";
import { UseTranslationListOptions, UseTranslationListReturn } from "./TranslationList.types";

function useLogic(options: UseTranslationListOptions): UseTranslationListReturn {
	const { projectId } = options;

	const query = useTranslationGetAllQuery();
	const mutation = useTranslationPutMutation();

	function generateRandomString() {
		return (Math.random() + 1).toString(36).substring(7);
	}

	function handleClick() {
		mutation.mutate({
			projectId: projectId,
			translationKey: generateRandomString(),
			languages: [{ language: "IT", content: generateRandomString() }],
		});
	}

	return {
		handleClick,
		items: query.data?.items || [],
		isLoading: query.isLoading,
		error: query.error,
	};
}

export default useLogic;
