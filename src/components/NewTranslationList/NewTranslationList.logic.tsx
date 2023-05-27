import { useAppSelector } from "@/app/store";
import { UseNewTranslationListOptions, UseNewTranslationListReturn } from "./NewTranslationList.types";
import { useGetTenantQuery } from "@/app/services/tenantsApiSlice";

function useLogic(options: UseNewTranslationListOptions): UseNewTranslationListReturn {
	const user = useAppSelector((state) => state.userSlice.user);
	const tenantQuery = useGetTenantQuery({
		id: user?.attributes["custom:tenantId"]!,
	});

	return {
		tenant: user?.attributes["custom:tenantId"]!,
		languages: tenantQuery.data?.listAvailableLanguages || [],
		defaultTranslationLanguage: tenantQuery.data?.defaultTranslationLanguage || "",
	};
}

export default useLogic;
