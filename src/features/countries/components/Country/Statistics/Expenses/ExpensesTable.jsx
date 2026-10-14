import { useState } from 'react';
import { euroFormatter } from '@/utils/number';
import styles from './ExpensesTable.module.css';

const percentFormatter = new Intl.NumberFormat('en', {
  style: 'percent',
  maximumFractionDigits: 1,
});
export default function ExpensesTable({ expenses, dayBasis = 'calendar' }) {
  const [sort, setSort] = useState({ key: 'amount', direction: 'desc' });
  const ordered = [...expenses].sort((a, b) => {
    const result =
      sort.key === 'category' ? a.category.localeCompare(b.category) : a.amount - b.amount;
    return sort.direction === 'asc' ? result : -result;
  });
  const changeSort = (key) =>
    setSort((previous) => ({
      key,
      direction:
        previous.key === key
          ? previous.direction === 'asc'
            ? 'desc'
            : 'asc'
          : key === 'category'
            ? 'asc'
            : 'desc',
    }));
  return (
    <table
      className={styles.table}
      aria-label={`Expenses by category, with share and ${dayBasis} daily average`}
    >
      <thead>
        <tr>
          {[
            ['category', 'Category'],
            ['amount', 'Amount'],
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
        {ordered.map(({ category, amount, percentage, dailyAverage }) => (
          <tr key={category}>
            <th scope="row">
              <span className={styles.category}>{category.toLowerCase()}</span>
              <div className={styles.track} aria-hidden="true">
                <span style={{ width: `${Math.min(1, Math.max(0, percentage ?? 0)) * 100}%` }} />
              </div>
            </th>
            <td>
              <span className={styles.amount}>{euroFormatter(amount)}</span>
              <span className={styles.percentage}>
                {percentage === null ? '—' : percentFormatter.format(percentage)}
                <span className={styles.srOnly}> of total</span>
              </span>
              <span className={styles.daily}>
                {dailyAverage === null ? '— / day' : `${euroFormatter(dailyAverage)} / day`}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
