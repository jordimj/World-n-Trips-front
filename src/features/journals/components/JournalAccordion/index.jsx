import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatFullDate } from '@/utils/date';

function JournalAccordion(props) {
  const { journal, day, keyword, isSearching } = props;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);
  const regex = new RegExp(`(${keyword})`, 'gi');

  useEffect(() => {
    if (isSearching && journal.text.match(regex)) setExpanded(true);
    if (!isSearching) setExpanded(false);
  }, [isSearching]);

  const parsed = isSearching
    ? parse(journal.text.replaceAll(regex, '<mark class="occurrence">$1</mark>'))
    : parse(journal.text);

  return (
    <Accordion disableGutters expanded={expanded} onClick={toggleExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${day}-content`}
        id={`panel-${day}-header`}
        sx={{
          position: 'sticky',
          top: 'var(--sticky-header-top)',
          borderRadius: 'var(--border-radius)',
        }}
      >
        <Typography>#{day}</Typography>
        <Typography sx={{ ml: 3, mr: 'auto' }}>{journal.title}</Typography>
        <Typography>{formatFullDate(journal.date)}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 20 }}>
        <Typography variant="journal">{parsed}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default JournalAccordion;
