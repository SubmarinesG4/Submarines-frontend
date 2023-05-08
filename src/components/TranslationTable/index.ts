import { UseTranslationTable, TranslationTableView } from "./TranslationTable.types";
import useLogic from "./TranslationTable.logic";

export const useTranslationTable: UseTranslationTable = useLogic

import View from "./TranslationTable.view"
const TranslationTable: TranslationTableView = View
export default TranslationTable