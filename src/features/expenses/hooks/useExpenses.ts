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
    trips,
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
    ...(countries && { countries: countries.map((country) => country.id) }),
    ...(trips && { trips: trips.map((trip) => trip.id) }),
    ...(categories && { categories }),
    ...(subcategories && { subcategories }),
    ...(currencies && { currencies: currencies.map((currency) => currency.name) }),
    ...(order && { order }),
    ...(orderBy && { orderBy }),
    price,
  };

  return useInfiniteQuery({
    queryKey: ['expenses', variables],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getExpenses({ ...variables, page: pageParam });

      return {
        items: data.data as Expenses,
        totalAmount: data.amount as number,
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
