import { Stack } from '@mui/material';
import DataTable from '../DataTable/DataTable';
import JournalConfirmation from '../Journal/JournalConfirmation';
import { useInserterContext } from '../../hooks/useInserterContext';
import Autocomplete from '../../../../template/components/Autocomplete/Autocomplete';

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
          {dataKind === 'day' ? (
            <Autocomplete.Trips onChangeOption={setOption} />
          ) : (
            <Autocomplete.Countries onChangeOption={setOption} />
          )}
        </>
      )}
    </Stack>
  );
}

export default Step3;
