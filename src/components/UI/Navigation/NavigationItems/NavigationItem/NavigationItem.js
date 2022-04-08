import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navigationItem = ({ exact, link, children }) => (
  <li className={styles.navigationItem}>
    <NavLink
      exact={exact}
      to={link}
      className={({ isActive }) => isActive && styles.active}
    >
      {children}
    </NavLink>
  </li>
);

export default navigationItem;
