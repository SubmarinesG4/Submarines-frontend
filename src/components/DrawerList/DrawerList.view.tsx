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
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { TranslationSend } from "@/types/TranslationSend";
import { api } from "@/app/services/api";
import useLogic from "./DrawerList.logic";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@/app/services/helpers";
import dayjs from "dayjs";

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
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [updateTranslation, putStatus] = api.usePutTranslationMutation();
  const [deleteTranslation, deleteStatus] = api.useDeleteTranslationMutation();

  const { data, error, isLoading } = useLogic({
    translationKey: props.translationKey,
  });

  let info = props;
  let translation = data || {
    translationKey: "errore",
    defaultTranslationLanguage: "it",
    defaultTranslationinLanguage: "errore",
    translations: [],
    creationDate: new Date(),
    modificationDate: new Date(),
    modifiedbyUser: "",
    published: false,
    versionedTranslations: [],
  };

  let userRole = localStorage.getItem("currentUserRole");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFormSubmit = (info: any) => {
    let languages = [];

    for (let key in info) {
      if (info[key] === undefined) {
        if (key === "defaultLanguageContent") {
          info[key] = translation.defaultTranslationinLanguage;
          languages.push({
            language: translation.defaultTranslationLanguage,
            content: info[key],
          });
        } else if (key !== "published") {
          info[key] = translation.translations.filter(
            (language) => language.language === key
          )[0].content;
          languages.push({
            language: key,
            content: info[key],
          });
        } else {
          info[key] = translation.published;
        }
      } else if (key !== "published") {
        if (key === "defaultLanguageContent") {
          languages.push({
            language: translation.defaultTranslationLanguage,
            content: info[key],
          });
        } else {
          languages.push({
            language: key,
            content: info[key],
          });
        }
      }
    }

    let result: TranslationSend = {
      defaultTranslationLanguage: translation.defaultTranslationLanguage,
      defaultTranslationinLanguage: info.defaultLanguageContent,
      translations: languages,
      modifiedbyUser: localStorage.getItem("currentUser") || "",
      published: info.published,
    };

    //console.log(result);

    updateTranslation({
      tenant: "tenant3", // TODO: chiamata tenant da fare in alto
      key: translation.translationKey,
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

  const handleDelete = () => {
    deleteTranslation({
      tenant: "tenant3", // TODO: chiamata tenant da fare in alto
      key: translation.translationKey,
    })
      .unwrap()
      .then((payload) => {
        console.log(payload);
        handleDialogClose();
        props.setDrawerOpenState(false);
      })
      .catch((err) => {
        handleDialogClose();
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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleListRendering = () => {
    if (isLoading) {
      return <Box sx={{ margin: "1em" }}>Loading...</Box>;
    } else if (error) {
      if ("status" in error) {
        props.showError(
          "error" in error ? error.error : JSON.stringify(error.data)
        );
      } else {
        props.showError(
          error.message ? error.message : "Errore nel fetch delle traduzioni"
        );
      }
      return (
        <Box sx={{ margin: "1em" }}>Errore nel fetch della traduzione</Box>
      );
    } else {
      return translation.translationKey !== "" ? (
        <Box sx={{ width: "auto", padding: "1em 1em" }} role="presentation">
          <TextField
            id="outlined-read-only-input"
            label="Key"
            value={info.translationKey}
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
                Data creazione:{" "}
                {dayjs(translation.creationDate).format("DD/MM/YYYY HH:mm")}
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                Data ultima modifica:{" "}
                {dayjs(translation.modificationDate).format("DD/MM/YYYY HH:mm")}
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={translation.published}
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
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                paddingTop: "1em",
              }}
            >
              <Tabs
                value={value}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label={translation.defaultTranslationLanguage + " (default)"}
                  key={0}
                  {...a11yProps(0)}
                />
                {translation.translations
                  .filter(
                    (language) =>
                      language.language !==
                      translation.defaultTranslationLanguage
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
                defaultValue={translation.defaultTranslationinLanguage}
                {...register("defaultLanguageContent")}
              />
            </TabPanel>
            {translation.translations
              .filter(
                (language) =>
                  language.language !== translation.defaultTranslationLanguage
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
                disabled={translation.published}
                sx={{ marginX: "0.5em" }}
                onClick={handleDialogOpen}
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
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Eliminare la traduzione?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Vuoi veramente eliminare la traduzione? Questa azione non può
                essere annullata.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} autoFocus>
                Annulla
              </Button>
              <Button color="error" onClick={handleDelete}>
                Elimina
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <div>Errore</div>
      );
    }
  };

  return <div>{handleListRendering()}</div>;
}
