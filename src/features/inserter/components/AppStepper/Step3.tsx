import React, { useContext } from 'react';
import { Stack } from '@mui/material';
import { InserterContext } from '../../context/InserterContext';
import { TableKind } from '../../types';
import DataTable from '../DataTable/DataTable';
import JournalConfirmation from '../Journal/JournalConfirmation';
import Select from '../Select';
import { InserterDispatchContext } from '../../context/InserterDispatchContext';
import { SelectChangeEvent } from '@mui/material';

function Step3() {
  const { dataKind, parsedData, filename, optionId } = useContext(InserterContext);

  const dispatch = useContext(InserterDispatchContext);

  const onChangeOption = (e: SelectChangeEvent) =>
    dispatch({ type: 'SET_OPTION', payload: Number(e.target.value) });

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
          <Select
            dataKind={dataKind as TableKind}
            id={optionId}
            onChangeOption={onChangeOption}
          />
        </>
      )}
    </Stack>
  );
}

export default Step3;
