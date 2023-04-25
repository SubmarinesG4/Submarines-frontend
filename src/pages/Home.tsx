import NavBar from "@/components/NavBar/NavBar";
import TranslationDrawer from "@/components/TranslationDrawer/TranslationDrawer.view";
import TranslationList from "@/components/TranslationList";
import TranslationTable from "@/components/TranslationTable/TranslationTable";

export default function Home() {
	return (
		<div>
			<NavBar />
			<TranslationDrawer />
			<TranslationTable />
		</div>
	);
}
