import { z } from 'zod';

export const CountryGroupSchema = z.object({
  name: z.string(),
  total: z.number(),
  visited: z.number(),
  percentage: z.number(),
});

export const MonthBreakdownSchema = z.object({
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

export const TopEntryNumberSchema = z.object({
  name: z.string(),
  total: z.number(),
});

export const TopEntryStringSchema = z.object({
  name: z.string(),
  total: z.string(),
});

export const TravelStatsSchema = z
  .object({
    metrics: z
      .object({
        days: z.number(),
        nights: z.number(),
        kilometersWalked: z.number(),
        expenses: z.string(),
        trips: z.number(),
        hitchhikes: z.number(),
      })
      .optional(),
    countries: z
      .object({
        all: z.object({
          total: z.number(),
          visited: z.number(),
          percentage: z.number(),
        }),
        byContinent: z.array(CountryGroupSchema),
        byRegion: z.array(CountryGroupSchema),
      })
      .optional(),
    travels: z.object({
      perYear: z.record(z.string(), z.number()).optional(),
      perMonth: z.object({
        allTime: MonthBreakdownSchema,
        afterLongTrip: MonthBreakdownSchema.optional(),
      }),
    }),
    top5: z.object({
      longestInCountry: z.array(TopEntryNumberSchema),
      longestInCities: z.array(TopEntryNumberSchema),
      hitchhiked: z.array(TopEntryStringSchema),
      mostSpent: z.array(TopEntryStringSchema),
      mostExpensiveVisas: z.array(TopEntryStringSchema),
    }),
  })
  .nullable();

export type TravelStats = z.infer<typeof TravelStatsSchema>;
