import React, { useContext } from 'react';
import { Stack } from '@mui/material';
import { InserterContext } from '../../context/InserterContext';
import { TableKind } from '../../types';
import DataTable from '../DataTable/DataTable';
import JournalConfirmation from '../Journal/JournalConfirmation';
import Select from '../Select';

function Step3() {
  const { dataKind, parsedData, filename, updateParsedData, optionId, setOptionId } =
    useContext(InserterContext);

  const isJournal = dataKind === 'journal';

  return (
    <Stack alignItems="center">
      <h2>Verify the data before importing it</h2>
      {isJournal ? (
        <JournalConfirmation />
      ) : (
        <>
          {filename && <h5>Data read from: {filename}</h5>}
          <DataTable
            dataKind={dataKind as TableKind}
            rows={parsedData!}
            updateParsedData={updateParsedData}
          />
          <Select dataKind={dataKind as TableKind} id={optionId} setId={setOptionId} />
        </>
      )}
    </Stack>
  );
}

export default Step3;
