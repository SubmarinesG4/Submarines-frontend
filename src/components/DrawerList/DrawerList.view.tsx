import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Translation } from "@/types/Translation";
import { useForm } from "react-hook-form";
import { DrawerListProps } from "./DrawerList.types";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { TranslationSend } from "@/types/TranslationSend";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  key: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function View(props: DrawerListProps) {
  const [value, setTabValue] = React.useState(0);
  const { register, handleSubmit, reset, setValue } = useForm();

  let data = props;
  /* data.translation.languages = data.translation.languages.filter(
    (language) => language.language !== data.translation.defaultLanguage
  ); */

  let userRole = localStorage.getItem("currentUserRole");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFormSubmit = (data: any) => {
    props.toggleDrawer(false);
    let languages = [];

    for (let key in data) {
      if (data[key] === undefined) {
        if (key === "defaultLanguageContent") {
          data[key] = props.translation.defaultTranslationinLanguage;
          languages.push({
            language: props.translation.defaultTranslationLanguage,
            content: data[key],
          });
        } else if (key !== "published") {
          data[key] = props.translation.languages.filter(
            (language) => language.language === key
          )[0].content;
          languages.push({
            language: key,
            content: data[key],
          });
        } else {
          data[key] = props.translation.published;
        }
      } else if (key !== "published") {
        if (key === "defaultLanguageContent") {
          languages.push({
            language: props.translation.defaultTranslationLanguage,
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

    let translation: TranslationSend = {
      translationKey: props.translation.translationKey,
      defaultTranslationLanguage: props.translation.defaultTranslationLanguage,
      defaultTranslationinLanguage: data.defaultLanguageContent,
      languages: languages,
      modifiedByUser: localStorage.getItem("currentUser") || "",
      published: data.published,
    };

    console.log(translation);
    //TODO: salvare i dati
    // traduzione default, altre lingue, data modifica, pubblicato, chi ha modificato
  };

  return (
    <Box sx={{ width: "auto", padding: "1em 1em" }} role="presentation">
      <TextField
        id="outlined-read-only-input"
        label="Key"
        value={data.translationKey}
        InputProps={{
          readOnly: true,
        }}
        sx={{ width: "70%", margin: "0 15% 0 15%" }}
      />

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box
          sx={{
            marginY: "1em",
            paddingTop: "0.5em",
            width: "70%",
            margin: "0 15% 0 15%",
          }}
        >
          <Typography variant="body1" gutterBottom component="div">
            Data creazione: {data.translation.creationDate.toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            Data ultima modifica:{" "}
            {data.translation.modificationDate.toLocaleString()}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={data.translation.published}
                {...register("published")}
              />
            }
            label="Pubblicato"
            sx={{
              display:
                userRole !== null && userRole === "traduttore"
                  ? "none"
                  : "block",
            }}
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
              label={data.translation.defaultTranslationLanguage + " (default)"}
              key={0}
              {...a11yProps(0)}
            />
            {data.translation.languages
              .filter(
                (language) =>
                  language.language !==
                  data.translation.defaultTranslationLanguage
              )
              .map((language, index) => {
                return (
                  <Tab
                    label={language.language}
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
            defaultValue={data.translation.defaultTranslationinLanguage}
            {...register("defaultLanguageContent")}
          />
        </TabPanel>
        {data.translation.languages
          .filter(
            (language) =>
              language.language !== data.translation.defaultTranslationLanguage
          )
          .map((language, index) => {
            return (
              <TabPanel value={value} index={index + 1} key={index + 1}>
                <TextField
                  id={"textarea-language-" + language.language}
                  label=""
                  multiline
                  rows={4}
                  defaultValue={language.content}
                  {...register(language.language)}
                />
              </TabPanel>
            );
          })}
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button
            variant="contained"
            color="error"
            disabled={data.translation.published}
            sx={{ marginX: "0.5em" }}
            onClick={props.toggleDrawer(false)}
          >
            Elimina
          </Button>
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
    </Box>
  );
}
