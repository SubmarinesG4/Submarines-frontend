import { UseTenantTable, TenantTableView } from "./TenantTable.types";
import useLogic from "./TenantTable.logic";

export const useTenantTable: UseTenantTable = useLogic

import View from "./TenantTable.view"
const TenantTable: TenantTableView = View
export default TenantTable