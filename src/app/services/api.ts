import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: "api",
	tagTypes: ["Translations", "Tenants"],
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
	endpoints: (builder) => ({}),
});