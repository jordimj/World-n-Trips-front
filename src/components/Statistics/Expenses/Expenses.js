import React from "react";
import ExpensesTable from "./ExpensesTable";
import InfoLabel from "../../shared/InfoLabel";

export default function ExpensesStatistics(props) {
  const totalSpent = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(props.expenses.sumInEuros);

  return (
    <section className="Expenses">
      <h2>Expenses</h2>
      <InfoLabel label="Total spent" value={totalSpent} />
      <ExpensesTable {...props} />
    </section>
  );
}
