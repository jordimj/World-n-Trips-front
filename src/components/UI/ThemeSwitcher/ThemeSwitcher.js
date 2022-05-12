import { useState, useEffect } from 'react';
import { DARK_MODE, LIGHT_MODE } from '../../../constants';
// todo: delete old icon system?
import Icon from './Icon';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styles from './ThemeSwitcher.module.css';

export default () => {
  const [theme, setTheme] = useState(LIGHT_MODE);

  useEffect(() => {
    chargeTheme(localStorage.getItem('theme') || LIGHT_MODE);
  });

  const switchTheme = () => saveTheme(theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE);

  const saveTheme = (theme) => {
    localStorage.setItem('theme', theme);
    chargeTheme(theme);
  };

  const chargeTheme = (theme) => {
    setTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className={styles.themeSwitcher} onClick={switchTheme}>
      {theme === LIGHT_MODE ? (
        <DarkModeIcon fontSize="large" />
      ) : (
        <LightModeIcon fontSize="large" />
      )}
    </div>
  );
};
