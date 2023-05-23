import { UseDrawerList, DrawerListView } from "./DrawerList.types";
import useLogic from "./DrawerList.logic";

export const useDrawerList: UseDrawerList = useLogic;

import View from "./DrawerList.view";
const DrawerList: DrawerListView = View;
export default DrawerList;
