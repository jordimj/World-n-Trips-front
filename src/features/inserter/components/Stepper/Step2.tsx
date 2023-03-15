import React, { useContext } from 'react';
import { InserterContext } from '../../context/InserterContext';
import DataParser from '../DataParser/DataParser';
import Journal from '../Journal/Journal';

function Step2() {
  const { dataKind } = useContext(InserterContext);
  const isJournal = dataKind === 'journal';

  return isJournal ? <Journal /> : <DataParser />;
}

export default Step2;
