import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Spinner from '@/template/components/Spinner/Spinner';
import * as actions from '../../actions/actions';
import useJournalSearch from '../../hooks/useJournalSearch';
import JournalAccordion from './JournalAccordion';

export default function () {
  const { tripId } = useParams();
  const dispatch = useDispatch();

  const {
    journals,
    isSearching,
    keywordRef,
    totalMatches,
    currentOccurrence,
    setCurrentOccurrence,
    handleSearch,
    handleStopSearch,
    handleKeyDown,
    matchRefs,
  } = useJournalSearch();

  const handleOccurrenceClick = () => {
    matchRefs.current[currentOccurrence].current.scrollIntoView();
    setCurrentOccurrence((currentOccurrence) => currentOccurrence + 1);
  };

  const trips = useSelector((state) => state.journals.trips);

  useEffect(() => {
    if (trips.length === 0) dispatch(actions.fetchTrips());

    dispatch(actions.fetchJournals(tripId));
  }, [tripId]);

  const trip = trips.find((trip) => trip.id === Number(tripId));

  if (!trip || journals.length === 0) return <Spinner />;

  return (
    <Box textAlign="center">
      <Typography
        variant="h1"
        sx={{
          letterSpacing: 'var(--uppercase-letter-spacing)',
          textTransform: 'capitalize',
        }}
      >
        {trip.name}
      </Typography>
      <Typography variant="h2">Journal entries</Typography>
      <Stack
        sx={{
          position: 'sticky',
          top: '120px',
          zIndex: 2,
          width: '350px',
          backgroundColor: 'white',
          border: '1px solid grey',
          borderRadius: '10px',
          ml: 'auto',
        }}
      >
        <Stack direction="row">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by keyword"
            inputProps={{ 'aria-label': 'search by keyword' }}
            inputRef={keywordRef}
            onKeyDown={handleKeyDown}
          />
          <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton
            onClick={handleStopSearch}
            sx={{ p: '10px' }}
            aria-label="close search"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        {isSearching &&
          (totalMatches > 0 ? (
            <Fragment>
              <Typography>{totalMatches} occurrences found!</Typography>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Typography>
                  {currentOccurrence} / {totalMatches}
                </Typography>
                <IconButton
                  onClick={handleOccurrenceClick}
                  sx={{ p: '10px' }}
                  aria-label="search"
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </Stack>
            </Fragment>
          ) : (
            <Typography>No occurrences found.</Typography>
          ))}
      </Stack>
      {journals && (
        <Stack
          direction="row"
          gap={3}
          justifyContent="center"
          flexWrap={'wrap'}
          sx={{ pt: 3 }}
        >
          {journals.map((journal, idx) => (
            <JournalAccordion
              key={idx}
              day={idx + 1}
              journal={journal}
              isSearching={isSearching}
              keyword={keywordRef.current?.value ?? ''}
              matchRefs={matchRefs}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
