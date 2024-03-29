import { useState } from 'react';
import { parse } from 'papaparse';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Day, Expense, Night, Spot, TableData } from '../../types';
import useInserterContext from '../../hooks/useInserterContext';
import useSnackbar from '../../hooks/useSnackbar';

export default function DataParser() {
  const {
    state: { filename },
    actions: { setParsedData, setFilename },
  } = useInserterContext();

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
      <Typography variant="h2">Insert the CSV data</Typography>
      <Stack
        alignItems="center"
        sx={{
          minWidth: '1200px',
          height: '100%',
        }}
      >
        <TextField
          id="csv-parser"
          label="Paste your CSV here"
          multiline
          minRows={15}
          onChange={handleStringUpload}
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
            '& .MuiInputBase-root': {
              height: '100%!important',
            },
            '& .MuiInputBase-input': {
              height: '100%!important',
              overflow: 'auto',
            },
          }}
          disabled={source === 'file'}
        />

        <Typography variant="h3">Or select a file that contains it</Typography>
        <input
          id="file-uploader"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          disabled={source === 'string'}
        />

        <label htmlFor="file-uploader">
          <Button variant="contained" component="span" disabled={source === 'string'}>
            Select file
          </Button>
        </label>
      </Stack>
      {filename && <Typography variant="h5">Selected file: {filename}</Typography>}
      {snackbar}
    </>
  );
}
