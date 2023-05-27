import { UseDrawerListOptions, UseDrawerListReturn } from "./DrawerList.types";
import { useGetTranslationQuery } from "@/app/services/translationsApiSlice";
import { useAppSelector } from "@/app/store";

function useLogic(options: UseDrawerListOptions): UseDrawerListReturn {
	const { translationKey } = options;
	const user = useAppSelector((state) => state.userSlice.user);
	const { data, error, isLoading } = useGetTranslationQuery({
		tenant: user?.attributes["custom:tenantId"] as string,
		key: translationKey,
	});

	return {
		user,
		data,
		error,
		isLoading,
	};
}

export default useLogic;
