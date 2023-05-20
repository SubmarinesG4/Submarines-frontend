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

export default function View(props: NewTranslationListProps) {
  const [value, setTabValue] = React.useState(0);
  const { register, handleSubmit, reset, setValue } = useForm();

  let data = props;
  /* data.translation.languages = data.translation.languages.filter(
    (language) => language.language !== data.translation.defaultLanguage
  ); */

  const userRole: string = localStorage.getItem("currentUserRole") || "";

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
            language: props.defaultTranslationLanguage,
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
            language: props.defaultTranslationLanguage,
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
      translationKey: data.translationKey,
      defaultTranslationLanguage: props.defaultTranslationLanguage,
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
                label={props.defaultTranslationLanguage + " (default)"}
                key={0}
                {...a11yProps(0)}
              />
              {props.languages.map((language, index) => {
                return (
                  language !== props.defaultTranslationLanguage && (
                    <Tab
                      label={language}
                      key={index + 1}
                      {...a11yProps(index + 1)}
                    />
                  )
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
              {...register("defaultLanguageContent")}
            />
          </TabPanel>
          {props.languages.map((language, index) => {
            return (
              language !== props.defaultTranslationLanguage && (
                <TabPanel value={value} index={index} key={index}>
                  <TextField
                    id={"textarea-language-" + language}
                    label=""
                    multiline
                    rows={4}
                    {...register(language)}
                  />
                </TabPanel>
              )
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