import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTranslationDrawer } from ".";
import { TranslationDrawerProps } from "./TranslationDrawer.types";
import { Translation } from "@/types/Translation";
import DrawerList from "../DrawerList";
import HistoryList from "../HistoryList";
import NewTranslationList from "../NewTranslationList";

export default function View(props: TranslationDrawerProps) {
  return (
    <div>
      <React.Fragment key={"top"}>
        <Drawer anchor={"top"} open={props.open}>
          {props.open && props.view === 1 && (
            <DrawerList
              toggleDrawer={props.toggleDrawer}
              setDrawerOpenState={props.setDrawerOpenState}
              translationKey={props.translationKey}
            />
          )}
          {props.open && props.view === 2 && (
            <HistoryList
              toggleDrawer={props.toggleDrawer}
              translationKey={props.translationKey}
            />
          )}
          {props.open && props.view === 3 && (
            <NewTranslationList
              toggleDrawer={props.toggleDrawer}
              setDrawerOpenState={props.setDrawerOpenState}
              languages={["it", "en"]}
              defaultTranslationLanguage="it"
            />
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
