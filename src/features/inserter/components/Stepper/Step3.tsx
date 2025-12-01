import { Stack } from '@mui/material';
import TripConfirmation from '@/features/inserter/components/Trip/TripConfirmation';
import AutocompleteCountries from '@/template/components/Autocomplete/AutocompleteCountries';
import AutocompleteTrips from '@/template/components/Autocomplete/AutocompleteTrips';
import useInserterContext from '../../hooks/useInserterContext';
import DataTable from '../DataTable/DataTable';
import JournalConfirmation from '../Journal/JournalConfirmation';

function Step3() {
  const {
    state: { dataKind, filename },
    actions: { setOption },
  } = useInserterContext();

  const isJournal = dataKind === 'journal';
  const isTrip = dataKind === 'trip';

  return (
    <Stack alignItems="center">
      <h2>Verify the data before importing it</h2>
      {isJournal && <JournalConfirmation />}
      {isTrip && <TripConfirmation />}
      {!isTrip && !isJournal && (
        <Stack alignItems="center" sx={{ maxHeight: 'calc(100vh - 510px)' }}>
          {filename && <h5>Data read from: {filename}</h5>}
          <DataTable />
          {dataKind === 'day' ? (
            <AutocompleteTrips onChangeOption={setOption} sx={{ width: 'var(--spacing-12)' }} />
          ) : (
            <AutocompleteCountries onChangeOption={setOption} sx={{ width: 'var(--spacing-12)' }} />
          )}
        </Stack>
      )}
    </Stack>
  );
}

export default Step3;
