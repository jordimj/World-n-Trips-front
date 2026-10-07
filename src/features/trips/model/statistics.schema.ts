import { z } from 'zod';
import { NightsSchema, ExpensesSchema } from '@/features/countries/model/country.schema';

export const RangeStatisticsSchema = z.object({
  hasDayData: z.boolean(),
  kilometersWalked: z.number(),
  nights: NightsSchema,
  expenses: ExpensesSchema.nullable(),
});
