import { Stack } from '@mui/material';
import { TableKind } from '../../types';
import DataTable from '../DataTable/DataTable';
import JournalConfirmation from '../Journal/JournalConfirmation';
import Autocomplete from '../Autocomplete';
import { useInserterContext } from '../../hooks/useInserterContext';

function Step3() {
  const {
    state: { dataKind, filename },
    actions: { setOption },
  } = useInserterContext();

  const isJournal = dataKind === 'journal';

  return (
    <Stack alignItems="center">
      <h2>Verify the data before importing it</h2>
      {isJournal ? (
        <JournalConfirmation />
      ) : (
        <>
          {filename && <h5>Data read from: {filename}</h5>}
          <DataTable />
          <Autocomplete dataKind={dataKind as TableKind} onChangeOption={setOption} />
        </>
      )}
    </Stack>
  );
}

export default Step3;
