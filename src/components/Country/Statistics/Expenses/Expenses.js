import React from 'react';
import ExpensesTable from './ExpensesTable';
import DetailRow from '../../CountryDetails/DetailRow/DetailRow';
import {
  euroFormatter,
  deductNotDailyExpenses,
} from '../../../../utils/helpers';
import ExpensesPieChart from './ExpensesPieChart';
import styles from './Expenses.module.css';

export default function ExpensesStatistics(props) {
  const { sum, categories } = props.expenses;
  const totalNights = props.totalNights;
  const sumWithoutDailyExp = deductNotDailyExpenses(sum, categories);

  return (
    <section>
      <h2>Expenses</h2>
      <div className={styles.container}>
        <div className={styles.partition}>
          <DetailRow
            label="Total amount of expenses"
            value={euroFormatter(sum)}
          />
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
          <ExpensesPieChart expensesByCategory={categories} />
        </div>
      </div>
      <ExpensesTable
        sum={sum}
        categories={categories}
        totalNights={totalNights}
      />
    </section>
  );
}
