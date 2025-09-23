import { z } from 'zod';
import { DATABASE_REGIONS } from '@/constants/continentsAndRegions';

export type Continent = keyof typeof DATABASE_REGIONS;
export const ContinentSchema = z.enum(Object.keys(DATABASE_REGIONS) as [Continent, ...Continent[]]);

export type Region = (typeof DATABASE_REGIONS)[Continent][number];
export const RegionSchema = z.enum(Object.values(DATABASE_REGIONS).flat());

const CountryInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: RegionSchema,
  continent: ContinentSchema,
  alpha2code: z.string().length(2),
  alpha3code: z.string().length(3),
  capital: z.string(),
  surfaceArea: z.number(),
  population: z.number(),
  lifeExpectancy: z.number(),
  independenceYear: z.number(),
  governmentForm: z.string(),
  localName: z.string(),
  independent: z.boolean(),
  fullyRecognized: z.boolean(),
  visited: z.boolean(),
  statistics: z.boolean(),
  flagUrl: z.url(),
  borders: z.array(z.tuple([z.string(), z.string(), z.boolean()])),
});

const StateVisitedSchema = z.object({
  name: z.string(),
  code: z.string().regex(/^[A-Z]{2}-[A-Z0-9]{1,3}$/),
});

const StatesVisitedSchema = z.array(StateVisitedSchema);

const NightsSchema = z.object({
  count: z.object({
    free: z.number(),
    paid: z.number(),
    total: z.number(),
  }),
  spots: z.record(z.string(), z.number()),
  infoExtra: z.preprocess(
    (val) => (Array.isArray(val) ? {} : val),
    z.record(z.string(), z.number())
  ),
});

const StatPerHourSchema = z.object({
  hour: z.number().nullable(),
  rides: z.number(),
  distance: z.string(),
  minutes: z.string(),
});

const HitchhikesSchema = z.object({
  totalKilometers: z.number(),
  totalKilometersOpenAir: z.number().nullable(),
  daysOnTheRoad: z.number(),
  totalCars: z.number(),
  distances: z.object({
    longest: z.string(),
    shortest: z.string(),
    average: z.string(),
  }),
  minutesWaiting: z
    .object({
      total: z.number(),
      waits: z.object({
        longest: z.string(),
        shortest: z.string(),
        average: z.string(),
      }),
    })
    .nullable(),
  statsPerHour: z.array(StatPerHourSchema).nullable(),
});

const ExpensesSchema = z.object({
  sum: z.number().nullable(),
  categories: z.preprocess(
    (val) => (Array.isArray(val) ? {} : val),
    z.record(z.string(), z.string())
  ),
});

export const CountryResponseSchema = z.object({
  info: CountryInfoSchema,
  trips: z.array(z.string()),
  citiesVisited: z.array(z.string()),
  statesVisited: StatesVisitedSchema,
  kilometersWalked: z.number().optional(),
  nights: NightsSchema.optional(),
  hitchhikes: HitchhikesSchema.optional().nullable(),
  expenses: ExpensesSchema.optional().nullable(),
});

export type CountryInfo = z.infer<typeof CountryInfoSchema>;
export type StatesVisited = z.infer<typeof StatesVisitedSchema>;
