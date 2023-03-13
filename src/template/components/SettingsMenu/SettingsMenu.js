import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import useFullWidth from '../../../hooks/useFullWidth';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import Ephemeris from '../../../features/ephemeris/components/Ephemeris';
import useLocalStorage from '../../../hooks/useLocalStorage';
import Inserter from '../../../features/inserter/pages/Inserter';

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { fullWidth, saveFullWidth } = useFullWidth();
  const [enabledEphemeris, setEnabledEphemeris] = useLocalStorage(
    'enabled_ephemeris',
    true
  );

  return (
    <Stack direction="row" gap={3} alignItems="center">
      {enabledEphemeris && <Ephemeris />}
      <Inserter />
      <Button
        id="settings-button"
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
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
      </Menu>
    </Stack>
  );
}
