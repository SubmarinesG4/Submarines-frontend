import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useTenantDrawer } from '.';
import { TenantDrawerProps } from './TenantDrawer.types';

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

export default function View(props: TenantDrawerProps) {
  const [value, setValue] = React.useState(0);
  const data = useTenantDrawer({ tenantKey: props.tenantKey, items: props.items });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const list = () => (
    <Box
      sx={{ width: 'auto', padding: '1em 1em' }}
      role="presentation"
    >
      <TextField
        id="outlined-read-only-input"
        label="Key"
        value={props.tenantKey}
        InputProps={{
          readOnly: true,
        }}
        sx={{ width: '70%', margin: '0 15% 0 15%' }}
      />

      <Box 
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button variant='outlined' sx={{ marginX: '0.5em' }} onClick={props.toggleDrawer(false)}>Chiudi</Button>
        <Button variant='contained' sx={{ marginX: '0.5em' }} onClick={props.toggleDrawer(false)}>Salva</Button>
      </Box>
      
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'top'}>
        <Drawer
        anchor={'top'}
        open={props.open}
        >
        {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}