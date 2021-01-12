import { Brightness6Rounded } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { DARK_MODE, LIGHT_MODE } from '../../../constants';
import styles from './ThemeSwitcher.module.css';

export default () => {
  const [theme, setTheme] = useState(LIGHT_MODE);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme')
    );

    setTheme(localStorage.getItem('theme'));
  }, []);

  const switchTheme = () => {
    if (theme === LIGHT_MODE) saveTheme(DARK_MODE);
    else saveTheme(LIGHT_MODE);
  };

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className={styles.themeSwitcher} onClick={switchTheme}>
      Go {theme === DARK_MODE ? LIGHT_MODE : DARK_MODE} mode!
      <div className={styles.switcherIcon}>
        <Brightness6Rounded />
      </div>
    </div>
  );
};
