import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

interface Props {
  link: string;
  children: ReactNode;
}

const navigationItem = ({ link, children }: Props) => (
  <li className={styles.navigationItem}>
    <NavLink to={link} className={({ isActive }) => (isActive ? styles.active : '')}>
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
