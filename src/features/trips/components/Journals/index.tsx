import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@/template/components/Divider';
import Spinner from '@/template/components/Spinner/Spinner';
import useJournalSearch from '../../hooks/useJournalSearch';
import useJournals from '../../hooks/useJournals';
import JournalAccordion from '../JournalAccordion';
import Search from '../Search';

function Journals({ query }: { query: ReturnType<typeof useJournals> }) {
  const [, setSearchParams] = useSearchParams();

  const {
    keywordRef,
    search,
    handleNextOccurrence,
    handleLastOccurrence,
    handleSearch,
    handleStopSearch,
  } = useJournalSearch();

  const { data: journals = [], isLoading: isLoadingJournals, isError, refetch } = query;
  const hasJournals = journals.length > 0;

  return (
    <Fragment>
      <Stack alignItems="center" sx={{ mt: 6, mb: 3 }}>
        <Divider>Journals</Divider>
      </Stack>
      {isError ? (
        <Stack alignItems="center" gap={2}>
          <Typography>Unable to load journals.</Typography>
          <Button onClick={() => refetch()}>Retry</Button>
        </Stack>
      ) : isLoadingJournals ? (
        <Spinner />
      ) : hasJournals ? (
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
