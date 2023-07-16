import { MouseEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Ephemeris from '@/features/ephemeris/components/Ephemeris';
import Inserter from '@/features/inserter/pages/Inserter';
import useFullWidth from '@/hooks/useFullWidth';
import useLocalStorage from '@/hooks/useLocalStorage';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Search from '@/features/search/components/Search';

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { fullWidth, saveFullWidth } = useFullWidth();
  const [enabledEphemeris, setEnabledEphemeris] = useLocalStorage(
    'enabled_ephemeris',
    'true'
  );

  const location = useLocation();
  const isTrips = location.pathname === '/trips';
  const [filterTrips, setFilterTrips] = useLocalStorage('filter_trips', 'false');

  return (
    <Stack direction="row" gap={3} alignItems="center">
      {enabledEphemeris && <Ephemeris />}
      <Inserter />
      <Search />
      <Button
        id="settings-button"
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        disableRipple
        sx={{
          color: 'white!important',
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: 'var(--primary-color-900)' },
        }}
      >
        Settings
      </Button>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'settings-button',
        }}
      >
        <MenuItem>
          <ThemeSwitcher />
        </MenuItem>
        <MenuItem>
          <Switch
            color="primary"
            checked={fullWidth}
            onChange={(e) => saveFullWidth(e.target.checked)}
          />
          Full width
        </MenuItem>
        <MenuItem>
          <Switch
            color="primary"
            checked={enabledEphemeris}
            onChange={(e) => setEnabledEphemeris(e.target.checked)}
          />
          Travel ephemeris
        </MenuItem>
        {isTrips && (
          <MenuItem>
            <Switch
              color="primary"
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
