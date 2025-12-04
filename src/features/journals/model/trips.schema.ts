import { z } from 'zod';

const TripSchema = z.object({
  id: z.number(),
  name: z.string(),
  summary: z.string().nullable(),
  worktrip: z.boolean(),
  telework: z.boolean(),
  picture: z.url(),
  arrivalDate: z
    .preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date())
    .nullable(),
  departureDate: z
    .preprocess((val) => (typeof val === 'string' ? new Date(val) : val), z.date())
    .nullable(),
  hasJournals: z.boolean(),
});

export const TripsSchema = z.array(TripSchema);

export type Trip = z.infer<typeof TripSchema>;
export type Trips = z.infer<typeof TripsSchema>;
