import { useMutation, useQueryClient } from '@tanstack/react-query';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { saveNewData } from '@/api';
import { formatDatabaseDate } from '@/utils/date';
import useInserterContext from './useInserterContext';
import { ImportData } from '../types';

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
  title: string;
  // summary: string;
  coverImage: string;
  arrivalDate: string;
  departureDate: string;
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

  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const body = isJournal
    ? ({
        date: formatDatabaseDate(date!),
        title,
        parsedData: draftToHtml(rawContentState),
      } as JournalBody)
    : isTrip
    ? ({
        ...trip,
        arrivalDate: formatDatabaseDate(trip?.arrivalDate!),
        departureDate: formatDatabaseDate(trip?.departureDate!),
      } as TripBody)
    : ({
        parsedData,
        optionId,
      } as CommonBody);

  return useMutation({
    mutationFn: () => saveNewData(dataKind!, body),
    onSuccess: () => {
      if (isTrip) {
        queryClient.invalidateQueries({ queryKey: ['trips'] });
      }
      resetState();
    },
  });
}

export default useDataInsertion;
