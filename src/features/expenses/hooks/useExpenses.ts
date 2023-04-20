import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as API from '@/api/api';
import { Expenses, ExpensesFilters } from '../interfaces';

function useExpenses(filters: ExpensesFilters) {
  const { query, from, to, countries, categories, subcategories, currencies, price } =
    filters;

  const variables = {
    ...(query && { query }),
    ...(from && { from: new Intl.DateTimeFormat('en-CA').format(from) }),
    ...(to && { to: new Intl.DateTimeFormat('en-CA').format(to) }),
    ...(countries && { countries }),
    ...(categories && { categories }),
    ...(subcategories && { subcategories }),
    ...(currencies && { currencies }),
    price,
  };

  return useInfiniteQuery({
    queryKey: ['fetch-expenses', variables],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await API.getExpenses({ ...variables, page: pageParam });

      return {
        items: data.data as Expenses,
        pagination: data.pagination,
      };
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.currentPage + 1;
      return nextPage <= lastPage.pagination.totalPages ? nextPage : undefined;
    },
    getPreviousPageParam: (firstPage) => firstPage.pagination.currentPage - 1,
    refetchOnWindowFocus: false,
  });
}

export default useExpenses;
