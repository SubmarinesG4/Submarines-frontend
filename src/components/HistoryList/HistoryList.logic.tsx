import { Translation } from "@/types/Translation";
import {
  UseHistoryListOptions,
  UseHistoryListReturn,
} from "./HistoryList.types";
import { api } from "@/app/services/api";
import { useAppSelector } from "@/app/store";

function useLogic(options: UseHistoryListOptions): UseHistoryListReturn {
  const { translationKey } = options;
  const user = useAppSelector((state) => state.userSlice.user);
  const { data, error, isLoading } = api.useGetTranslationQuery({
    tenant: user.attributes["custom:tenantId"] as string,
    key: translationKey,
  });

  return {
    data,
    error,
    isLoading,
  };
}

export default useLogic;
