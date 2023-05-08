import { Translation } from "@/types/Translation";
import { UseTranslationDrawerOptions, UseTranslationDrawerReturn } from "./TranslationDrawer.types";

function useLogic(options: UseTranslationDrawerOptions): UseTranslationDrawerReturn {
    const { translationKey, items } = options;
    const translation: Translation = items.filter(item => item.translationKey === translationKey)[0];

    function handleSave() {
        // TODO: implement
    }

    return {
        handleSave,
        translation
    };
}

export default useLogic;