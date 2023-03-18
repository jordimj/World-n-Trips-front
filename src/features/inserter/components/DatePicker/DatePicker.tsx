import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import useJournalAvailableDates from '../../hooks/useJournalAvailableDates';

interface DatePickerProps {
  date: Date | null;
  handleChange: (date: Date | null) => void;
}

export default function DatePicker(props: DatePickerProps) {
  const { date, handleChange } = props;

  const { data: availableDates, isFetching } = useJournalAvailableDates();

  const handleDisableDate = (date: Date) =>
    !availableDates.includes(new Date(date).toLocaleDateString('en-CA'));

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 'var(--border-radius)' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          inputFormat="dd/MM/yyyy"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          shouldDisableDate={handleDisableDate}
          loading={isFetching}
        />
      </LocalizationProvider>
    </Box>
  );
}
