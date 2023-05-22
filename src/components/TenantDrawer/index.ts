import { UseTenantDrawer, TenantDrawerView } from "./TenantDrawer.types";
import useLogic from "./TenantDrawer.logic";

export const useTenantDrawer: UseTenantDrawer = useLogic

import View from "./TenantDrawer.view"
const TenantDrawer: TenantDrawerView = View
export default TenantDrawer