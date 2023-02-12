import { useTranslationGetAllQuery, useTranslationPutMutation } from "@/queries";

export default function Home() {
	const query = useTranslationGetAllQuery();
	const mutation = useTranslationPutMutation();

	function handleClick() {
		mutation.mutate({
			projectId: "1",
			translationKey: (Math.random() + 1).toString(36).substring(7),
			languages: [{ language: "IT", content: (Math.random() + 1).toString(36).substring(7) }],
		});
	}

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
			<button onClick={handleClick}>add random translation</button>
		</div>
	);
}
