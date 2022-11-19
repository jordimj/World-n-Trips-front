import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navigationItem = ({ link, children }) => (
  <li className={styles.navigationItem}>
    <NavLink to={link} className={({ isActive }) => (isActive ? styles.active : '')}>
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
