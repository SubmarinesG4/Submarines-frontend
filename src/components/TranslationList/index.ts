import type { UseTranslationList, TranslationListView } from "./TranslationList.types"

import useLogic from "./TranslationList.logic";
export const useTranslationList: UseTranslationList = useLogic

import View from "./TranslationList.view"
const TranslationList: TranslationListView = View
export default TranslationList