import { useMutation, useQueryClient } from '@tanstack/react-query';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { saveNewData } from '@/api';
import useVisitedCountries from '@/features/countries/hooks/useVisitedCountries';
import { formatDatabaseDate } from '@/utils/date';
import { ImportData } from '../types';
import useInserterContext from './useInserterContext';

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

  return useMutation({
    mutationFn: () => saveNewData(dataKind!, body),
    onSuccess: () => {
      if (isTrip) queryClient.invalidateQueries({ queryKey: ['trips'] });
      if (isCountryRelated) {
        const countryCode = countries?.find((country) => country.id === optionId)?.alpha3code;
        queryClient.invalidateQueries({ queryKey: ['country', countryCode] });
      }

      resetState();
    },
  });
}

export default useDataInsertion;
