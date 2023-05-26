import { api } from "@/app/services/api";
import {
  UseTranslationTableOptions,
  UseTranslationTableReturn,
} from "./TranslationTable.types";

function useLogic(
  options: UseTranslationTableOptions
): UseTranslationTableReturn {
  const { filter } = options;

  const { data, isLoading, error } = api.useGetAllTranslationsQuery({
    tenant: "tenant3",
    filter: filter,
  });

  return {
    data: data?.translations || [],
    isLoading,
    error,
  };
}

export default useLogic;
