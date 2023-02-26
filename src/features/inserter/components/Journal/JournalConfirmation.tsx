import React, { useContext } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import parse from 'html-react-parser';
import DatePicker from '../DatePicker/DatePicker';
import { InserterContext } from '../../context/InserterContext';

export default function JournalConfirmation() {
  const { title, date, setDate, parsedData: content } = useContext(InserterContext);

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
      <DatePicker date={date} setDate={setDate} />
    </>
  );
}
