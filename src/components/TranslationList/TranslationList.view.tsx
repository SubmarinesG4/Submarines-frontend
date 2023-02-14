import { useTranslationList } from ".";
import { TranslationListProps } from "./TranslationList.types";

function View(props: TranslationListProps) {
	const data = useTranslationList({ projectId: "1" });

	function handleListRendering() {
		if (data.isLoading) {
			return <div>...is loading</div>;
		} else if (data.error) {
			return <div>Error fetching translations</div>;
		} else {
			return data.items.length > 0 ? (
				<ul>
					{data.items.map((el: any) => (
						<li key={el.translationKey}>{el.translationKey}</li>
					))}
				</ul>
			) : (
				<div>No translations found</div>
			);
		}
	}

	return (
		<div>
			<h2>Translations</h2>
			{handleListRendering()}
			<button onClick={data.handleClick}>add random translation</button>
		</div>
	);
}

export default View;
