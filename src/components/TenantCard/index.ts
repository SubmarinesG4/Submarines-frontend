import { UseTenantCard, TenantCardView } from "./TenantCard.types";
import useLogic from "./TenantCard.logic";

export const useTenantCard: UseTenantCard = useLogic;

import View from "./TenantCard.view";
const TenantCard: TenantCardView = View;
export default TenantCard;
