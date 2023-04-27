import { UseTranslationDrawerOptions, UseTranslationDrawerReturn } from "./TranslationDrawer.types";

function useLogic(options: UseTranslationDrawerOptions): UseTranslationDrawerReturn {
    const { translationKey } = options;

    function handleSave() {
        // TODO: implement
    }

    return {
        handleSave,
    };
}

export default useLogic;