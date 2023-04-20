import { useState } from 'react';
import { TABLE_DIRECTION_ASC, TABLE_DIRECTION_DESC } from '@/constants';
import { SortingArrow } from '@/template/components/SortingArrow/SortingArrow';
import { tableOrderBy } from '@/utils';
import styles from './NightsTable.module.css';

const ORDER_BY_SPOT_KIND = 'spotKind';
const ORDER_BY_TOTAL_NIGHTS = 'nights';

const NightsTable = ({ spots }) => {
  const [direction, setDirection] = useState(TABLE_DIRECTION_DESC);
  const [orderBy, setOrderBy] = useState(ORDER_BY_TOTAL_NIGHTS);

  const orderedSpots = tableOrderBy(spots, orderBy, direction);

  const switchDirection = () => {
    setDirection(
      direction === TABLE_DIRECTION_DESC ? TABLE_DIRECTION_ASC : TABLE_DIRECTION_DESC
    );
  };

  const setOrderByAndDirection = (orderBy) => {
    switchDirection();
    setOrderBy(orderBy);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_SPOT_KIND)}
        >
          <div>Kind of spot</div>
          {orderBy === ORDER_BY_SPOT_KIND && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_TOTAL_NIGHTS)}
        >
          <div>Number of nights</div>
          {orderBy === ORDER_BY_TOTAL_NIGHTS && <SortingArrow direction={direction} />}
        </button>
      </div>
      <div className={styles.rows}>
        {orderedSpots.map(({ spotKind, numberOfNights }) => (
          <div className={styles.row} key={spotKind}>
            <div>{spotKind}</div>
            <div>{numberOfNights}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NightsTable;
