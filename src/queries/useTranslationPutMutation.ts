import { putData } from "@/globals/axios";
import { Translation } from "@/types/Translation";
import { useMutation, useQueryClient } from "react-query";

async function putTranslation({
  tenant,
  translation,
}: {
  tenant: string;
  translation: Translation;
}) {
  const response = await putData<Translation>(
    `/${tenant}/translation/${translation.translationKey}`,
    translation
  );
  return response.data;
}

export const useTranslationPutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(putTranslation, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "translations",
        putTranslation.arguments[0].tenant,
      ]);
      queryClient.invalidateQueries([
        "translation",
        {
          tenant: putTranslation.arguments[0].tenant,
          key: putTranslation.arguments[0].translation.translationKey,
        },
      ]);
    },
  });
};
