import React from "react";
import ExpensesTable from "./ExpensesTable";
import InfoLabel from "../../shared/InfoLabel";
import { expenseEuroFormatter, deductNotDailyExpenses } from "../../../utils/helpers";
import ExpensesPieChart from "./ExpensesPieChart";

export default function ExpensesStatistics(props) {
  const { sumInEuros, categories } = props.expenses;
  const totalNights = props.totalNights;
  const sumWithoutDailyExp = deductNotDailyExpenses(sumInEuros, categories);

  return (
    <section className="Expenses">
      <h2>Expenses</h2>
      <div style={{ display: "flex", flexFlow: "row", placeItems: "center" }}>
        <div style={{ width: "50%" }}>
          <InfoLabel label="Total amount of expenses" value={expenseEuroFormatter(sumInEuros)} />
          <InfoLabel label="Total amount of daily expenses" value={expenseEuroFormatter(sumWithoutDailyExp)} />
          <InfoLabel label="Average expenses per day" value={expenseEuroFormatter(sumInEuros / totalNights)} />
          <InfoLabel label="Average daily expenses per day" value={expenseEuroFormatter(sumWithoutDailyExp / totalNights)} />
        </div>
        <div style={{ width: "50%" }}>
          <ExpensesPieChart expensesByCategory={categories} />
        </div>
      </div>
      <ExpensesTable {...props} />
    </section>
  );
}
