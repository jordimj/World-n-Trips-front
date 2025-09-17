import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCountryStats } from '@/api';
import { CountryResponseSchema } from '@/features/countries/model/country.schema';

export default function useCountry() {
  const { countryCode = '' } = useParams();

  return useQuery({
    queryKey: ['country', countryCode],
    queryFn: async () => {
      const data = await getCountryStats(countryCode);
      return CountryResponseSchema.parse(data);
    },
    enabled: countryCode !== '',
  });
}
