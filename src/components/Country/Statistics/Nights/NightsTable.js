import { useState } from 'react';
import { tableOrderBy } from '../../../../utils/helpers';
import { SortingArrow } from '../../../UI/SortingArrow/SortingArrow';
import styles from './NightsTable.module.css';

const NightsTable = ({ spots }) => {
  const [direction, setDirection] = useState('desc');
  const [value, setValue] = useState('nights');

  const rows = Object.entries(spots);
  const orderedRows = tableOrderBy(rows, value, direction);

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
          {value === 'spotKind' && <SortingArrow direction={direction} />}
        </button>
        <button
          className={styles.headerCell}
          onClick={() => setValueAndDirection('nights')}
        >
          <div>Number of nights</div>
          {value === 'nights' && <SortingArrow direction={direction} />}
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
