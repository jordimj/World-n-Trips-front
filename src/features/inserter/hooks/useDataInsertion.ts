import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { saveNewData } from '@/api';
import useVisitedCountries from '@/features/countries/hooks/useVisitedCountries';
import { formatDatabaseDate } from '@/utils/date';
import { ImportData } from '../types';
import useInserterContext from './useInserterContext';
import useSnackbar from './useSnackbar';

interface CommonBody {
  optionId: number;
  parsedData: ImportData;
}

interface JournalBody {
  date: string;
  parsedData: string;
  title: string;
}

interface TripBody {
  name: string;
  summary: string;
  coverImage: string;
  worktrip: boolean;
  telework: boolean;
}

export type InserterBody = CommonBody | JournalBody | TripBody;

function useDataInsertion() {
  const {
    state: {
      dataKind,
      parsedData,
      optionId,
      journal: { date, title, editorState },
      trip,
    },
    actions: { resetState },
  } = useInserterContext();

  const queryClient = useQueryClient();
  const { openSnackbar, snackbar } = useSnackbar();

  const isJournal = dataKind === 'journal';
  const isTrip = dataKind === 'trip';
  const isCountryRelated = dataKind && ['night', 'expense', 'spot'].includes(dataKind);

  const { data: countries } = useVisitedCountries();

  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const body = isJournal
    ? ({
        date: formatDatabaseDate(date!),
        title,
        parsedData: draftToHtml(rawContentState),
      } as JournalBody)
    : isTrip
      ? ({
          name: trip?.name,
          summary: trip?.summary,
          coverImage: trip?.coverImage,
          worktrip: trip?.work === 'worktrip',
          telework: trip?.work === 'telework',
        } as TripBody)
      : ({
          parsedData,
          optionId,
        } as CommonBody);

  const mutation = useMutation({
    mutationFn: () => saveNewData(dataKind!, body),
    onSuccess: () => {
      if (dataKind && ['day', 'night', 'expense'].includes(dataKind)) {
        queryClient.invalidateQueries({ queryKey: ['range-statistics'] });
        queryClient.invalidateQueries({ queryKey: ['trips'] });
      }
      if (isJournal) queryClient.invalidateQueries({ queryKey: ['journals'] });
      if (isTrip) queryClient.invalidateQueries({ queryKey: ['trips'] });
      if (isCountryRelated) {
        const countryCode = countries?.find((country) => country.id === optionId)?.alpha3code;
        queryClient.invalidateQueries({ queryKey: ['country', countryCode] });
        queryClient.invalidateQueries({ queryKey: ['statistics'] });
      }

      openSnackbar([{ label: 'Database insertion done!' }]);
      resetState();
    },
    onError: (error) => {
      const errors: any = (error as AxiosError).response?.data;
      openSnackbar([{ label: errors.message, severity: 'error' }]);
    },
  });

  return { ...mutation, snackbar };
}

export default useDataInsertion;
