import { ReactNode, SyntheticEvent } from 'react';
import { Box, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface TabsProps {
  value: number;
  onChange: (event: SyntheticEvent, newTab: number) => void;
  ariaLabel: string;
  centered?: boolean;
  children: ReactNode;
}

function Tabs(props: TabsProps) {
  const { value, onChange, ariaLabel, centered = false, children } = props;

  return (
    <MuiTabs
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      centered={centered}
      TabIndicatorProps={{
        style: {
          backgroundColor: 'var(--navbar-color)',
        },
      }}
      sx={{
        width: '100%',
        '& .MuiTabs-flexContainer': {
          justifyContent: centered ? 'center' : 'space-between',
        },
        '& .MuiTab-root': {
          width: '100%',
        },
      }}
    >
      {children}
    </MuiTabs>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

Tabs.Panel = TabPanel;
Tabs.Item = MuiTab;

export default Tabs;
