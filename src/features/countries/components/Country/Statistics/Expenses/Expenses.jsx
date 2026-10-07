import { Box, Button, Stack } from '@mui/material';
import Divider from '@/template/components/Divider';
import Metric from '@/template/components/Metric';
import { deductNotDailyExpenses } from '@/utils';
import ExpensesChart from './ExpensesChart';
import ExpensesTable from './ExpensesTable';
import styles from './Expenses.module.css';

export default function ExpensesStatistics({ expenses, totalNights, onViewExpenses }) {
  const { sum, categories } = expenses;
  const sumWithoutDailyExp = deductNotDailyExpenses(sum, categories);

  const detailedExpenses = Object.entries(categories).map(([category, amount]) => ({
    category,
    amount,
    percentage: sum > 0 ? amount / sum : 0,
    dailyAverage: totalNights > 0 ? amount / totalNights : null,
  }));

  return (
    <Stack component="section" alignItems="center" gap={4} sx={{ mt: 6, mb: 2 }}>
      <Divider>Expenses</Divider>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={3}
        flexWrap="wrap"
        sx={{ width: '100%' }}
      >
        <Stack gap={3}>
          <Stack direction="row" gap={3} flexWrap="wrap">
            <Metric.Expenses metric={sum} />
            <Metric.Expenses
              label="Expenses / day"
              metric={totalNights > 0 ? sum / totalNights : null}
            />
          </Stack>
          <Stack direction="row" gap={3} flexWrap="wrap">
            <Metric.Expenses
              label="Total daily expenses"
              metric={sumWithoutDailyExp}
              withMoneyIcon
            />
            <Metric.Expenses
              label="Daily expenses / day"
              metric={totalNights > 0 ? sumWithoutDailyExp / totalNights : null}
              withMoneyIcon
            />
          </Stack>
        </Stack>
        {sum > 0 && (
          <Box className={styles.chart}>
            <ExpensesChart expensesByCategory={categories} />
          </Box>
        )}
      </Stack>
      <ExpensesTable expenses={detailedExpenses} />
      <Button variant="text" onClick={onViewExpenses} sx={{ ml: 'auto' }}>
        Go to detailed expenses
      </Button>
    </Stack>
  );
}
