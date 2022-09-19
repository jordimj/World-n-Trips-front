import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, IconButton, InputBase, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import * as actions from '../../actions/actions';
import JournalAccordion from './JournalAccordion';

export default function () {
  const { tripId } = useParams();
  const dispatch = useDispatch();

  const journals = useSelector((state) => state.journals);
  const trip = useSelector((state) => state.trips).find((trip) => trip.id == tripId);

  useEffect(() => {
    if (journals !== []) dispatch(actions.fetchJournals(tripId));
  }, [tripId]);

  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [totalMatches, setTotalMatches] = useState(0);

  const handleSearch = () => {
    if (query === '') return;
    setIsSearching(true);
    setTotalMatches(
      journals.reduce(
        (acc, curr) => acc + (curr.text.match(new RegExp(query, 'gi')) ?? []).length,
        0
      )
    );
  };

  const handleStopSearch = () => {
    setIsSearching(false);
    setQuery('');
    setTotalMatches(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="h1">{trip.name} TRIP</Typography>
      <Typography variant="h2">Journal entries</Typography>
      <Stack sx={{ width: '350px', ml: 'auto' }}>
        <Stack direction="row">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by keyword"
            inputProps={{ 'aria-label': 'search by keyword' }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
            <Typography>{totalMatches} occurrences found!</Typography>
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
          {journals.map((journal, idx) => {
            return (
              <JournalAccordion
                day={idx + 1}
                journal={journal}
                isSearching={isSearching}
                query={query}
              />
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
