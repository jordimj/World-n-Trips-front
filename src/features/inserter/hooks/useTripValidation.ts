import { z, ZodIssue } from 'zod';
import { Trip } from '../../inserter/types';
import { groupBy } from './useDataValidation';

const TripSchema = z.object({
  name: z.string().min(5).max(50),
  summary: z.string().min(10).max(255),
  coverImage: z.string().url(),
});

interface Props {
  trip?: Trip;
}

function useTripValidation(props: Props) {
  const { trip } = props;

  const validation = TripSchema.safeParse(trip);
  const validationErrors = validation.success
    ? []
    : groupBy<ZodIssue>(validation.error.issues, 'path');

  return {
    isValid: validation.success,
    validationErrors,
  };
}

export default useTripValidation;
