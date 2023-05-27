import { useGetAllTranslationsQuery } from "@/app/services/translationsApiSlice";
import { UseTranslationTableOptions, UseTranslationTableReturn } from "./TranslationTable.types";

function useLogic(options: UseTranslationTableOptions): UseTranslationTableReturn {
	const { filter, tenantName } = options;

	const { data, isLoading, error } = useGetAllTranslationsQuery({
		tenant: tenantName,
		filter: filter,
	});

	return {
		data: data?.translations || [],
		isLoading,
		error,
	};
}

export default useLogic;
