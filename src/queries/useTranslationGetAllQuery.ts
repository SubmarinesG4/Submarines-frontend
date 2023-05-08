import { getData } from "@/globals/axios";
import { Translation } from "@/types/Translation";
import { useQuery } from "react-query";

type GetAllTranslationsResponse = {
  items: Translation[];
};

async function getAllTranslations(tenant: string) {
  const response = await getData<GetAllTranslationsResponse>(
    `/${tenant}/translation`
  );
  return response.data;
}

export const useTranslationGetAllQuery = (tenant: string) =>
  useQuery(["translations", tenant], () => getAllTranslations(tenant));
