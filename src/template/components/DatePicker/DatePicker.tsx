import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import useJournalAvailableDates from '../../../features/inserter/hooks/useJournalAvailableDates';

interface DatePickerProps {
  date: Date | null;
  label?: string;
  handleChange: (date: Date | null) => void;
  loading?: boolean;
  shouldDisableDate?: (day: Date) => boolean;
}

function DatePicker(props: DatePickerProps) {
  const {
    date,
    handleChange,
    label,
    loading = false,
    shouldDisableDate = () => false,
  } = props;

  return (
    <Box sx={{ backgroundColor: 'white', borderRadius: 'var(--border-radius)' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          format="DD/MM/YYYY"
          value={date}
          onChange={handleChange}
          shouldDisableDate={shouldDisableDate}
          loading={loading}
          {...(label && { label })}
        />
      </LocalizationProvider>
    </Box>
  );
}

function DatePickerJournal(props: DatePickerProps) {
  const { date, handleChange } = props;

  const { data: availableDates, isFetching } = useJournalAvailableDates();

  const handleDisableDate = (date: Date) =>
    !availableDates.includes(new Date(date).toLocaleDateString('en-CA'));

  return (
    <DatePicker
      date={date}
      handleChange={handleChange}
      shouldDisableDate={handleDisableDate}
      loading={isFetching}
    />
  );
}

DatePicker.Journal = DatePickerJournal;
export default DatePicker;
