import { MouseEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Settings as SettingsIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Ephemerides from '@/features/ephemerides/components/Ephemerides';
import Inserter from '@/features/inserter/pages/Inserter';
import Search from '@/features/search/components/Search';
import useFullWidth from '@/hooks/useFullWidth';
import useLocalStorage from '@/hooks/useLocalStorage';
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher';

export default function Settings() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { fullWidth, saveFullWidth } = useFullWidth();
  const [filterTrips, setFilterTrips] = useLocalStorage('filter_trips', 'false');
  const [enabledEphemerides, setEnabledEphemerides] = useLocalStorage(
    'enabled_ephemerides',
    'true'
  );

  const location = useLocation();
  const isTrips = location.pathname === '/trips';

  return (
    <Stack direction="row" gap={1} alignItems="center" sx={{ ml: 'auto' }}>
      {enabledEphemerides && <Ephemerides />}
      <Inserter />
      <Search />
      <IconButton color="secondary" onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Menu id="settings-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <ThemeSwitcher />
        </MenuItem>
        <MenuItem>
          <Switch checked={fullWidth} onChange={(e) => saveFullWidth(e.target.checked)} />
          Full width
        </MenuItem>
        <MenuItem>
          <Switch
            checked={enabledEphemerides}
            onChange={(e) => setEnabledEphemerides(e.target.checked)}
          />
          Travel ephemerides
        </MenuItem>
        {isTrips && (
          <MenuItem>
            <Switch
              checked={filterTrips}
              onChange={(e) => setFilterTrips(e.target.checked)}
            />
            Filter trips with journals
          </MenuItem>
        )}
      </Menu>
    </Stack>
  );
}
