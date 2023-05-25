import { Translation } from "@/types/Translation";
import { UseDrawerListOptions, UseDrawerListReturn } from "./DrawerList.types";
import { api } from "@/app/services/api";

function useLogic(options: UseDrawerListOptions): UseDrawerListReturn {
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
