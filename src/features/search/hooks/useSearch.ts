import { useQuery } from '@tanstack/react-query';
import { search } from '@/api';

export interface Expense {
  id: number;
  day: string;
  category: string;
  subcategory: string;
  details: string;
  value: number;
  currency: string;
  valueEur: number;
  country: string;
}

export interface Expenses extends Array<Expense> {}

export interface Journal {
  id: number;
  date: string;
  title: string;
  text: string;
}

export interface Journals extends Array<Journal> {}

interface SearchResult {
  expenses: Expenses;
  journals: Journals;
}

function useSearch(keyword: string) {
  return useQuery({
    queryKey: ['search', keyword],
    queryFn: async () => {
      const response = await search(keyword);
      return response as SearchResult;
    },
    enabled: keyword.length > 2,
    refetchOnWindowFocus: false,
  });
}

export default useSearch;
