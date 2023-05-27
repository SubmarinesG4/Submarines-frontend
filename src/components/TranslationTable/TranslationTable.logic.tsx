import { api } from "@/app/services/api";
import {
  UseTranslationTableOptions,
  UseTranslationTableReturn,
} from "./TranslationTable.types";
import { useAppSelector } from "@/app/store";

function useLogic(
  options: UseTranslationTableOptions
): UseTranslationTableReturn {
  const { filter } = options;
  const user = useAppSelector((state) => state.userSlice.user);
  const { data, isLoading, error } = api.useGetAllTranslationsQuery({
    tenant: user.attributes["custom:tenantId"] as string,
    filter: filter,
  });

  return {
    data: data?.translations || [],
    isLoading,
    error,
  };
}

export default useLogic;
