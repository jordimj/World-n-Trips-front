import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import { deductNotDailyExpenses } from '@/utils';
import { euroFormatter } from '@/utils/number';
import useCalendarDuration from '../Nights/useCalendarDuration';
import ExpensesTable from './ExpensesTable';
import styles from './Expenses.module.css';

export default function ExpensesStatistics({ expenses, totalNights = 0, onViewExpenses }) {
  const { days, basis } = useCalendarDuration(totalNights, totalNights);
  const sum = expenses.sum === null ? null : Number(expenses.sum);
  const categories = Object.fromEntries(
    Object.entries(expenses.categories ?? {}).map(([category, amount]) => [
      category,
      Number(amount),
    ])
  );
  const everyday = sum === null ? null : deductNotDailyExpenses(sum, categories);
  const money = (value) => (value === null ? '—' : euroFormatter(value));
  const detailedExpenses = Object.entries(categories).map(([category, amount]) => ({
    category,
    amount,
    percentage: sum > 0 ? amount / sum : null,
    dailyAverage: days ? amount / days : null,
  }));
  return (
    <section className={styles.section} aria-labelledby="expenses-heading">
      <h2 id="expenses-heading">Expenses</h2>
      <div className={styles.layout}>
        <div className={styles.summary}>
          <dl className={styles.metrics}>
            <div>
              <dt>Total travel cost</dt>
              <dd>{money(sum)}</dd>
            </div>
            <div>
              <dt>Per {basis} day</dt>
              <dd>{money(days && sum !== null ? sum / days : null)}</dd>
            </div>
          </dl>
          <p className={styles.note}>
            {days
              ? `Based on ${days} ${basis} ${days === 1 ? 'day' : 'days'}${basis === 'recorded' ? ' (calendar duration unavailable)' : ''}.`
              : 'Daily averages need calendar duration or recorded days.'}
          </p>
          <aside className={styles.everyday} aria-labelledby="everyday-heading">
            <h3 id="everyday-heading">Everyday living costs</h3>
            <div className={styles.everydayMetrics}>
              <p className={styles.everydayTotal}>
                {money(everyday)} <span>total</span>
              </p>
              <p className={styles.everydayAverage}>
                {money(days && everyday !== null ? everyday / days : null)} <span>/ day</span>
              </p>
            </div>
            <p className={styles.note}>Excludes visas, international transport and insurance.</p>
            {everyday !== null && everyday === sum ? (
              <p className={styles.note}>No excluded costs in this summary.</p>
            ) : null}
          </aside>
        </div>
        <div className={styles.categories}>
          {detailedExpenses.length > 0 ? (
            <ExpensesTable expenses={detailedExpenses} dayBasis={basis} />
          ) : (
            <p>No expenses recorded.</p>
          )}
        </div>
      </div>
      {onViewExpenses ? (
        <Button onClick={onViewExpenses} endIcon={<ArrowForwardIcon />} className={styles.link}>
          View detailed expenses
        </Button>
      ) : null}
    </section>
  );
}
