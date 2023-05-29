import { TenantDetailed } from "@/types/Tenant";

export type UseNewTranslationListOptions = {
  id: string;
};

export type UseNewTranslationListReturn = {
  tenant: TenantDetailed | undefined;
  isLoading: boolean;
};

export type EditTenantFormProps = {
  tenantName: string;
  closeDrawer: () => void;
  showError: (message: string) => any;
};
