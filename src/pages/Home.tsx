import NavBar from "@/components/NavBar";
import TranslationDrawer from "@/components/TranslationDrawer";
import TranslationTable from "@/components/TranslationTable";
import LogOut from "@/components/LogOut/LogOut";

export default function Home() {
	return (
		<div>
			<NavBar />
			<LogOut />
			<h1>This is {localStorage.getItem('currentUser')}</h1>
		</div>
	);
}
