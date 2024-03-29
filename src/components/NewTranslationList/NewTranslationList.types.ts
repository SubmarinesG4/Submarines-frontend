export type UseNewTranslationListOptions = {};

export type UseNewTranslationListReturn = {
	tenant: string;
	languages: string[];
	defaultTranslationLanguage: string;
};

export type UseNewTranslationList = (
	options: UseNewTranslationListOptions
) => UseNewTranslationListReturn;

export type NewTranslationListProps = {
	toggleDrawer: (open: boolean) => any;
	setDrawerOpenState: (open: boolean) => any;
	showError: (message: string) => any;
};
