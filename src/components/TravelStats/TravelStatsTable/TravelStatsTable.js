import { useState } from 'react';
import { TABLE_DIRECTION_ASC, TABLE_DIRECTION_DESC } from '../../../constants';
import { percentageFormatter, tableOrderBy } from '../../../utils/helpers';
import { SortingArrow } from '../../UI/SortingArrow/SortingArrow';
import styles from './TravelStatsTable.module.css';

const ORDER_BY_AREA = 'area';
const ORDER_BY_VISITED = 'visited';
const ORDER_BY_TOTAL = 'total';
const ORDER_BY_PERCENTAGE = 'percentage';

const TravelStatsTable = ({ stats, kind = 'continent', shortTable = false }) => {
  const [direction, setDirection] = useState(TABLE_DIRECTION_DESC);
  const [orderBy, setOrderBy] = useState(ORDER_BY_AREA);

  const orderedStats = tableOrderBy(stats, orderBy, direction);

  const switchDirection = () =>
    setDirection(
      direction === TABLE_DIRECTION_DESC ? TABLE_DIRECTION_ASC : TABLE_DIRECTION_DESC
    );

  const setOrderByAndDirection = (orderBy) => {
    switchDirection();
    setOrderBy(orderBy);
  };

  return (
    <table className={styles.container}>
      <thead className={styles.header}>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_AREA)}
        >
          {kind}
          {orderBy === ORDER_BY_AREA && <SortingArrow direction={direction} />}
        </button>
        {!shortTable && (
          <button
            className={styles.headerCell}
            onClick={() => setOrderByAndDirection(ORDER_BY_VISITED)}
          >
            Visited
            {orderBy === ORDER_BY_VISITED && <SortingArrow direction={direction} />}
          </button>
        )}
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_TOTAL)}
        >
          Total
          {orderBy === ORDER_BY_TOTAL && <SortingArrow direction={direction} />}
        </button>
        {!shortTable && (
          <button
            className={styles.headerCell}
            onClick={() => setOrderByAndDirection(ORDER_BY_PERCENTAGE)}
          >
            Percentage
            {orderBy === ORDER_BY_PERCENTAGE && <SortingArrow direction={direction} />}
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
            <td>{total}</td>
            {!shortTable && <td>{percentageFormatter(percentage)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TravelStatsTable;
