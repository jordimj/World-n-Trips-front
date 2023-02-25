import React, { Dispatch, SetStateAction, useState } from 'react';
import { parse } from 'papaparse';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Day, Expense, ImportData, Night, Spot, TableData } from '../../types';
import useSnackbar from '../../hooks/useSnackbar';

interface DataParserProps {
  setFilename: Dispatch<SetStateAction<string>>;
  setParsedData: Dispatch<SetStateAction<ImportData | undefined>>;
}

export default function DataParser(props: DataParserProps) {
  const { setFilename, setParsedData } = props;
  const [source, setSource] = useState<'string' | 'file' | undefined>(undefined);

  const { openSnackbar, snackbar } = useSnackbar();

  const parseCsvData = (data: string | File) => {
    parse(data, {
      header: true,
      // dynamicTyping: true,
      encoding: 'ISO-8859-1',
      complete: (result: any) => {
        if (result.errors.length > 0) {
          openSnackbar(
            result.errors.map((error: any) => ({
              label: error.message,
              severity: 'warning',
            }))
          );
          return;
        }

        const data = result.data as TableData;
        data.forEach(
          (item: Day | Night | Expense | Spot, i: number) => (item.id = i + 1)
        );

        setParsedData(data);
      },
    });

    setSource(data instanceof File ? 'file' : 'string');
  };

  const handleStringUpload = (e: React.ChangeEvent<HTMLInputElement>) =>
    parseCsvData(e.target.value);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) throw new Error('No file to be read');

    setFilename(e.target.files[0]?.name);
    parseCsvData(e.target.files[0]);
  };

  return (
    <>
      <h2>Insert the CSV data</h2>
      <Stack alignItems="center" sx={{ minWidth: '1200px' }}>
        <TextField
          id="outlined-multiline-static"
          label="Paste your CSV string in here"
          multiline
          rows={15}
          onChange={handleStringUpload}
          sx={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
          }}
          disabled={source === 'file'}
        />

        <h3>Or select a file that contains it</h3>
        <input
          id="contained-button-file"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          disabled={source === 'string'}
        />

        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span" disabled={source === 'string'}>
            Select file
          </Button>
        </label>
      </Stack>
      {snackbar}
    </>
  );
}
