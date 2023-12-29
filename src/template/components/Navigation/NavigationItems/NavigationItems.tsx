import EditNoteIcon from '@mui/icons-material/EditNote';
import EuroIcon from '@mui/icons-material/Euro';
import FlagIcon from '@mui/icons-material/Flag';
import PublicIcon from '@mui/icons-material/Public';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = () => (
  <nav>
    <ul className={styles.navigationItems}>
      <NavigationItem
        icon={<PublicIcon fontSize="large" />}
        label="World map"
        link="/"
      ></NavigationItem>
      <NavigationItem
        icon={<FlagIcon fontSize="large" />}
        label="Countries"
        link="/countries"
      ></NavigationItem>
      <NavigationItem
        icon={<TravelExploreIcon fontSize="large" />}
        label="Travel stats"
        link="/statistics"
      ></NavigationItem>
      <NavigationItem
        icon={<EditNoteIcon fontSize="large" />}
        label="Trip journals"
        link="/trips"
      ></NavigationItem>
      <NavigationItem
        icon={<EuroIcon fontSize="large" />}
        label="Expenses"
        link="/expenses"
      ></NavigationItem>
    </ul>
  </nav>
);

export default navigationItems;
