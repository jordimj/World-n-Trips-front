import { useQuery } from '@tanstack/react-query';
import * as API from '../../../api/api';
import { Expenses, ExpensesFilters } from '../interfaces';

function useExpenses(filters: ExpensesFilters) {
  const { query, page, from, to, countries, categories, subcategories, currency } =
    filters;

  const variables = {
    page,
    ...(query && { query }),
    ...(from && { from: new Intl.DateTimeFormat('en-CA').format(from) }),
    ...(to && { to: new Intl.DateTimeFormat('en-CA').format(to) }),
    ...(countries && { countries }),
    ...(categories && { categories }),
    ...(subcategories && { subcategories }),
    ...(currency && { currency }),
  };

  return useQuery({
    queryKey: ['fetch-expenses', variables],
    queryFn: async () => {
      const data = await API.getExpenses(variables);

      return data as Expenses;
    },
    refetchOnWindowFocus: false,
  });
}

export default useExpenses;
