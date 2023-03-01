import { Box, Divider, Stack } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';
import EuroIcon from '@mui/icons-material/Euro';
import ExpensesTable from './ExpensesTable';
import { deductNotDailyExpenses } from '../../../../../../utils';
import { euroFormatter } from '../../../../../../utils/number';
import ExpensesChart from './ExpensesChart';
import KPI from '../KPI/KPI';
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
    <Stack component="section" alignItems="center" gap={4}>
      <Divider>Expenses</Divider>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Stack gap={3}>
          <Stack direction="row" gap={3}>
            <KPI
              icon={<EuroIcon fontSize="inherit" />}
              label="Total expenses"
              KPI={euroFormatter(sum)}
            />
            <KPI
              icon={<EuroIcon fontSize="inherit" />}
              label="Expenses / day"
              KPI={euroFormatter(sum / totalNights)}
            />
          </Stack>
          <Stack direction="row" gap={3}>
            <KPI
              icon={<MoneyIcon fontSize="inherit" />}
              label="Total daily expenses"
              KPI={euroFormatter(sumWithoutDailyExp)}
            />
            <KPI
              icon={<MoneyIcon fontSize="inherit" />}
              label="Daily expenses / day"
              KPI={euroFormatter(sumWithoutDailyExp / totalNights)}
            />
          </Stack>
        </Stack>
        <Box className={styles.chart}>
          <ExpensesChart expensesByCategory={categories} />
        </Box>
      </Stack>
      <ExpensesTable expenses={detailedExpenses} />
    </Stack>
  );
}
