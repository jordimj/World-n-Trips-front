import React from 'react';
import ExpensesTable from './ExpensesTable';
import InfoLabel from '../../../shared/InfoLabel';
import {
  euroFormatter,
  deductNotDailyExpenses,
} from '../../../../utils/helpers';
import ExpensesPieChart from './ExpensesPieChart';

export default function ExpensesStatistics(props) {
  const { sum, categories } = props.expenses;
  const totalNights = props.totalNights;
  const sumWithoutDailyExp = deductNotDailyExpenses(sum, categories);

  return (
    <section className="Expenses">
      <h2>Expenses</h2>
      <div style={{ display: 'flex', flexFlow: 'row', placeItems: 'center' }}>
        <div style={{ width: '50%' }}>
          <InfoLabel
            label="Total amount of expenses"
            value={euroFormatter(sum)}
          />
          <InfoLabel
            label="Total amount of daily expenses"
            value={euroFormatter(sumWithoutDailyExp)}
          />
          <InfoLabel
            label="Average expenses per day"
            value={euroFormatter(sum / totalNights)}
          />
          <InfoLabel
            label="Average daily expenses per day"
            value={euroFormatter(sumWithoutDailyExp / totalNights)}
          />
        </div>
        <div style={{ width: '50%' }}>
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
