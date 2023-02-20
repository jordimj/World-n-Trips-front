import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useRequest from '../hooks/useRequest';
import { TableKind } from '../types';

interface SelectOption {
  id: number;
  name: string;
}

enum Urls {
  Day = '/trips',
  Night = '/countries',
}

export default function GeneralSelect({
  dataKind,
  id,
  setId,
}: {
  dataKind: TableKind;
  id: number;
  setId: Dispatch<SetStateAction<number>>;
}) {
  const [options, setOptions] = useState<SelectOption[]>([]);

  const { doRequest, loading, errorSnackbar } = useRequest();

  useEffect(() => {
    doRequest({
      url: dataKind === 'day' ? Urls.Day : Urls.Night,
      onSuccess: (response) => setOptions(response.data),
    });
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: SelectChangeEvent) => setId(parseInt(e.target.value));

  if (loading) return <CircularProgress />;

  return (
    <FormControl
      variant="outlined"
      sx={{
        margin: 'var(--spacing-1)',
        width: '200px',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <InputLabel id="data-kind-select-label">
        Select {dataKind === 'day' ? 'trip' : 'country'}
      </InputLabel>
      <Select
        labelId="data-kind-select-label"
        id="data-kind-select"
        value={id.toString()}
        onChange={handleChange}
        label="Data to be parsed"
      >
        {options.map((option: SelectOption) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {errorSnackbar}
    </FormControl>
  );
}
