import { useTranslationGetAllQuery } from "@/queries";

export default function Home() {
	const query = useTranslationGetAllQuery();

	if (query.isLoading) return <div>...is loading</div>;
	else if (query.error) return <div>Error fetching translations</div>;

	const items = query.data ? query.data.items : [];
	return (
		<div>
			<h2>Translations</h2>
			{items.length > 0 ? (
				<ul>
					{items.map((el) => (
						<li>{el.translationKey}</li>
					))}
				</ul>
			) : (
				<div>No translations found</div>
			)}
		</div>
	);
}
