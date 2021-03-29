import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navigationItem = ({ exact, link, children }) => (
  <li className={styles.navigationItem}>
    <NavLink exact={exact} to={link} activeClassName={styles.active}>
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
