import { useGetTenantQuery } from "@/app/services/tenantsApiSlice";
import {
  UseNewTranslationListOptions,
  UseNewTranslationListReturn,
} from "./EditTenantForm.types";

function useLogic(
  options: UseNewTranslationListOptions
): UseNewTranslationListReturn {
  const { data: tenant, isLoading } = useGetTenantQuery({
    id: options.id,
  });

  return {
    tenant,
    isLoading,
  };
}

export default useLogic;
