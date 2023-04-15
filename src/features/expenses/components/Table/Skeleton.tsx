import { Fragment } from 'react';
import { Skeleton as MuiSkeleton, TableCell, TableRow } from '@mui/material';

interface Props {
  cells: number;
}

function Skeleton(props: Props) {
  const { cells } = props;

  return (
    <Fragment>
      {Array.from({ length: 3 }).map((row, idx) => (
        <TableRow key={`row-${idx}`}>
          {Array.from({ length: cells }).map((item, idx) => (
            <TableCell key={`cell-${idx}`}>
              <MuiSkeleton height={25} sx={{ mx: 3 }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Fragment>
  );
}

export default Skeleton;
