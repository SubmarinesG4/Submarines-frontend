import { useState } from "react";
import TranslationDrawer from "@/components/TranslationDrawer";
import TranslationTable from "@/components/TranslationTable";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store";

export default function Translations() {
	const { id } = useParams();
	const user = useAppSelector((state) => state.userSlice.user);
	const userTenant = user?.attributes["custom:tenantId"];

	const [drawerOpenState, setDrawerOpenState] = useState(false);
	const [translationKey, setTranslationKey] = useState<string>("");
	const [drawerView, setDrawerView] = useState<1 | 2 | 3>(1); // 1 = DrawerList, 2 = HistoryList, 3 = NewTranslationList

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (event.type === "keydown") {
			return;
		}
		setDrawerOpenState(open);
	};

	const changeTranslationKey = (translationKey: string) => (event: any) => {
		setTranslationKey(translationKey);
		setDrawerOpenState(true);
	};

	const showEdit = (translationKey: string) => (event: any) => {
		setDrawerView(1);
		changeTranslationKey(translationKey)(event);
	};

	const showHistory = (translationKey: string) => (event: any) => {
		setDrawerView(2);
		changeTranslationKey(translationKey)(event);
	};

	const showNew = () => (event: any) => {
		setDrawerView(3);
		setDrawerOpenState(true);
	};

	if (!id) return <Navigate to={`/`} />;
	if (id !== userTenant && !user?.roles.includes("super-admin")) return <Navigate to={`translations/${userTenant}`} />;
	return (
		<div>
			<TranslationTable
				tenantName={id}
				toggleDrawer={toggleDrawer}
				showEdit={showEdit}
				showHistory={showHistory}
				showNew={showNew}
			/>
			<TranslationDrawer
				open={drawerOpenState}
				toggleDrawer={toggleDrawer}
				setDrawerOpenState={setDrawerOpenState}
				translationKey={translationKey}
				view={drawerView}
			/>
		</div>
	);
}
