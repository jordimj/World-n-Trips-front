import { useState } from 'react';
import {
  euroFormatter,
  percentageFormatter,
  tableOrderBy,
} from '../../../../utils/helpers';
import { SortingArrow } from '../../../UI/SortingArrow/SortingArrow';
import styles from './ExpensesTable.module.css';

const NightsTable = ({ sum, categories, totalNights }) => {
  const [direction, setDirection] = useState('desc');
  const [value, setValue] = useState('category');

  const rows = Object.entries(categories);
  const orderedRows = tableOrderBy(rows, value, direction);

  const switchDirection = () => setDirection(direction === 'desc' ? 'asc' : 'desc');

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.headerCell}
          onClick={() => setValueAndDirection('category')}
        >
          <div>Category</div>
          {value === 'category' && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setValueAndDirection('amount')}
        >
          <div>Amount</div>
          {value === 'amount' && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setValueAndDirection('percentage')}
        >
          <div>Percentage</div>
          {value === 'percentage' && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setValueAndDirection('spent')}
        >
          <div>Spent / day</div>
          {value === 'spent' && <SortingArrow direction={direction} />}
        </button>
      </div>
      <div className={styles.rows}>
        {orderedRows.map(([category, amount]) => (
          <div className={styles.row} key={category}>
            <div>{category}</div>
            <div>{euroFormatter(amount)}</div>
            <div>{percentageFormatter(amount / sum)}</div>
            <div>{euroFormatter(amount / totalNights)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NightsTable;
