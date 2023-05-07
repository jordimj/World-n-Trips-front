import { OrderBy } from '@/features/expenses/interfaces';
import { Box, TableCell, TableSortLabel, capitalize } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface Props {
  kind: OrderBy;
  sortBy: (sort: OrderBy) => void;
  orderBy: OrderBy;
  order: 'asc' | 'desc';
}

function SortableTableHead(props: Props) {
  const { kind, sortBy, order, orderBy } = props;

  const label = kind === 'valueEur' ? 'Value' : capitalize(kind);

  return (
    <TableCell align="center">
      <TableSortLabel
        active={orderBy === kind}
        direction={orderBy === kind ? order : 'asc'}
        onClick={() => sortBy(kind)}
      >
        {label}
        {orderBy === kind ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
}

export default SortableTableHead;
