import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import { useState } from 'react';
import styles from './NightsTable.module.css';

const orderBy = (rows, value, direction) => {
  if (direction === 'asc')
    return [...rows].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  if (direction === 'desc')
    return [...rows].sort((a, b) => (a[value] > b[value] ? -1 : 1));

  return rows;
};

const SortArrow = ({ direction }) => {
  if (!direction) return null;

  return (
    <div className={styles.headingArrow}>
      {direction === 'desc' && <KeyboardArrowDownRounded color="inherit" />}
      {direction === 'asc' && <KeyboardArrowUpRounded color="inherit" />}
    </div>
  );
};

const NightsTable = ({ spots }) => {
  const [direction, setDirection] = useState('desc');
  const [value, setValue] = useState('nights');

  const rows = Object.entries(spots);
  const orderedRows = orderBy(rows, value, direction);

  const switchDirection = () => {
    if (direction === 'asc') setDirection('desc');
    else if (direction === 'desc') setDirection('asc');
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.headerCell}
          onClick={() => setValueAndDirection('spotKind')}
        >
          <div>Kind of spot</div>
          {value === 'spotKind' && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setValueAndDirection('nights')}
        >
          <div>Number of nights</div>
          {value === 'nights' && <SortArrow direction={direction} />}
        </button>
      </div>
      <div className={styles.rows}>
        {orderedRows.map(([spotKind, numberOfNights]) => (
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
