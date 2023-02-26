import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import useRequest from '../../hooks/useRequest';

interface DatePickerProps {
  date: Date | null;
  handleChange: (date: Date | null) => void;
}

export default function DatePicker(props: DatePickerProps) {
  const { date, handleChange } = props;

  const { doRequest } = useRequest();
  const [availableDates, setAvailableDates] = useState<Array<string>>([]);

  useEffect(() => {
    doRequest({
      url: '/journals/dates',
      onSuccess: (response) => setAvailableDates(response.data),
    });
    // // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisableDate = (date: Date) =>
    !availableDates.includes(new Date(date).toLocaleDateString('en-CA'));

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: '5px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          inputFormat="dd/MM/yyyy"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          shouldDisableDate={handleDisableDate}
        />
      </LocalizationProvider>
    </Box>
  );
}
