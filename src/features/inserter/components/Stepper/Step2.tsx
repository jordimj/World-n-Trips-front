import useInserterContext from '../../hooks/useInserterContext';
import DataParser from '../DataParser/DataParser';
import Journal from '../Journal/Journal';

function Step2() {
  const {
    state: { dataKind },
  } = useInserterContext();

  const isJournal = dataKind === 'journal';

  return isJournal ? <Journal /> : <DataParser />;
}

export default Step2;
