import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Stack } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import EuroIcon from '@mui/icons-material/Euro';
import { deductNotDailyExpenses } from '@/utils';
import { euroFormatter } from '@/utils/number';
import ExpensesTable from './ExpensesTable';
import ExpensesChart from './ExpensesChart';
import Metric from '../Metric';
import styles from './Expenses.module.css';

export default function ExpensesStatistics({ expenses, totalNights }) {
  const { sum, categories } = expenses;
  const sumWithoutDailyExp = deductNotDailyExpenses(sum, categories);

  const navigate = useNavigate();
  const country = useSelector((state) => state.countries.country.info);

  const goToExpenses = () =>
    navigate('/expenses', {
      state: {
        countryId,
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
            <Metric
              icon={<EuroIcon fontSize="inherit" />}
              label="Total expenses"
              metric={euroFormatter(sum)}
            />
            <Metric
              icon={<EuroIcon fontSize="inherit" />}
              label="Expenses / day"
              metric={euroFormatter(sum / totalNights)}
            />
          </Stack>
          <Stack direction="row" gap={3} flexWrap="wrap">
            <Metric
              icon={<MoneyIcon fontSize="inherit" />}
              label="Total daily expenses"
              metric={euroFormatter(sumWithoutDailyExp)}
            />
            <Metric
              icon={<MoneyIcon fontSize="inherit" />}
              label="Daily expenses / day"
              metric={euroFormatter(sumWithoutDailyExp / totalNights)}
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
