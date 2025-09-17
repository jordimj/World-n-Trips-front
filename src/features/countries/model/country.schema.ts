import { z } from 'zod';

export const CountryInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  continent: z.string(),
  alpha2code: z.string(),
  alpha3code: z.string(),
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
  flagUrl: z.string().url(),
  borders: z.array(z.tuple([z.string(), z.string(), z.boolean()])),
});

export const StateVisitedSchema = z.object({
  name: z.string(),
  code: z.string(),
});

export const StatesVisitedSchema = z.array(StateVisitedSchema);

export const NightsSchema = z.object({
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

export const StatPerHourSchema = z.object({
  hour: z.number(),
  rides: z.number(),
  distance: z.string(),
  minutes: z.string(),
});

export const HitchhikesSchema = z.object({
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

export const ExpensesSchema = z.object({
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
export type Nights = z.infer<typeof NightsSchema>;
export type StatPerHour = z.infer<typeof StatPerHourSchema>;
export type Hitchhikes = z.infer<typeof HitchhikesSchema>;
export type Expenses = z.infer<typeof ExpensesSchema>;
export type CountryResponse = z.infer<typeof CountryResponseSchema>;
