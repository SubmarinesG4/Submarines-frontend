import { api } from "./api";

const tenantsApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllTenants: builder.query<any, void>({
			query: () => `/tenants`,
			providesTags: ["Tenants"],
		}),
		getTenant: builder.query<any, { id: string }>({
			query: ({ id }) => `/${id}`,
		}),
		putTenant: builder.mutation<
			any,
			{
				tenantName: string;
				numberTranslationAvailable: number;
				defaultTranslationLanguage: string;
				listAvailableLanguages: string[];
			}
		>({
			query({ tenantName, ...tenant }) {
				return {
					url: `/${tenantName}`,
					method: "PUT",
					body: tenant,
				};
			},
			invalidatesTags: (result, error, arg) => [
				{ type: "Tenants", id: arg.tenantName },
				"Tenants",
			],
		}),
	})
})


export const {
	useGetAllTenantsQuery,
	useGetTenantQuery,
	usePutTenantMutation,
} = tenantsApi;