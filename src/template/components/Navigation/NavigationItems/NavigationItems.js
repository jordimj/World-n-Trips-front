import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = () => (
  <ul className={styles.navigationItems}>
    <NavigationItem link="/">World map</NavigationItem>
    <NavigationItem link="/countries">Countries</NavigationItem>
    <NavigationItem link="/statistics">Travel stats</NavigationItem>
    <NavigationItem link="/trips">Trip journals</NavigationItem>
    <NavigationItem link="/expenses">Expenses</NavigationItem>
  </ul>
);

export default navigationItems;
