import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useInserterContext } from './useInserterContext';

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
    mutationFn: () => axios.post(`http://localhost:8000/${dataKind}s/create`, body),
    onSuccess: () => {
      resetState();
    },
  });
}

export default useDataInsertion;
