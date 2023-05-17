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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFormSubmit = (data: any) => {
    props.toggleDrawer(false);

    for (let key in data) {
      if (data[key] === undefined) {
        if (key === "defaultLanguageContent") {
          data[key] = props.translation.defaultLanguageContent;
        } else {
          data[key] = props.translation.languages.filter(
            (language) => language.language === key
          )[0].content;
        }
      }
    }
    console.log(data);
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
          sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "1em" }}
        >
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={data.translation.defaultLanguage + " (default)"}
              key={0}
              {...a11yProps(0)}
            />
            {data.translation.languages.map((language, index) => {
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
            defaultValue={data.translation.defaultLanguageContent}
            {...register("defaultLanguageContent")}
          />
        </TabPanel>
        {data.translation.languages.map((language, index) => {
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
