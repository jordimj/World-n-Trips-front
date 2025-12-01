import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setCountryVisited } from '@/api';

export default function useSetCountryVisited() {
  const queryClient = useQueryClient();
  const { countryCode } = useParams();

  return useMutation({
    mutationFn: async (visited: boolean) => {
      if (countryCode === undefined) throw new Error('Missing country code');
      return setCountryVisited(countryCode, visited);
    },
    onSuccess: async () => {
      if (countryCode === undefined) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['country', countryCode] }),
        queryClient.invalidateQueries({ queryKey: ['visitedCountries'] }),
      ]);
    },
  });
}
