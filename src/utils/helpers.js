import { TABLE_DIRECTION_ASC, TABLE_DIRECTION_DESC } from '../constants';

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

export const getAdverbialNumber = (number) => {
  if (number === 1) return 'Once';
  if (number === 2) return 'Twice';
  return `${number} times`;
};

export const tableOrderBy = (rows, value, direction) => {
  if (direction === TABLE_DIRECTION_ASC)
    return [...rows].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  if (direction === TABLE_DIRECTION_DESC)
    return [...rows].sort((a, b) => (a[value] > b[value] ? -1 : 1));

  return rows;
};
