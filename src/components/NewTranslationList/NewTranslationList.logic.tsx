import { useAppSelector } from "@/app/store";
import {
  UseNewTranslationListOptions,
  UseNewTranslationListReturn,
} from "./NewTranslationList.types";
import { api } from "@/app/services/api";

function useLogic(
  options: UseNewTranslationListOptions
): UseNewTranslationListReturn {
  const user = useAppSelector((state) => state.userSlice.user);
  //console.log(user);
  const tenantQuery = api.useGetTenantQuery({
    id: user.attributes["custom:tenantId"],
  });

  return {
    tenant: user.attributes["custom:tenantId"],
    languages: tenantQuery.data?.listAvailableLanguages || [],
    defaultTranslationLanguage:
      tenantQuery.data?.defaultTranslationLanguage || "",
  };
}

export default useLogic;
