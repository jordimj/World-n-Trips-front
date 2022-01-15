import { useState } from 'react';
import { TABLE_DIRECTION_ASC, TABLE_DIRECTION_DESC } from '../../../constants';
import { percentageFormatter, tableOrderBy } from '../../../utils/helpers';
import { SortingArrow } from '../../UI/SortingArrow/SortingArrow';
import styles from './TravelStatsTable.module.css';

const ORDER_BY_AREA = 'area';
const ORDER_BY_VISITED = 'visited';
const ORDER_BY_TOTAL = 'total';
const ORDER_BY_PERCENTAGE = 'percentage';

const TravelStatsTable = ({ stats }) => {
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
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_AREA)}
        >
          <div>Continents</div>
          {orderBy === ORDER_BY_AREA && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_VISITED)}
        >
          <div>Visited</div>
          {orderBy === ORDER_BY_VISITED && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_TOTAL)}
        >
          <div>Total</div>
          {orderBy === ORDER_BY_TOTAL && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_PERCENTAGE)}
        >
          <div>Percentage</div>
          {orderBy === ORDER_BY_PERCENTAGE && <SortingArrow direction={direction} />}
        </button>
      </div>
      <div className={styles.rows}>
        {orderedStats.map(({ name, visited, total, percentage }) => (
          <div className={styles.row} key={name}>
            <div>{name}</div>
            <div>{visited}</div>
            <div>{total}</div>
            <div>{percentageFormatter(percentage)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelStatsTable;
