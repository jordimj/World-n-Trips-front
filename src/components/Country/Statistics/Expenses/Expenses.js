import { Box, Divider } from '@mui/material';
import ExpensesTable from './ExpensesTable';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
import { euroFormatter, deductNotDailyExpenses } from '../../../../utils/helpers';
import ExpensesChart from './ExpensesChart';
import styles from './Expenses.module.css';

export default function ExpensesStatistics({ expenses, totalNights }) {
  const { sum, categories } = expenses;
  const sumWithoutDailyExp = deductNotDailyExpenses(sum, categories);

  const detailedExpenses = Object.entries(categories).reduce(
    (acc, current) => [
      ...acc,
      {
        category: current[0],
        amount: current[1],
        percentage: current[1] / sum,
        dailyAverage: current[1] / totalNights,
      },
    ],
    []
  );

  return (
    <Box component="section" sx={{ textAlign: '-webkit-center' }}>
      <Divider>Expenses</Divider>
      <div className={styles.container}>
        <div className={styles.partition}>
          <DetailRow label="Total amount of expenses" value={euroFormatter(sum)} />
          <DetailRow
            label="Total amount of daily expenses"
            value={euroFormatter(sumWithoutDailyExp)}
          />
          <DetailRow
            label="Average expenses per day"
            value={euroFormatter(sum / totalNights)}
          />
          <DetailRow
            label="Average daily expenses per day"
            value={euroFormatter(sumWithoutDailyExp / totalNights)}
          />
        </div>
        <div className={styles.chart}>
          <ExpensesChart expensesByCategory={categories} />
        </div>
      </div>
      <ExpensesTable expenses={detailedExpenses} />
    </Box>
  );
}
