import { useQuery } from '@tanstack/react-query';
import { search } from '@/api';
import { Expenses, Journals } from '@/features/inserter/types';

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
