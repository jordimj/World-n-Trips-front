import React, { useContext } from 'react';
import { Stack } from '@mui/material';
import { InserterContext } from '../../context/InserterContext';
import { TableKind } from '../../types';
import DataTable from '../DataTable/DataTable';
import JournalConfirmation from '../Journal/JournalConfirmation';
import Autocomplete from '../Autocomplete';
import { InserterDispatchContext } from '../../context/InserterDispatchContext';

function Step3() {
  const { dataKind, filename, optionId } = useContext(InserterContext);
  const dispatch = useContext(InserterDispatchContext);

  const onChangeOption = (optionId: number | null) =>
    dispatch({ type: 'SET_OPTION', payload: optionId });

  const isJournal = dataKind === 'journal';

  return (
    <Stack alignItems="center">
      <h2>Verify the data before importing it</h2>
      {isJournal ? (
        <JournalConfirmation />
      ) : (
        <>
          {filename && <h5>Data read from: {filename}</h5>}
          <DataTable />
          <Autocomplete
            dataKind={dataKind as TableKind}
            onChangeOption={onChangeOption}
          />
        </>
      )}
    </Stack>
  );
}

export default Step3;
