import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TranslationDrawer() {
  const [state, setState] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown') {
        return;
      }
      setState(open);
    };

  const list = () => (
    <Box
      sx={{ width: 'auto', padding: '1em 1em' }}
      role="presentation"
    >
      <TextField
        id="outlined-read-only-input"
        label="Key"
        defaultValue="a85ghfv3-35v9i34g-g4598bh"
        InputProps={{
          readOnly: true,
        }}
        sx={{ width: '70%', margin: '0 15% 0 15%' }}
      />
      <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop: '1em' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="LINGUA 1" {...a11yProps(0)} />
          <Tab label="LINGUA 2" {...a11yProps(1)} />
          <Tab label="LINGUA 3" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TextField
          id="textarea-lang1"
          label=""
          multiline
          rows={4}
          defaultValue="Valore di test lingua 1"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TextField
          id="textarea-lang2"
          label=""
          multiline
          rows={4}
          defaultValue="Valore di test lingua 2"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TextField
          id="textarea-lang3"
          label=""
          multiline
          rows={4}
          defaultValue="Valore di test lingua 3"
        />
      </TabPanel>
      <Box 
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button variant='outlined' sx={{ marginX: '0.5em' }} onClick={toggleDrawer(false)}>Chiudi</Button>
        <Button variant='contained' sx={{ marginX: '0.5em' }} onClick={toggleDrawer(false)}>Salva</Button>
      </Box>
      
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'top'}>
        <Button onClick={toggleDrawer(true)}>TOP</Button>
        <Drawer
        anchor={'top'}
        open={state}
        >
        {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}