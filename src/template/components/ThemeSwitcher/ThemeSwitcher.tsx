import { useState, useEffect, Fragment } from 'react';
import { Stack, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { DARK_MODE, LIGHT_MODE } from '../../../constants';

type Theme = 'light' | 'dark';

export default () => {
  const [theme, setTheme] = useState<Theme>(LIGHT_MODE);

  useEffect(() => {
    chargeTheme((localStorage.getItem('theme') as Theme) ?? LIGHT_MODE);
  });

  const switchTheme = () => saveTheme(theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE);

  const saveTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    chargeTheme(theme);
  };

  const chargeTheme = (theme: Theme) => {
    setTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <Stack direction="row" alignItems="center" onClick={switchTheme}>
      {theme === LIGHT_MODE ? (
        <Fragment>
          <DarkModeIcon fontSize="large" sx={{ width: '58px' }} />
          <Typography>Dark mode</Typography>
        </Fragment>
      ) : (
        <Fragment>
          <LightModeIcon fontSize="large" sx={{ width: '58px' }} />
          <Typography>Light mode</Typography>
        </Fragment>
      )}
    </Stack>
  );
};
