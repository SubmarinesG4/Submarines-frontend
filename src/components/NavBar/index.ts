import { UseNavBar, NavBarView } from "./NavBar.types";
import useLogic from "./NavBar.logic";

export const useNavBar: UseNavBar = useLogic;

import View from "./NavBar.view";
const NavBar: NavBarView = View;
export default NavBar;
