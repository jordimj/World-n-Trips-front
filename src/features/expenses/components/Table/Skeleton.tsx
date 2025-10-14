import { Skeleton as MuiSkeleton, TableCell, TableRow } from '@mui/material';
import styles from '../Table/index.module.css';

interface Props {
  cells: number;
}

function Skeleton(props: Props) {
  const { cells } = props;

  return Array.from({ length: 3 }).map((row, idx) => (
    <TableRow key={`row-${idx}`} className={styles.row}>
      {Array.from({ length: cells }).map((item, idx) => (
        <TableCell key={`cell-${idx}`}>
          <MuiSkeleton
            variant={idx === 5 ? 'circular' : 'text'}
            height={32}
            width={idx === 5 ? '32px' : '90%'}
          />
        </TableCell>
      ))}
    </TableRow>
  ));
}

export default Skeleton;
