import { Skeleton } from '@mui/material';
import styles from './DetailRow.module.css';

interface Props {
  label?: string;
  value?: string | number;
  isLoading?: boolean;
}

export default (props: Props) => {
  const { label, value, isLoading = false } = props;

  return (
    <div className={styles.row}>
      <div className={styles.label}>{label}</div>
      {isLoading ? <Skeleton width={220} height={20} /> : value}
    </div>
  );
};
