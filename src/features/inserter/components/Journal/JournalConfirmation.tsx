import { Box, Typography } from '@mui/material';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser';
import DatePicker from '@/template/components/DatePicker/DatePicker';
import useInserterContext from '../../hooks/useInserterContext';

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
          width: '90%',
          maxWidth: '1200px',
          backgroundColor: 'var(--color-white)',
          border: 'var(--border)',
          borderRadius: 'var(--border-radius)',
          py: 2,
          px: 4,
          mb: 3,
          maxHeight: 'calc(100vh - 700px)',
          overflow: 'auto',
          '::-webkit-scrollbar': {
            width: 'var(--spacing-2)',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--navbar-color)',
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
