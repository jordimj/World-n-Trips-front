import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      World map
    </NavigationItem>
    <NavigationItem link="/list">List of countries</NavigationItem>
  </ul>
);

export default navigationItems;
