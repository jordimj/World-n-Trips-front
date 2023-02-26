import React, { Dispatch, SetStateAction } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { KindOfData } from '../types';

export default function DataKindSelect({
  dataKind,
  onChange,
}: {
  dataKind: KindOfData | undefined;
  onChange: (e: SelectChangeEvent) => void;
}) {
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
      <InputLabel id="data-kind-select-label">Data to be parsed</InputLabel>
      <Select
        labelId="data-kind-select-label"
        id="data-kind-select"
        value={dataKind ?? ''}
        onChange={onChange}
        label="Data to be parsed"
      >
        <MenuItem value="day">Day</MenuItem>
        <MenuItem value="night">Night</MenuItem>
        <MenuItem value="spot">Spot</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
        <MenuItem value="journal">Journal</MenuItem>
      </Select>
    </FormControl>
  );
}
