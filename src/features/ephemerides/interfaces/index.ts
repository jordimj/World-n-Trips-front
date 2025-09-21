import { CountryInfo } from '@/features/countries/model/country.schema';

interface Ephemeris {
  dayId: number;
  date: string;
  sleptAt: string;
  trip: string;
  city: string;
  state: string;
  country: Pick<CountryInfo, 'name' | 'alpha3code'>;
}

export interface Ephemerides extends Array<Ephemeris> {}
