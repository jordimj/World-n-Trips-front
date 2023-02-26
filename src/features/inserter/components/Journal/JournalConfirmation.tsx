import React, { useContext } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import parse from 'html-react-parser';
import DatePicker from '../DatePicker/DatePicker';
import { InserterContext } from '../../context/InserterContext';
import { InserterDispatchContext } from '../../context/InserterDispatchContext';

export default function JournalConfirmation() {
  const {
    parsedData: content,
    journal: { title, date },
  } = useContext(InserterContext);

  const dispatch = useContext(InserterDispatchContext);

  const handleChange = (newDate: Date | null) =>
    dispatch({ type: 'SET_JOURNAL_DATE', payload: newDate });

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Divider />
      <Box
        sx={{
          my: 2,
          maxWidth: '90%',
          maxHeight: '30vh',
          overflow: 'auto',
          '::-webkit-scrollbar-thumb': {
            background: 'white',
          },
        }}
      >
        {parse(content as string)}
      </Box>
      <DatePicker date={date} handleChange={handleChange} />
    </>
  );
}
