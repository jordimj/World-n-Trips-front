import { Stack } from '@mui/material';
import AutocompleteTrips from '@/template/components/Autocomplete/AutocompleteTrips';
import AutocompleteCountries from '@/template/components/Autocomplete/AutocompleteCountries';
import { useInserterContext } from '../../hooks/useInserterContext';
import DataTable from '../DataTable/DataTable';
import JournalConfirmation from '../Journal/JournalConfirmation';

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
            <AutocompleteTrips onChangeOption={setOption} />
          ) : (
            <AutocompleteCountries onChangeOption={setOption} />
          )}
        </>
      )}
    </Stack>
  );
}

export default Step3;
