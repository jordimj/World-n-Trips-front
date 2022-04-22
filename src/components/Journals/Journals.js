import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import parse from 'html-react-parser';
import * as actions from '../../actions/actions';

export default function () {
  const journals = useSelector((state) => state.journals);

  const { tripId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (journals !== []) dispatch(actions.fetchJournals(tripId));
  }, [tripId]);

  return (
    <Box textAlign="center">
      <Typography variant="h1">Journals</Typography>
      {journals && (
        <Stack
          direction="row"
          gap={3}
          justifyContent="center"
          flexWrap={'wrap'}
          sx={{ pt: 3 }}
        >
          {journals.map((journal, idx) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  #{idx + 1} - {journal.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 20, py: 5 }}>
                {parse(journal.text)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
    </Box>
  );
}
