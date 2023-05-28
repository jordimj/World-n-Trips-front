import { useMutation } from '@tanstack/react-query';
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

export type InserterBody = CommonBody | JournalBody;

function useDataInsertion() {
  const {
    state: {
      dataKind,
      parsedData,
      optionId,
      journal: { date, title, editorState },
    },
    actions: { resetState },
  } = useInserterContext();

  const isJournal = dataKind === 'journal';

  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const body = isJournal
    ? ({
        date: formatDatabaseDate(date!),
        title,
        parsedData: draftToHtml(rawContentState),
      } as JournalBody)
    : ({
        parsedData,
        optionId,
      } as CommonBody);

  return useMutation({
    mutationFn: () => saveNewData(dataKind!, body),
    onSuccess: () => {
      resetState();
    },
  });
}

export default useDataInsertion;
