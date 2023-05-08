import { getData } from "@/globals/axios";
import { Translation } from "@/types/Translation";
import { useQuery } from "react-query";

async function getTranslation(tenant: string, key: string) {
  const response = await getData<Translation>(`/${tenant}/translation/${key}`);
  return response.data;
}

export const useTranslationGetQuery = (tenant: string, key: string) =>
  useQuery(["translation", { tenant, key }], () => getTranslation(tenant, key));
