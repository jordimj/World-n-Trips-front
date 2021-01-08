import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import ThemeSwitcher from '../../ThemeSwitcher/ThemeSwitcher';
import styles from './Toolbar.module.css';

const toolbar = () => (
  <nav className={styles.toolbar}>
    <NavigationItems />
    <ThemeSwitcher />
  </nav>
);

export default toolbar;
