import { UseNewTranslationListOptions, UseNewTranslationListReturn } from "./NewTranslationList.types";
import { useGetTenantQuery } from "@/app/services/tenantsApiSlice";
import { useParams } from "react-router-dom";

function useLogic(options: UseNewTranslationListOptions): UseNewTranslationListReturn {
	const { id } = useParams();
	const tenantQuery = useGetTenantQuery({
		id: id!,
	});

	return {
		tenant: id!,
		languages: tenantQuery.data?.listAvailableLanguages || [],
		defaultTranslationLanguage: tenantQuery.data?.defaultTranslationLanguage || "",
	};
}

export default useLogic;
