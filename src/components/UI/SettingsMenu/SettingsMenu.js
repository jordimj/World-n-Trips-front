import { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText, Switch } from '@mui/material';
import useFullWidth from '../../../hooks/useFullWidth';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { fullWidth, saveFullWidth } = useFullWidth();

  return (
    <Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
      >
        Settings
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <ListItemText>
            <ThemeSwitcher />
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <Switch
            color="primary"
            checked={fullWidth}
            onChange={(e) => saveFullWidth(e.target.checked)}
          />
          Full width
        </MenuItem>
      </Menu>
    </Fragment>
  );
}
