import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { formatFullDate } from '@/utils/date';
import type { Journal } from '../../model/journals.schema';
import styles from './JournalAccordion.module.css';

interface JournalAccordionProps {
  journal: Journal;
  day: number;
  keyword: string;
  isSearching: boolean;
}

function JournalAccordion({ journal, day, keyword, isSearching }: JournalAccordionProps) {
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
        id={`panel-${day}-header`}
        aria-controls={`panel-${day}-content`}
        className={styles.summary}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>#{day}</Typography>
        <Typography className={styles.title}>{journal.title}</Typography>
        <Typography>{formatFullDate(journal.date)}</Typography>
      </AccordionSummary>
      <AccordionDetails className={styles.details}>
        <Typography className={styles.journal}>{parsed}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default JournalAccordion;
