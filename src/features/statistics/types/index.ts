import { z } from 'zod';

const CountryGroupSchema = z.object({
  name: z.string(),
  total: z.number(),
  visited: z.number(),
  percentage: z.number(),
});

const MonthBreakdownSchema = z.object({
  January: z.number().optional(),
  February: z.number().optional(),
  March: z.number().optional(),
  April: z.number().optional(),
  May: z.number().optional(),
  June: z.number().optional(),
  July: z.number().optional(),
  August: z.number().optional(),
  September: z.number().optional(),
  October: z.number().optional(),
  November: z.number().optional(),
  December: z.number().optional(),
});

const TopEntrySchema = z.object({
  name: z.string(),
  total: z.preprocess((val) => (typeof val === 'string' ? parseFloat(val) : val), z.number()),
});

const Top5Schema = z.object({
  longestInCountry: z.array(TopEntrySchema),
  longestInCities: z.array(TopEntrySchema),
  hitchhiked: z.array(TopEntrySchema),
  mostSpent: z.array(TopEntrySchema),
  mostExpensiveVisas: z.array(TopEntrySchema),
});

const WorldExplorationSchema = z.object({
  all: z.object({
    total: z.number(),
    visited: z.number(),
    percentage: z.number(),
  }),
  byContinent: z.array(CountryGroupSchema),
  byRegion: z.array(CountryGroupSchema),
});

export const TravelsSchema = z.object({
  perYear: z.record(z.string(), z.number()).optional(),
  perMonth: z.object({
    allTime: MonthBreakdownSchema,
    afterLongTrip: MonthBreakdownSchema.optional(),
  }),
});

export const TravelStatsSchema = z
  .object({
    metrics: z
      .object({
        days: z.number(),
        nights: z.number(),
        kilometersWalked: z.number(),
        expenses: z.string().transform((val) => parseFloat(val)),
        trips: z.number(),
        hitchhikes: z.number(),
      })
      .optional(),
    countries: WorldExplorationSchema.optional(),
    travels: TravelsSchema,
    top5: Top5Schema,
  })
  .nullable();

export type ContinentStats = z.infer<typeof CountryGroupSchema>;
export type Top5Stats = z.infer<typeof Top5Schema>;
export type RegionsExplored = z.infer<typeof WorldExplorationSchema>;
export type Travels = z.infer<typeof TravelsSchema>;

export type TravelStats = z.infer<typeof TravelStatsSchema>;
