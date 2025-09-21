import { z } from 'zod';
import { ContinentSchema, RegionSchema } from '@/features/countries/model/country.schema';

export const VisitedCountrySchema = z.object({
  name: z.string(),
  continent: ContinentSchema,
  region: RegionSchema,
  alpha2code: z.string().length(2),
  alpha3code: z.string().length(3),
  numberOfSpots: z.number(),
});

export const VisitedCountriesSchema = z.array(VisitedCountrySchema);

export type VisitedCountry = z.infer<typeof VisitedCountrySchema>;
export type VisitedCountries = z.infer<typeof VisitedCountriesSchema>;
