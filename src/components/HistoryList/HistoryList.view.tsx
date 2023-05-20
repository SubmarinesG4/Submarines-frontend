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
import { HistoryListProps } from "./HistoryList.types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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

export default function View(props: HistoryListProps) {
  const [version, setVersion] = React.useState(0);
  const [value, setTabValue] = React.useState(0);

  let data = props;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      <FormControl sx={{ width: "70%", margin: "1em 15% 0 15%" }}>
        <InputLabel id="select-version-label">Versione</InputLabel>
        <Select
          labelId="select-version-label"
          id="select-version"
          label="Versione"
          value={version}
          onChange={(event) => setVersion(event.target.value as number)}
        >
          {data.translation.versionedTranslations.map((version, index) => {
            return (
              <MenuItem value={index} key={index}>
                {version.modificationDate.toDateString()} -{" "}
                {version.modifiedByUser}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box sx={{ marginY: "1em", width: "70%", margin: "1em 15% 0 15%" }}>
        <Typography variant="body1" gutterBottom component="div">
          Data modifica:{" "}
          {data.translation.versionedTranslations[
            version
          ].modificationDate.toLocaleString()}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          Utente:{" "}
          {data.translation.versionedTranslations[version].modifiedByUser}
        </Typography>
      </Box>
      <Divider sx={{ marginY: "1em" }} />
      <Box sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "1em" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {data.translation.versionedTranslations[version].translations.map(
            (language, index) => {
              return (
                <Tab
                  label={language.language}
                  key={index}
                  {...a11yProps(index)}
                />
              );
            }
          )}
        </Tabs>
      </Box>
      {data.translation.versionedTranslations[version].translations.map(
        (language, index) => {
          return (
            <TabPanel value={value} index={index} key={index}>
              <TextField
                id={"textarea-language-" + language.language}
                label=""
                multiline
                rows={4}
                value={language.content}
              />
            </TabPanel>
          );
        }
      )}
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button
          variant="outlined"
          sx={{ marginX: "0.5em" }}
          onClick={props.toggleDrawer(false)}
        >
          Chiudi
        </Button>
      </Box>
    </Box>
  );
}
