import { Translation } from "@/types/Translation";
import { UseTranslationDrawerOptions, UseTranslationDrawerReturn } from "./TranslationDrawer.types";

function useLogic(options: UseTranslationDrawerOptions): UseTranslationDrawerReturn {
	function handleSave(obj: Translation) {
		// TODO: save translation to DB
	}

	return {
		handleSave,
	};
}

export default useLogic;
