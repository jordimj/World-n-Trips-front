import React, { useContext } from 'react';
import { capitalize, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import Select from '../../../../template/components/Select/Select';
import { InserterContext } from '../../context/InserterContext';
import { useInserterDispatch, useInserterState } from '../../context/InserterProvider';
import { KindOfData } from '../../types';

const DATA_KINDS = ['day', 'night', 'spot', 'expense', 'journal'];

function Step1() {
  const { dataKind } = useInserterState();
  const dispatch = useInserterDispatch();

  const onDataKindClick = (event: SelectChangeEvent) => {
    dispatch({ type: 'SET_DATA_KIND', payload: event.target.value as KindOfData });
  };

  return (
    <Stack alignItems="center" gap={2}>
      <Typography variant="h2">Select the kind of data to be imported</Typography>
      <Select
        label="Data to be parsed"
        value={dataKind}
        onChange={onDataKindClick}
        maxWidth={300}
      >
        {DATA_KINDS.map((kind) => (
          <MenuItem value={kind}>{capitalize(kind)}</MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

export default Step1;
