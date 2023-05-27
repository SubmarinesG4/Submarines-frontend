import { Translation } from "@/types/Translation";

export type UseTranslationDrawerOptions = {
	translationKey: string;
	translation: Translation;
};

export type UseTranslationDrawerReturn = {
	handleSave: (obj: Translation) => void;
};


export type TranslationDrawerProps = {
	open: boolean;
	toggleDrawer: (open: boolean) => any;
	setDrawerOpenState: (open: boolean) => any;
	translationKey: string;
	view: 1 | 2 | 3;
};