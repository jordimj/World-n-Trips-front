import { Brightness6Rounded } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

export default () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme')
    );

    setTheme(localStorage.getItem('theme'));
  }, []);

  const switchTheme = () => {
    if (theme === 'light') saveTheme('dark');
    else saveTheme('light');
  };

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <li onClick={switchTheme}>
      <Brightness6Rounded />
    </li>
  );
};
