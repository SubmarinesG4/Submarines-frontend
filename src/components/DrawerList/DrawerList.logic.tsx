import { UseDrawerListOptions, UseDrawerListReturn } from "./DrawerList.types";
import { useGetTranslationQuery } from "@/app/services/translationsApiSlice";
import { useAppSelector } from "@/app/store";
import { useParams } from "react-router-dom";

function useLogic(options: UseDrawerListOptions): UseDrawerListReturn {
  const { translationKey } = options;
  const user = useAppSelector((state) => state.userSlice.user);
  const { id } = useParams();
  const { data, error, isLoading } = useGetTranslationQuery({
    tenant: id!,
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
