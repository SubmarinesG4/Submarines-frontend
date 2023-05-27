import { Translation } from '@/types/Translation';
import { TranslationFromList } from '@/types/TranslationFromList';
import { TranslationSend } from '@/types/TranslationSend';
import { api } from './api'

type GetAllTranslationsResponse = {
	translations: TranslationFromList[];
};

const translationsApi = api.injectEndpoints({
	endpoints: builder => ({
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
	})
})

export const {
	useGetAllTranslationsQuery,
	useGetTranslationQuery,
	usePutTranslationMutation,
	useDeleteTranslationMutation
} = translationsApi