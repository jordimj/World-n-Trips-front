import NavigationItems from '../NavigationItems/NavigationItems';
import SettingsMenu from '../../SettingsMenu/SettingsMenu';
import styles from './Toolbar.module.css';

function Toolbar() {
  return (
    <nav className={styles.toolbar}>
      <NavigationItems />
      <SettingsMenu />
    </nav>
  );
}
export default Toolbar;
