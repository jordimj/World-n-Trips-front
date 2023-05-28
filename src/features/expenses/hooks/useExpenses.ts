import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getExpenses } from '@/api';
import { formatDatabaseDate } from '@/utils/date';
import { Expenses, ExpensesFilters } from '../interfaces';

function useExpenses(filters: ExpensesFilters) {
  const {
    query,
    from,
    to,
    countries,
    categories,
    subcategories,
    currencies,
    price,
    order,
    orderBy,
  } = filters;

  const variables = {
    ...(query && { query }),
    ...(from && { from: formatDatabaseDate(from) }),
    ...(to && { to: formatDatabaseDate(to) }),
    ...(countries && { countries }),
    ...(categories && { categories }),
    ...(subcategories && { subcategories }),
    ...(currencies && { currencies }),
    ...(order && { order }),
    ...(orderBy && { orderBy }),
    price,
  };

  return useInfiniteQuery({
    queryKey: ['expenses', variables],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getExpenses({ ...variables, page: pageParam });

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
