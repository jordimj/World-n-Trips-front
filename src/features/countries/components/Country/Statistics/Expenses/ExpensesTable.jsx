import { useState } from 'react';
import { TABLE_DIRECTION_ASC, TABLE_DIRECTION_DESC } from '@/constants';
import { SortingArrow } from '@/template/components/SortingArrow/SortingArrow';
import { tableOrderBy } from '@/utils';
import { euroFormatter, percentageFormatter } from '@/utils/number';
import styles from './ExpensesTable.module.css';

const ORDER_BY_CATEGORY = 'category';
const ORDER_BY_AMOUNT = 'amount';
const ORDER_BY_PERCENTAGE = 'percentage';
const ORDER_BY_DAILY_AVERAGE = 'dailyAverage';

const ExpensesTable = ({ expenses }) => {
  const [direction, setDirection] = useState(TABLE_DIRECTION_DESC);
  const [orderBy, setOrderBy] = useState(ORDER_BY_CATEGORY);

  const orderedExpenses = tableOrderBy(expenses, orderBy, direction);

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
          onClick={() => setOrderByAndDirection(ORDER_BY_CATEGORY)}
        >
          <div>Category</div>
          {orderBy === ORDER_BY_CATEGORY && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_AMOUNT)}
        >
          <div>Amount</div>
          {orderBy === ORDER_BY_AMOUNT && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_PERCENTAGE)}
        >
          <div>Percentage</div>
          {orderBy === ORDER_BY_PERCENTAGE && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setOrderByAndDirection(ORDER_BY_DAILY_AVERAGE)}
        >
          <div>Daily average</div>
          {orderBy === ORDER_BY_DAILY_AVERAGE && <SortingArrow direction={direction} />}
        </button>
      </div>
      <div className={styles.rows}>
        {orderedExpenses.map(({ category, amount, percentage, dailyAverage }) => (
          <div className={styles.row} key={category}>
            <div>{category}</div>
            <div>{euroFormatter(amount)}</div>
            <div>{percentageFormatter(percentage)}</div>
            <div>{`${euroFormatter(dailyAverage)} / day`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;
