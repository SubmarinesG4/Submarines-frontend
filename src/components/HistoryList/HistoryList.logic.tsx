import { Translation } from "@/types/Translation";
import {
  UseHistoryListOptions,
  UseHistoryListReturn,
} from "./HistoryList.types";
import { api } from "@/app/services/api";

function useLogic(options: UseHistoryListOptions): UseHistoryListReturn {
  const { translationKey } = options;

  const { data, error, isLoading } = api.useGetTranslationQuery({
    tenant: "tenant3",
    key: translationKey,
  });

  return {
    data,
    error,
    isLoading,
  };
}

export default useLogic;
