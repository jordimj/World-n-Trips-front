import React, { useContext } from 'react';
import { InserterContext } from '../../context/InserterContext';
import DataKindSelect from '../DataKindSelect';

function Step1() {
  const { dataKind, setDataKind } = useContext(InserterContext);

  return (
    <>
      <h2>Select the kind of data to be imported</h2>
      <DataKindSelect dataKind={dataKind} setDataKind={setDataKind} />
    </>
  );
}

export default Step1;
