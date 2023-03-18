import { useMutation, useQuery } from '@tanstack/react-query';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useContext } from 'react';
import { InserterContext } from '../context/InserterContext';
import { InserterDispatchContext } from '../context/InserterDispatchContext';
import * as API from '../../../api/api';
import axios from 'axios';

function useDataInsertion() {
  const {
    dataKind,
    parsedData,
    optionId,
    journal: { date, title, editorState },
  } = useContext(InserterContext);

  const dispatch = useContext(InserterDispatchContext);

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
      dispatch({ type: 'RESET_STATE' });
    },
  });
}

export default useDataInsertion;
