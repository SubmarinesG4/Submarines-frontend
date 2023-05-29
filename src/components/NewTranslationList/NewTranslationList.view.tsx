import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useForm } from "react-hook-form";
import { NewTranslationListProps } from "./NewTranslationList.types";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { TranslationSend } from "@/types/TranslationSend";
import { usePutTranslationMutation } from "@/app/services/translationsApiSlice";
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "@/app/services/helpers";
import TabPanel, { a11yProps } from "../TabPanel/TabPanel.view";
import useNewTranslationList from "./NewTranslationList.logic";
import { useAppSelector } from "@/app/store";

export default function View(props: NewTranslationListProps) {
  const [value, setTabValue] = React.useState(0);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [updateTranslation, putStatus] = usePutTranslationMutation();

  const logic = useNewTranslationList({});
  let userRole = "";
  const user = useAppSelector((state) => state.userSlice.user);

  if (user?.roles.includes("super-admin")) {
    userRole = "super-admin";
  } else if (user?.roles.includes("admin")) {
    userRole = "admin";
  } else {
    userRole = "traduttore";
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFormSubmit = (data: any) => {
    props.toggleDrawer(false);
    let languages = [];

    for (let key in data) {
      if (data[key] === undefined) {
        if (key === "defaultLanguageContent") {
          data[key] = null;
          languages.push({
            language: logic.defaultTranslationLanguage,
            content: data[key],
          });
        } else if (key !== "published") {
          data[key] = null;
          languages.push({
            language: key,
            content: data[key],
          });
        } else {
          data[key] = false;
        }
      } else if (key !== "published" && key !== "translationKey") {
        if (key === "defaultLanguageContent") {
          languages.push({
            language: logic.defaultTranslationLanguage,
            content: data[key],
          });
        } else {
          languages.push({
            language: key,
            content: data[key],
          });
        }
      }
    }

    let result: TranslationSend = {
      defaultTranslationLanguage: logic.defaultTranslationLanguage,
      defaultTranslationinLanguage: data.defaultLanguageContent,
      translations: languages,
      //modifiedbyUser: user?.username!,
      published: data.published,
    };

    console.log(result);
    updateTranslation({
      tenant: logic.tenant,
      key: data.translationKey,
      translation: result,
    })
      .unwrap()
      .then((payload) => {
        console.log(payload);
        props.setDrawerOpenState(false);
      })
      .catch((err) => {
        if (isFetchBaseQueryError(err)) {
          let errMsg =
            "error" in err
              ? err.error
              : JSON.stringify(err.data).substring(0, 100) + "...";
          console.log(errMsg);
          props.showError(errMsg);
        } else if (isErrorWithMessage(err)) {
          console.log(err.message);
          props.showError(err.message);
        }
      });
  };

  return (
    <Box sx={{ width: "auto", padding: "1em 1em" }} role="presentation">
      <TextField
        id="outlined-read-only-input"
        label="Key"
        {...register("translationKey", { required: true })}
        sx={{ width: "70%", margin: "0 15% 0 15%" }}
      />
      <FormGroup>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box
            sx={{
              marginY: "1em",
              width: "70%",
              margin: "1em 15% 0 15%",
              display:
                userRole !== null && userRole === "traduttore"
                  ? "none"
                  : "block",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox defaultChecked={false} {...register("published")} />
              }
              label="Pubblicato"
            />
          </Box>
          <Divider sx={{ marginY: "0.5em" }} />
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "1em" }}
          >
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={logic.defaultTranslationLanguage + " (default)"}
                key={0}
                {...a11yProps(0)}
              />
              {logic.languages
                .filter(
                  (language) => language !== logic.defaultTranslationLanguage
                )
                .map((language, index) => {
                  return (
                    <Tab
                      label={language}
                      key={index + 1}
                      {...a11yProps(index + 1)}
                    />
                  );
                })}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} key={0}>
            <TextField
              id="textarea-language-default"
              label=""
              multiline
              rows={4}
              {...register("defaultLanguageContent", { required: true })}
            />
          </TabPanel>
          {logic.languages
            .filter((language) => language !== logic.defaultTranslationLanguage)
            .map((language, index) => {
              return (
                <TabPanel value={value} index={index + 1} key={index + 1}>
                  <TextField
                    id={"textarea-language-" + language}
                    label=""
                    multiline
                    rows={4}
                    {...register(language)}
                  />
                </TabPanel>
              );
            })}
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Button
              variant="outlined"
              sx={{ marginX: "0.5em" }}
              onClick={props.toggleDrawer(false)}
            >
              Chiudi
            </Button>
            <Button
              variant="contained"
              sx={{ marginX: "0.5em" }}
              onClick={handleSubmit(handleFormSubmit)}
            >
              Salva
            </Button>
          </Box>
        </form>
      </FormGroup>
    </Box>
  );
}
