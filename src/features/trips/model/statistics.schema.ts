import { z } from 'zod';
import {
  NightsSchema,
  ExpensesSchema,
  HitchhikesSchema,
} from '@/features/countries/model/country.schema';

export const RangeStatisticsSchema = z.object({
  hasDayData: z.boolean(),
  kilometersWalked: z.number(),
  nights: NightsSchema,
  hitchhikes: HitchhikesSchema.nullable(),
  expenses: ExpensesSchema.nullable(),
});
