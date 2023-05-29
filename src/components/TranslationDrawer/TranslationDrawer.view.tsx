import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { TranslationDrawerProps } from "./TranslationDrawer.types";
import DrawerList from "../DrawerList";
import HistoryList from "../HistoryList";
import NewTranslationList from "../NewTranslationList";
import { useSnackbarMessage } from "@/hooks/useSnackbarMessage";

export default function View(props: TranslationDrawerProps) {
  const setSnackbarMessage = useSnackbarMessage();

  return (
    <div>
      <React.Fragment key={"top"}>
        <Drawer
          anchor={"top"}
          open={props.open}
          onClose={props.toggleDrawer(false)}
        >
          {props.open && props.view === 1 && (
            <DrawerList
              toggleDrawer={props.toggleDrawer}
              setDrawerOpenState={props.setDrawerOpenState}
              showError={setSnackbarMessage}
              translationKey={props.translationKey}
            />
          )}
          {props.open && props.view === 2 && (
            <HistoryList
              toggleDrawer={props.toggleDrawer}
              showError={setSnackbarMessage}
              translationKey={props.translationKey}
            />
          )}
          {props.open && props.view === 3 && (
            <NewTranslationList
              toggleDrawer={props.toggleDrawer}
              setDrawerOpenState={props.setDrawerOpenState}
              showError={setSnackbarMessage}
            />
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
