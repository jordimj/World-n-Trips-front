import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import parse from 'html-react-parser';
import * as actions from '../../actions/actions';

export default function () {
  const { tripId } = useParams();
  const dispatch = useDispatch();

  const journals = useSelector((state) => state.journals);
  const trip = useSelector((state) => state.trips).find((trip) => trip.id == tripId);

  useEffect(() => {
    if (journals !== []) dispatch(actions.fetchJournals(tripId));
  }, [tripId]);

  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    if (query === '') return;
    setSearching(true);
  };

  const handleStopSearch = () => {
    setSearching(false);
    setQuery('');
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
      <Stack direction="row" sx={{ width: '350px', ml: 'auto' }}>
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
      {journals && (
        <Stack
          direction="row"
          gap={3}
          justifyContent="center"
          flexWrap={'wrap'}
          sx={{ pt: 3 }}
        >
          {journals.map((journal, idx) => {
            const shouldExpand = searching && journal.text.search(query) !== -1;

            return (
              <Accordion disableGutters defaultExpanded={shouldExpand}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>#{idx + 1}</Typography>
                  <Typography sx={{ ml: 3, mr: 'auto' }}>{journal.title}</Typography>
                  <Typography>
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'full',
                    }).format(new Date(journal.date))}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 20, py: 5 }}>
                  <Typography variant={'journal'}>
                    {searching
                      ? parse(journal.text.replaceAll(query, `<mark>${query}</mark>`))
                      : parse(journal.text)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
