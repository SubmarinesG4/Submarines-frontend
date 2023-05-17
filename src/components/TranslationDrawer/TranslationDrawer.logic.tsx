import { Translation } from "@/types/Translation";
import {
  UseTranslationDrawerOptions,
  UseTranslationDrawerReturn,
} from "./TranslationDrawer.types";

function useLogic(
  options: UseTranslationDrawerOptions
): UseTranslationDrawerReturn {
  const { translationKey, translation } = options;

  function handleSave(obj: Translation) {
    console.log(translation);
    // TODO: save translation to DB
  }

  return {
    handleSave,
    translation,
  };
}

export default useLogic;
