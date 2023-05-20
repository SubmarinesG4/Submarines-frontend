import { Translation } from "@/types/Translation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetAllTranslationsResponse = {
  items: Translation[];
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "pokemonApi",
  tagTypes: ["Translations"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/dev/",
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = localStorage.getItem("auth");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTranslations: builder.query<GetAllTranslationsResponse, void>({
      query: () => `translation/1/`,
    }),
    putTranslation: builder.mutation<any, Partial<any>>({
      query(body) {
        return {
          url: `1/translation/${body.id}`,
          method: "POST",
          body,
        };
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: "Translations", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTranslationsQuery, usePutTranslationMutation } = api;