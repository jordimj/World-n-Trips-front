import { TABLE_DIRECTION_ASC, TABLE_DIRECTION_DESC } from '@/constants';

export const deductNotDailyExpenses = (
  totalExpenses: number,
  expensesByCategories: Record<string, number>
) => {
  const notDailyExpenses = ['VISA', 'INTERNATIONAL TRANSPORT', 'INSURANCE'];

  return notDailyExpenses.reduce((acc, category) => {
    if (expensesByCategories[category]) {
      acc -= expensesByCategories[category];
    }
    return acc;
  }, totalExpenses);
};

export const tableOrderBy = (
  rows: Array<Record<string, string | number>>,
  value: string,
  direction: 'asc' | 'desc'
) => {
  if (direction === TABLE_DIRECTION_ASC)
    return [...rows].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  if (direction === TABLE_DIRECTION_DESC)
    return [...rows].sort((a, b) => (a[value] > b[value] ? -1 : 1));

  return rows;
};

export function groupBy<T>(
  array: Array<T>,
  keySelector: (item: T) => string
): Record<string, T[]> {
  return array.reduce((acc: Record<string, T[]>, item: T) => {
    const key = keySelector(item);

    // found key, push item into existing array
    if (key in acc) acc[key].push(item);
    // did not find key, create new array with item
    else acc[key] = [item];

    return acc;
  }, {});
}

export const buildTripName = (trip: string) =>
  trip.endsWith('TRIP') ? trip : `${trip} TRIP`;

export const getCountryFlagSrc = (countryCode: string) => `/img/flags/${countryCode}.png`;
