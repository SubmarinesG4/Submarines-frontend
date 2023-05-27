import { UseHistoryListOptions, UseHistoryListReturn } from "./HistoryList.types";
import { useGetTranslationQuery } from "@/app/services/translationsApiSlice";
import { useAppSelector } from "@/app/store";

function useLogic(options: UseHistoryListOptions): UseHistoryListReturn {
	const { translationKey } = options;
	const user = useAppSelector((state) => state.userSlice.user);
	const { data, error, isLoading } = useGetTranslationQuery({
		tenant: user?.attributes["custom:tenantId"] as string,
		key: translationKey,
	});

	return {
		data,
		error,
		isLoading,
	};
}

export default useLogic;
