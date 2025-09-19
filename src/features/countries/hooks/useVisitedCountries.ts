import { useQuery } from '@tanstack/react-query';
import { getCountryStats, getVisitedCountries } from '@/api';
import { VisitedCountriesSchema } from '@/features/countries/model/visitedCountry.schema';

export default function useVisitedCountries() {
  return useQuery({
    queryKey: ['visitedCountries'],
    queryFn: async () => {
      const data = await getVisitedCountries();
      return VisitedCountriesSchema.parse(data);
    },
  });
}
