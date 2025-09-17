import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import useCountry from '@/features/countries/hooks/useCountry';
import Divider from '@/template/components/Divider';
import Metric from '@/template/components/Metric';
import { deductNotDailyExpenses } from '@/utils';
import ExpensesChart from './ExpensesChart';
import ExpensesTable from './ExpensesTable';
import styles from './Expenses.module.css';

export default function ExpensesStatistics({ expenses, totalNights }) {
  const { sum, categories } = expenses;
  const sumWithoutDailyExp = deductNotDailyExpenses(sum, categories);

  const navigate = useNavigate();
  const { data: country } = useCountry();

  const goToExpenses = () =>
    navigate('/expenses', {
      state: {
        country: {
          id: country.id,
          name: country.name,
        },
      },
    });

  const detailedExpenses = Object.entries(categories).map(([category, amount]) => ({
    category,
    amount,
    percentage: amount / sum,
    dailyAverage: amount / totalNights,
  }));

  return (
    <Stack component="section" alignItems="center" gap={4} sx={{ mb: 2 }}>
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
            <Metric.Expenses label="Expenses / day" metric={sum / totalNights} />
          </Stack>
          <Stack direction="row" gap={3} flexWrap="wrap">
            <Metric.Expenses
              label="Total daily expenses"
              metric={sumWithoutDailyExp}
              withMoneyIcon
            />
            <Metric.Expenses
              label="Daily expenses / day"
              metric={sumWithoutDailyExp / totalNights}
              withMoneyIcon
            />
          </Stack>
        </Stack>
        <Box className={styles.chart}>
          <ExpensesChart expensesByCategory={categories} />
        </Box>
      </Stack>
      <ExpensesTable expenses={detailedExpenses} />
      <Button variant="text" onClick={goToExpenses} sx={{ ml: 'auto' }}>
        Go to detailed expenses
      </Button>
    </Stack>
  );
}
