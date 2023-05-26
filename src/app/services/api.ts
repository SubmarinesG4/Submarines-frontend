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
      {
        tenant: string;
        filter: { phrase: string; date: string; published: string };
      }
    >({
      query: ({ tenant, filter }) =>
        `${tenant}/translations?published=${filter.published}&date=${filter.date}&word=${filter.phrase}`,
      providesTags: ["Translations"],
    }),
    getTranslation: builder.query<Translation, { tenant: string; key: string }>(
      {
        query: ({ tenant, key }) => `${tenant}/translation/${key}`,
        providesTags: (result, error, arg) =>
          result
            ? [
                { type: "Translations", id: result.translationKey },
                "Translations",
              ]
            : ["Translations"],
      }
    ),
    putTranslation: builder.mutation<
      any,
      {
        tenant: string;
        key: string;
        translation: Partial<TranslationSend>;
      }
    >({
      query({ tenant, key, translation }) {
        return {
          url: `${tenant}/translation/${key}`,
          method: "PUT",
          body: translation,
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: (result, error, arg) => [
        { type: "Translations", id: arg.key },
        "Translations",
      ],
    }),
    deleteTranslation: builder.mutation<
      any,
      {
        tenant: string;
        key: string;
      }
    >({
      query({ tenant, key }) {
        return {
          url: `${tenant}/translation/${key}`,
          method: "DELETE",
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: (result, error, arg) => [
        { type: "Translations", id: arg.key },
        "Translations",
      ],
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
  usePutTenantMutation,
} = api;
