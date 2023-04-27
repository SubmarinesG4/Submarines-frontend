import NavBar from "@/components/NavBar/NavBar";
import TranslationDrawer from "@/components/TranslationDrawer";
import TranslationList from "@/components/TranslationList";
import TranslationTable from "@/components/TranslationTable/TranslationTable.view";

export default function Home() {
	return (
		<div>
			<NavBar />
			<TranslationTable />
		</div>
	);
}
