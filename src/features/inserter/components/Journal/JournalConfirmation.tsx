import React, { Dispatch, SetStateAction } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import parse from 'html-react-parser';
import DatePicker from '../DatePicker/DatePicker';

interface JournalConfirmationProps {
  title: string;
  content: string;
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
}

export default function JournalConfirmation(props: JournalConfirmationProps) {
  const { title, date, setDate, content } = props;

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
