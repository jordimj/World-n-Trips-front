import React, { Dispatch, SetStateAction } from 'react';
import { KindOfData } from '../../types';
import DataKindSelect from '../DataKindSelect';

interface Step1Props {
  dataKind: KindOfData | undefined;
  setDataKind: Dispatch<SetStateAction<KindOfData | undefined>>;
}

function Step1(props: Step1Props) {
  const { dataKind, setDataKind } = props;
  return (
    <>
      <h2>Select the kind of data to be imported</h2>
      <DataKindSelect dataKind={dataKind} setDataKind={setDataKind} />
    </>
  );
}

export default Step1;
