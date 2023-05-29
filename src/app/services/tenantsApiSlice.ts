import { api } from "./api";

const tenantsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTenants: builder.query<any, { filter?: string }>({
      query: ({ filter }) => {
        if (filter) return `/tenants?word=${filter}`;
        return `/tenants`;
      },
      providesTags: ["Tenants"],
    }),
    getTenant: builder.query<any, { id: string }>({
      query: ({ id }) => `/${id}`,
      providesTags: (result) => [{ type: "Tenant", id: result.tenantName }],
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
    updateTenant: builder.mutation<
      any,
      {
        tenantName: string;
        numberTranslationAvailable: number;
        listAvailableLanguages: string[];
        defaultTranslationLanguage: string;
      }
    >({
      query({ tenantName, ...tenant }) {
        return {
          url: `/${tenantName}`,
          method: "PATCH",
          body: tenant,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Tenants", id: arg.tenantName },
        "Tenants",
      ],
    }),
    deleteTenant: builder.mutation<
      any,
      {
        tenant: string;
      }
    >({
      query({ tenant }) {
        return {
          url: `${tenant}`,
          method: "DELETE",
          body: {},
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: (result, error, arg) => [
        { type: "Tenants", id: arg.tenant },
        "Tenants",
      ],
    }),
  }),
});

export const {
  useGetAllTenantsQuery,
  useGetTenantQuery,
  usePutTenantMutation,
  useDeleteTenantMutation,
  useUpdateTenantMutation,
} = tenantsApi;
