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

export const numberFormatter = (number, appendix = '') => {
  const noDecimals = number % 1 === 0;
  return (
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: noDecimals ? 0 : 2,
      maximumFractionDigits: noDecimals ? 0 : 2,
    }).format(number) +
    ' ' +
    appendix
  );
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

export const addDatesToTripCard = (arrivalDate, departureDate) => {
  const arrival = new Date(arrivalDate.date);
  const departure = new Date(departureDate.date);

  const defaultOptions = {
    month: 'long',
    year: 'numeric',
  };

  if (arrival.getFullYear() !== departure.getFullYear()) {
    return (
      Intl.DateTimeFormat('en-US', defaultOptions).format(arrival) +
      ' - ' +
      Intl.DateTimeFormat('en-US', defaultOptions).format(departure)
    );
  }

  if (arrival.getMonth() !== departure.getMonth()) {
    return (
      Intl.DateTimeFormat('en-US', {
        month: 'long',
      }).format(new Date(arrival)) +
      ' - ' +
      Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(departure))
    );
  }

  return Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(arrival));
};

export const groupBy = (items, keyGetter) =>
  items.reduce((acc, cur) => {
    const key = keyGetter(cur);
    return {
      ...acc,
      [key]: [...(acc[key] || []), cur],
    };
  }, []);
