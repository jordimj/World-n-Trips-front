import React, { useContext } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import parse from 'html-react-parser';
import DatePicker from '../DatePicker/DatePicker';
import { InserterContext } from '../../context/InserterContext';
import { InserterDispatchContext } from '../../context/InserterDispatchContext';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

export default function JournalConfirmation() {
  const {
    journal: { title, date, editorState },
  } = useContext(InserterContext);

  const dispatch = useContext(InserterDispatchContext);

  const handleChange = (newDate: Date | null) =>
    dispatch({ type: 'SET_JOURNAL_DATE', payload: newDate });

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
      <DatePicker date={date} handleChange={handleChange} />
    </>
  );
}
