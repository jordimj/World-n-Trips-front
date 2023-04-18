import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import { TABLE_DIRECTION_DESC } from '../../../constants';
import styles from './SortingArrow.module.css';

interface Props {
  direction: 'asc' | 'desc';
}

export const SortingArrow = ({ direction }: Props) => {
  if (!direction) return null;

  return (
    <div className={styles.headingArrow}>
      {direction === TABLE_DIRECTION_DESC ? (
        <KeyboardArrowDownRounded color="inherit" />
      ) : (
        <KeyboardArrowUpRounded color="inherit" />
      )}
    </div>
  );
};
