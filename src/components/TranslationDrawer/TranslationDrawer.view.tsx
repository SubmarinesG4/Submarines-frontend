import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTranslationDrawer } from ".";
import { TranslationDrawerProps } from "./TranslationDrawer.types";
import { Translation } from "@/types/Translation";
import DrawerList from "../DrawerList";
import HistoryList from "../HistoryList";
import NewTranslationList from "../NewTranslationList";
import { Alert, Snackbar } from "@mui/material";

export default function View(props: TranslationDrawerProps) {
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setErrorOpen(true);
  };

  return (
    <div>
      <React.Fragment key={"top"}>
        <Drawer anchor={"top"} open={props.open}>
          {props.open && props.view === 1 && (
            <DrawerList
              toggleDrawer={props.toggleDrawer}
              setDrawerOpenState={props.setDrawerOpenState}
              showError={showError}
              translationKey={props.translationKey}
            />
          )}
          {props.open && props.view === 2 && (
            <HistoryList
              toggleDrawer={props.toggleDrawer}
              showError={showError}
              translationKey={props.translationKey}
            />
          )}
          {props.open && props.view === 3 && (
            <NewTranslationList
              toggleDrawer={props.toggleDrawer}
              setDrawerOpenState={props.setDrawerOpenState}
              showError={showError}
              languages={["it", "en"]}
              defaultTranslationLanguage="it"
            />
          )}
        </Drawer>
      </React.Fragment>
      <Snackbar
        open={errorOpen}
        autoHideDuration={5000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
