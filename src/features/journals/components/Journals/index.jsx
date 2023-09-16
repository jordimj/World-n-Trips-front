import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Spinner from '@/template/components/Spinner/Spinner';
import * as actions from '../../actions/actions';
import useJournalSearch from '../../hooks/useJournalSearch';
import JournalAccordion from '../JournalAccordion';
import Search from '../Search';
import Hero from '../Hero';

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
    <Fragment>
      <Hero trip={trip} />
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
    </Fragment>
  );
}

export default Journals;
