import { useMutation } from '@tanstack/react-query';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import * as API from '@/api/api';
import { useInserterContext } from './useInserterContext';
import { ImportData } from '../types';

interface JournalBody {
  date: string;
  parsedData: ImportData;
  title: string;
}

interface CommonBody {
  optionId: number;
  parsedData: ImportData;
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
    ? {
        date: new Intl.DateTimeFormat('en-CA').format(date!),
        title,
        parsedData: draftToHtml(rawContentState),
      }
    : {
        parsedData,
        optionId,
      };

  return useMutation({
    mutationFn: () => API.saveNewData(dataKind!, body),
    onSuccess: () => {
      resetState();
    },
  });
}

export default useDataInsertion;
