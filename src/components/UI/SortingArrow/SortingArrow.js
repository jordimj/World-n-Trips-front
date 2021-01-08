import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import styles from './SortingArrow.module.css';

export const SortingArrow = ({ direction }) => {
  if (!direction) return null;

  return (
    <div className={styles.headingArrow}>
      {direction === 'desc' && <KeyboardArrowDownRounded color="inherit" />}
      {direction === 'asc' && <KeyboardArrowUpRounded color="inherit" />}
    </div>
  );
};
