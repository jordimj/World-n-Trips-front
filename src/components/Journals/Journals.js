import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, IconButton, InputBase, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import * as actions from '../../actions/actions';
import JournalAccordion from './JournalAccordion';
import useJournalSearch from '../../hooks/useJournalSearch';

export default function () {
  const { tripId } = useParams();
  const dispatch = useDispatch();

  const {
    journals,
    isSearching,
    keyword,
    setKeyword,
    totalMatches,
    handleSearch,
    handleStopSearch,
    handleKeyDown,
  } = useJournalSearch();

  const trip = useSelector((state) => state.trips).find((trip) => trip.id == tripId);

  useEffect(() => {
    if (journals !== []) dispatch(actions.fetchJournals(tripId));
  }, [tripId]);

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
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
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
          {journals.map((journal, idx) => (
            <JournalAccordion
              day={idx + 1}
              journal={journal}
              isSearching={isSearching}
              keyword={keyword}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
