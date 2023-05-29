import {
  UseHistoryListOptions,
  UseHistoryListReturn,
} from "./HistoryList.types";
import { useGetTranslationQuery } from "@/app/services/translationsApiSlice";
import { useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";

function useLogic(options: UseHistoryListOptions): UseHistoryListReturn {
  const { translationKey } = options;
  const user = useAppSelector((state) => state.userSlice.user);
  const { id } = useParams();
  const { data, error, isLoading } = useGetTranslationQuery({
    tenant: id!,
    key: translationKey,
  });

  return {
    data,
    error,
    isLoading,
  };
}

export default useLogic;
