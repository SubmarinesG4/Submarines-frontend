import {
  UseNewTranslationList,
  NewTranslationListView,
} from "./NewTranslationList.types";
import useLogic from "./NewTranslationList.logic";

export const useNewTranslationList: UseNewTranslationList = useLogic;

import View from "./NewTranslationList.view";
const NewTranslationList: NewTranslationListView = View;
export default NewTranslationList;
