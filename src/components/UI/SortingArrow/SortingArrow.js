import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import { TABLE_DIRECTION_ASC, TABLE_DIRECTION_DESC } from '../../../constants';
import styles from './SortingArrow.module.css';

export const SortingArrow = ({ direction }) => {
  if (!direction) return null;

  return (
    <div className={styles.headingArrow}>
      {direction === TABLE_DIRECTION_DESC && <KeyboardArrowDownRounded color="inherit" />}
      {direction === TABLE_DIRECTION_ASC && <KeyboardArrowUpRounded color="inherit" />}
    </div>
  );
};
