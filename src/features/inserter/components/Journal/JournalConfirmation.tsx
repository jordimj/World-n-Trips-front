import { Box, Typography } from '@mui/material';
import parse from 'html-react-parser';
import DatePicker from '../../../../template/components/DatePicker/DatePicker';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { useInserterContext } from '../../hooks/useInserterContext';

export default function JournalConfirmation() {
  const {
    state: {
      journal: { title, date, editorState },
    },
    actions: { setDate },
  } = useInserterContext();

  const rawContentState = convertToRaw(editorState.getCurrentContent());

  return (
    <>
      <Typography variant="h3">{title}</Typography>
      <Box
        sx={{
          marginY: 2,
          paddingY: 'var(--spacing-2)',
          paddingX: 'var(--spacing-4)',
          width: '100%',
          backgroundColor: 'var(--color-white)',
          border: 'var(--color-border)',
          borderRadius: 'var(--border-radius)',
          maxHeight: '30vh',
          overflow: 'auto',
          '::-webkit-scrollbar': {
            width: 'var(--spacing-2)',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#024385',
            borderRadius: '20px',
          },
        }}
      >
        {parse(draftToHtml(rawContentState))}
      </Box>
      <DatePicker.Journal date={date} handleChange={setDate} />
    </>
  );
}
