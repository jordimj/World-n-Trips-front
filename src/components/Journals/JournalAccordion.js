import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import parse from 'html-react-parser';

export default function (props) {
  const { journal, day, keyword, isSearching } = props;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  useEffect(() => {
    if (isSearching && journal.text.search(keyword) !== -1) setExpanded(true);
    if (!isSearching) setExpanded(false);
  }, [isSearching]);

  return (
    <Accordion disableGutters expanded={expanded} onClick={toggleExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content" // check it
        id="panel1a-header"
        sx={{ position: 'sticky', top: 'var(--sticky-header-top)', borderRadius: '10px' }}
      >
        <Typography>#{day}</Typography>
        <Typography sx={{ ml: 3, mr: 'auto' }}>{journal.title}</Typography>
        <Typography>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
          }).format(new Date(journal.date))}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 20, py: 5 }}>
        <Typography variant={'journal'}>
          {isSearching
            ? parse(journal.text.replaceAll(keyword, `<mark>${keyword}</mark>`))
            : parse(journal.text)}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
