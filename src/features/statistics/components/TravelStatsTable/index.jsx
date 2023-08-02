import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import {
  DATA_APPENDICES,
  ORDER_BY,
  TABLE_DIRECTION_ASC,
  TABLE_DIRECTION_DESC,
} from '@/constants';
import { SortingArrow } from '@/template/components/SortingArrow/SortingArrow';
import { tableOrderBy } from '@/utils';
import { euroFormatter, numberFormatter, percentageFormatter } from '@/utils/number';
import styles from './TravelStatsTable.module.css';

const TravelStatsTable = ({
  stats,
  kind = 'continent',
  shortTable = false,
  title = '',
  format = '',
}) => {
  const [direction, setDirection] = useState(TABLE_DIRECTION_DESC);
  const [orderBy, setOrderBy] = useState(ORDER_BY.AREA);

  const orderedStats = tableOrderBy(stats, orderBy, direction);

  const switchDirection = () =>
    setDirection(
      direction === TABLE_DIRECTION_DESC ? TABLE_DIRECTION_ASC : TABLE_DIRECTION_DESC
    );

  const setOrderByAndDirection = (orderBy) => {
    switchDirection();
    setOrderBy(orderBy);
  };

  const dataFormat = (number) => {
    if (format === 'currency') return euroFormatter(number);
    if (format === 'kilometers') return numberFormatter(number, DATA_APPENDICES.KM);

    return number;
  };

  return (
    <Stack gap={1} sx={{ textAlign: 'center' }}>
      {title !== '' && (
        <Typography
          variant="h6"
          textTransform="uppercase"
          sx={{ px: '32px', fontWeight: 400 }}
        >
          {title}
        </Typography>
      )}
      <table className={styles.container}>
        <thead className={styles.header}>
          <button
            className={styles.headerCell}
            onClick={() => setOrderByAndDirection(ORDER_BY.AREA)}
          >
            {kind}
            {orderBy === ORDER_BY.AREA && <SortingArrow direction={direction} />}
          </button>
          {!shortTable && (
            <button
              className={styles.headerCell}
              onClick={() => setOrderByAndDirection(ORDER_BY.VISITED)}
            >
              Visited
              {orderBy === ORDER_BY.VISITED && <SortingArrow direction={direction} />}
            </button>
          )}
          <button
            className={styles.headerCell}
            onClick={() => setOrderByAndDirection(ORDER_BY.TOTAL)}
          >
            Total
            {orderBy === ORDER_BY.TOTAL && <SortingArrow direction={direction} />}
          </button>
          {!shortTable && (
            <button
              className={styles.headerCell}
              onClick={() => setOrderByAndDirection(ORDER_BY.PERCENTAGE)}
            >
              Percentage
              {orderBy === ORDER_BY.PERCENTAGE && <SortingArrow direction={direction} />}
            </button>
          )}
        </thead>
        <tbody className={styles.rows}>
          {orderedStats.map(({ name, visited, total, percentage }) => (
            <tr
              className={[styles.row, shortTable && styles.shortRow]
                .filter(Boolean)
                .join(' ')}
              key={name}
            >
              <td>{name}</td>
              {!shortTable && <td>{visited}</td>}
              <td>{dataFormat(total)}</td>
              {!shortTable && <td>{percentageFormatter(percentage)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </Stack>
  );
};

export default TravelStatsTable;
