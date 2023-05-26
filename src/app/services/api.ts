import { Translation } from "@/types/Translation";
import { TranslationFromList } from "@/types/TranslationFromList";
import { TranslationSend } from "@/types/TranslationSend";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetAllTranslationsResponse = {
	translations: TranslationFromList[];
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: "translationsApi",
	tagTypes: ["Translations"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/dev/",
		prepareHeaders: (headers) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = localStorage.getItem("authToken");
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getAllTranslations: builder.query<
			GetAllTranslationsResponse,
			{ tenant: string }
		>({
			query: ({ tenant }) => `${tenant}/translations`,
		}),
		getTranslation: builder.query<Translation, { tenant: string; key: string }>(
			{
				query: ({ tenant, key }) => `${tenant}/translation/${key}`,
			}
		),
		putTranslation: builder.mutation<
			any,
			{
				tenant: string;
				translationKey: string;
				translation: Partial<TranslationSend>;
			}
		>({
			query({ tenant, translationKey, translation }) {
				return {
					url: `${tenant}/translation/${translationKey}`,
					method: "POST",
					translation,
				};
			},
			// Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
			// that newly created post could show up in any lists.
			invalidatesTags: [{ type: "Translations", id: "LIST" }],
		}),
		getAllTenants: builder.query<any, void>({
			query: () => `/tenants`,
		}),
		getTenant: builder.query<any, { id: string }>({
			query: ({ id }) => `/${id}`,
		}),
		putTenant: builder.mutation<
			any,
			{
				tenantName: string
				numberTranslationAvailable: number
				defaultTranslationLanguage: string
				listAvailableLanguages: string[]
			}
		>({
			query({ tenantName, ...tenant }) {
				return {
					url: `/${tenantName}`,
					method: "PUT",
					body: tenant,
				};
			},
		}),
	}),

});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetAllTranslationsQuery,
	useGetTranslationQuery,
	usePutTranslationMutation,
	useGetAllTenantsQuery,
	useGetTenantQuery,
	usePutTenantMutation
} = api;
