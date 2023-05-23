import { UseHistoryList, HistoryListView } from "./HistoryList.types";
import useLogic from "./HistoryList.logic";

export const useHistoryList: UseHistoryList = useLogic;

import View from "./HistoryList.view";
const HistoryList: HistoryListView = View;
export default HistoryList;
