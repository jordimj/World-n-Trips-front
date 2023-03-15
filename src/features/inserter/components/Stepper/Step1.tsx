import { SelectChangeEvent } from '@mui/material';
import React, { useContext } from 'react';
import { InserterContext } from '../../context/InserterContext';
import { useInserterDispatch, useInserterState } from '../../context/InserterProvider';
import { KindOfData } from '../../types';
import DataKindSelect from '../DataKindSelect';

function Step1() {
  const { dataKind } = useInserterState();
  const dispatch = useInserterDispatch();

  const onDataKindClick = (event: SelectChangeEvent) => {
    dispatch({ type: 'SET_DATA_KIND', payload: event.target.value as KindOfData });
  };

  return (
    <>
      <h2>Select the kind of data to be imported</h2>
      <DataKindSelect dataKind={dataKind} onChange={onDataKindClick} />
    </>
  );
}

export default Step1;
