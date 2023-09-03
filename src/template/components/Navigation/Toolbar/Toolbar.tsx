import NavigationItems from '../NavigationItems/NavigationItems';
import Settings from '../Settings';
import styles from './Toolbar.module.css';

function Toolbar() {
  return (
    <nav className={styles.toolbar}>
      <NavigationItems />
      <Settings />
    </nav>
  );
}
export default Toolbar;
