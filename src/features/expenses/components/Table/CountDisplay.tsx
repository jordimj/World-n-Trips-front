import { Typography, Skeleton } from '@mui/material';
import { euroFormatter } from '@/utils/number';
import { Expenses } from '../../interfaces';

interface Props {
  items: Expenses;
  isFetching: boolean;
  totalAmount?: number;
  totalItems: number;
}

function CountDisplay(props: Props) {
  const { items, isFetching, totalAmount, totalItems } = props;

  if (isFetching || totalAmount === undefined)
    return <Skeleton width={450} height={37} sx={{ ml: 'auto' }} />;

  if (items.length === totalItems)
    return (
      <Typography sx={{ fontSize: 14, pt: 2, px: 2, ml: 'auto' }}>
        Showing all {totalItems} expenses ({euroFormatter(totalAmount)})
      </Typography>
    );

  const currentAmount = items.reduce((acc, cur) => acc + Number(cur.valueEur), 0);

  return (
    <Typography sx={{ fontSize: 14, pt: 2, px: 2, ml: 'auto' }}>
      Showing {items.length} expenses ({euroFormatter(currentAmount)}) out of {totalItems}{' '}
      found ({euroFormatter(totalAmount)})
    </Typography>
  );
}

export default CountDisplay;
