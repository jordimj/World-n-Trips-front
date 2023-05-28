import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Spinner from '@/template/components/Spinner/Spinner';
import * as actions from '../../actions/actions';
import useJournalSearch from '../../hooks/useJournalSearch';
import JournalAccordion from '../JournalAccordion';
import Search from '../Search';

function Journals() {
  const { tripId } = useParams();
  const dispatch = useDispatch();

  const {
    journals,
    keywordRef,
    search,
    handleNextOccurrence,
    handleLastOccurrence,
    handleSearch,
    handleStopSearch,
  } = useJournalSearch();

  const trips = useSelector((state) => state.journals.trips);

  useEffect(() => {
    if (trips.length === 0) dispatch(actions.fetchTrips());

    dispatch(actions.fetchJournals(tripId));
  }, [tripId]);

  const trip = trips.find((trip) => trip.id === Number(tripId));

  if (!trip || journals.length === 0) return <Spinner />;

  return (
    <Box textAlign="center">
      <Typography variant="h1" sx={{ textTransform: 'capitalize' }}>
        {trip.name.toLowerCase()}
      </Typography>
      <Search
        search={search}
        keywordRef={keywordRef}
        handleSearch={handleSearch}
        handleStopSearch={handleStopSearch}
        handleNextOccurrence={handleNextOccurrence}
        handleLastOccurrence={handleLastOccurrence}
      />
      {journals && (
        <Stack
          direction="row"
          gap={3}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ pt: 3 }}
        >
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
      )}
    </Box>
  );
}

export default Journals;
