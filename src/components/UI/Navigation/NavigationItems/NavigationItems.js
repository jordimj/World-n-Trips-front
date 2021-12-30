import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = () => (
  <ul className={styles.navigationItems}>
    <NavigationItem link="/" exact>
      World map
    </NavigationItem>
    <NavigationItem link="/countriesList">List of countries</NavigationItem>
  </ul>
);

export default navigationItems;
