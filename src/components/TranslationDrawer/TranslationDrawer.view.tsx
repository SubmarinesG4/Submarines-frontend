import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTranslationDrawer } from ".";
import { TranslationDrawerProps } from "./TranslationDrawer.types";
import { Translation } from "@/types/Translation";
import DrawerList from "../DrawerList";

export default function View(props: TranslationDrawerProps) {
  return (
    <div>
      <React.Fragment key={"top"}>
        <Drawer anchor={"top"} open={props.open}>
          {props.open && (
            <DrawerList
              toggleDrawer={props.toggleDrawer}
              translation={props.translation}
              translationKey={props.translationKey}
            />
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
