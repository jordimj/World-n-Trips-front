import { Stack } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { ImportData, KindOfData, TableKind } from '../../types';
import DataTable from '../DataTable/DataTable';
import JournalConfirmation from '../Journal/JournalConfirmation';
import Select from '../Select';

interface Step3Props {
  dataKind: Required<KindOfData>;
  title: string;
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  filename: string;
  parsedData: ImportData;
  updateParsedData: (
    id: number,
    key: 'category' | 'subcategory' | 'extraInfo',
    value: any
  ) => void;
  optionId: number;
  setOptionId: Dispatch<SetStateAction<number>>;
}

function Step3(props: Step3Props) {
  const {
    dataKind,
    title,
    parsedData,
    date,
    setDate,
    filename,
    updateParsedData,
    optionId,
    setOptionId,
  } = props;

  const isJournal = dataKind === 'journal';

  return (
    <Stack alignItems="center">
      <h2>Verify the data before importing it</h2>
      {isJournal ? (
        <JournalConfirmation
          title={title}
          content={parsedData as string}
          date={date}
          setDate={setDate}
        />
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
