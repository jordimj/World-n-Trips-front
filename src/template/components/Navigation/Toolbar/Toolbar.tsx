import SettingsMenu from '@/template/components/SettingsMenu/SettingsMenu';
import NavigationItems from '@/template/components/Navigation/NavigationItems/NavigationItems';
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
