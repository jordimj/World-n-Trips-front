import { Fragment } from 'react';
import { Skeleton as MuiSkeleton, TableCell, TableRow } from '@mui/material';
import styles from '../Table/index.module.css';

interface Props {
  cells: number;
}

function Skeleton(props: Props) {
  const { cells } = props;

  return (
    <Fragment>
      {Array.from({ length: 3 }).map((row, idx) => (
        <TableRow key={`row-${idx}`} className={styles.row}>
          {Array.from({ length: cells }).map((item, idx) => (
            <TableCell key={`cell-${idx}`}>
              <MuiSkeleton height={36} sx={{ mx: 3 }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Fragment>
  );
}

export default Skeleton;
