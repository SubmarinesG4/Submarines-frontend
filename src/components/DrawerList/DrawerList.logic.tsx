import { Translation } from "@/types/Translation";
import { UseDrawerListOptions, UseDrawerListReturn } from "./DrawerList.types";
import { api } from "@/app/services/api";
import { useAppSelector } from "@/app/store";

function useLogic(options: UseDrawerListOptions): UseDrawerListReturn {
  const { translationKey } = options;
  const user = useAppSelector((state) => state.userSlice.user);
  const { data, error, isLoading } = api.useGetTranslationQuery({
    tenant: user.attributes["custom:tenantId"] as string,
    key: translationKey,
  });

  return {
    user,
    data,
    error,
    isLoading,
  };
}

export default useLogic;
