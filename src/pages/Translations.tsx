import { useState } from "react";
import NavBar from "@/components/NavBar";
import TranslationDrawer from "@/components/TranslationDrawer";
import TranslationTable from "@/components/TranslationTable";

export default function Translations() {
  const [drawerOpenState, setDrawerOpenState] = useState(false);
  const [translationKey, setTranslationKey] = useState<string>("");
  const [drawerView, setDrawerView] = useState<1 | 2 | 3>(1); // 1 = DrawerList, 2 = HistoryList, 3 = NewTranslationList

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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

  return (
    <div>
      <NavBar />
      <TranslationTable
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
