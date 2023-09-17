import useInserterContext from '../../hooks/useInserterContext';
import DataParser from '../DataParser/DataParser';
import Journal from '../Journal/Journal';
import Trip from '../Trip';

function Step2() {
  const {
    state: { dataKind },
  } = useInserterContext();

  if (dataKind === 'journal') return <Journal />;
  if (dataKind === 'trip') return <Trip />;

  return <DataParser />;
}

export default Step2;
