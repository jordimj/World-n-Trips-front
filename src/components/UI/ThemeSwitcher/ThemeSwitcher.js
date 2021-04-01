import React, { useState, useEffect } from 'react';
import { DARK_MODE, LIGHT_MODE } from '../../../constants';
import Icon from './Icon';
import styles from './ThemeSwitcher.module.css';

export default () => {
  const [theme, setTheme] = useState(LIGHT_MODE);

  useEffect(() => {
    chargeTheme(localStorage.getItem('theme') || LIGHT_MODE);
  });

  const switchTheme = () =>
    saveTheme(theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE);

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
      <Icon name={theme} />
    </div>
  );
};
