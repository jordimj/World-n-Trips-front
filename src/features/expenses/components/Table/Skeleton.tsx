import { Skeleton as MuiSkeleton, TableCell, TableRow } from '@mui/material';
import styles from '../Table/index.module.css';

interface Props {
  cells: number;
}

function Skeleton(props: Props) {
  const { cells } = props;

  return Array.from({ length: 3 }).map((_, rowIdx) => (
    <TableRow key={`row-${rowIdx}`} className={styles.row}>
      {Array.from({ length: cells }).map((_, cellIdx) => (
        <TableCell key={`cell-${cellIdx}`}>
          <MuiSkeleton
            variant={cellIdx === 5 ? 'circular' : 'text'}
            height={32}
            width={cellIdx === 5 ? 'var(--spacing-6)' : '80%'}
          />
        </TableCell>
      ))}
    </TableRow>
  ));
}

export default Skeleton;
