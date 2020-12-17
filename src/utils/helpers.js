export const euroFormatter = (expense) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(expense);
};

export const percentageFormatter = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const deductNotDailyExpenses = (totalExpenses, expensesByCategories) => {
  const notDailyExpenses = ['VISA', 'INTERNATIONAL TRANSPORT', 'INSURANCE'];

  return notDailyExpenses.reduce((acc, category) => {
    if (expensesByCategories[category]) {
      acc -= expensesByCategories[category];
    }
    return acc;
  }, totalExpenses);
};
