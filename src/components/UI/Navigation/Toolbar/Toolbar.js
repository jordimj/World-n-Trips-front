import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';
import SettingsMenu from '../../SettingsMenu/SettingsMenu';

const toolbar = () => (
  <nav className={styles.toolbar}>
    <NavigationItems />
    <SettingsMenu />
  </nav>
);

export default toolbar;
