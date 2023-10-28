import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import styles from './NavigationItem.module.css';

interface Props {
  link: string;
  label: string;
  icon: ReactNode;
}

const navigationItem = ({ link, icon, label }: Props) => (
  <li className={styles.navigationItem}>
    <NavLink to={link} className={({ isActive }) => (isActive ? styles.active : '')}>
      {icon}
      <Typography component="span">{label}</Typography>
    </NavLink>
  </li>
);

export default navigationItem;
