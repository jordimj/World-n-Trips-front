import { Skeleton } from '@mui/material';
import styles from './DetailRow.module.css';

interface Props {
  label?: string;
  value?: string | number;
  isLoading?: boolean;
}
export default function DetailRow({ label, value, isLoading = false }: Props) {
  return (
    <div className={styles.row}>
      <dt>{label}</dt>
      <dd>{isLoading ? <Skeleton width="100%" height={20} /> : (value ?? 'Unavailable')}</dd>
    </div>
  );
}
