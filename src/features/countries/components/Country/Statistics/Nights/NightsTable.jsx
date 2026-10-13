import { useState } from 'react';
import styles from './NightsTable.module.css';

export default function NightsTable({ spots }) {
  const [sort, setSort] = useState({ key: 'numberOfNights', direction: 'desc' });
  const ordered = [...spots].sort((a, b) => {
    const result =
      sort.key === 'spotKind'
        ? a.spotKind.localeCompare(b.spotKind)
        : a.numberOfNights - b.numberOfNights;
    return sort.direction === 'asc' ? result : -result;
  });
  const maximum = Math.max(1, ...spots.map((spot) => spot.numberOfNights));
  const changeSort = (key) =>
    setSort((previous) => ({
      key,
      direction:
        previous.key === key
          ? previous.direction === 'asc'
            ? 'desc'
            : 'asc'
          : key === 'spotKind'
            ? 'asc'
            : 'desc',
    }));
  return (
    <table className={styles.table} aria-label="Nights by accommodation type">
      <thead>
        <tr>
          {[
            ['spotKind', 'Accommodation'],
            ['numberOfNights', 'Nights'],
          ].map(([key, label]) => (
            <th
              key={key}
              scope="col"
              aria-sort={
                sort.key === key ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'
              }
            >
              <button onClick={() => changeSort(key)}>
                {label}
                <span aria-hidden="true">
                  {sort.key === key ? (sort.direction === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
                </span>
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ordered.map(({ spotKind, numberOfNights }) => (
          <tr key={spotKind}>
            <th scope="row">
              <span>{spotKind}</span>
              <div className={styles.track} aria-hidden="true">
                <span style={{ width: `${(numberOfNights / maximum) * 100}%` }} />
              </div>
            </th>
            <td>{numberOfNights}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
