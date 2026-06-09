import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Spinner from '@/template/components/Spinner/Spinner';
import useJournalSearch from '../../hooks/useJournalSearch';
import useJournals from '../../hooks/useJournals';
import useTrips from '../../hooks/useTrips';
import Hero from '../Hero';
import JournalAccordion from '../JournalAccordion';
import Search from '../Search';

function Journals() {
  const { tripId } = useParams<{ tripId: string }>();
  const [, setSearchParams] = useSearchParams();

  const {
    keywordRef,
    search,
    handleNextOccurrence,
    handleLastOccurrence,
    handleSearch,
    handleStopSearch,
  } = useJournalSearch();

  const { data: trips = [], isLoading: isLoadingTrips } = useTrips();
  const { data: journals = [], isLoading: isLoadingJournals } = useJournals(tripId);
  const hasJournals = journals.length > 0;

  const trip = trips.find((trip) => trip.id === Number(tripId));
  const isLoading = isLoadingTrips || isLoadingJournals;

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <Hero trip={trip!} />
      {hasJournals ? (
        <Fragment>
          <Search
            search={search}
            keywordRef={keywordRef}
            handleSearch={handleSearch}
            handleStopSearch={handleStopSearch}
            handleNextOccurrence={handleNextOccurrence}
            handleLastOccurrence={handleLastOccurrence}
          />
          <Stack direction="row" gap={3} justifyContent="center" flexWrap="wrap" sx={{ pt: 3 }}>
            {journals.map((journal, idx) => (
              <JournalAccordion
                key={idx}
                day={idx + 1}
                journal={journal}
                isSearching={search.isSearching}
                keyword={keywordRef.current?.value ?? ''}
              />
            ))}
          </Stack>
        </Fragment>
      ) : (
        <Stack gap={3} sx={{ alignItems: 'center', mt: 10 }}>
          <Typography sx={{ fontSize: 'var(--spacing-5)' }}>
            You have not added journal entries for this trip yet.
          </Typography>
          <Button
            variant="contained"
            startIcon={<FileUploadIcon />}
            sx={{ fontWeight: 400, textTransform: 'none' }}
            onClick={() => setSearchParams({ dialog: 'inserter' })}
          >
            Add journal entries
          </Button>
        </Stack>
      )}
    </Fragment>
  );
}

export default Journals;
