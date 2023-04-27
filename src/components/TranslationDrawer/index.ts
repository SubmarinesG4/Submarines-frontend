import { UseTranslationDrawer, TranslationDrawerView } from "./TranslationDrawer.types";
import useLogic from "./TranslationDrawer.logic";

export const useTranslationDrawer: UseTranslationDrawer = useLogic

import View from "./TranslationDrawer.view"
const TranslationDrawer: TranslationDrawerView = View
export default TranslationDrawer