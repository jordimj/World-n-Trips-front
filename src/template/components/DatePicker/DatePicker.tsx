import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import useJournalAvailableDates from '@/features/inserter/hooks/useJournalAvailableDates';

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        format="DD/MM/YYYY"
        value={date}
        onChange={handleChange}
        shouldDisableDate={shouldDisableDate}
        loading={loading}
        {...(label && { label })}
        sx={{
          color: 'var(--text-color)',
          width: '100%',
          backgroundColor: 'var(--background-color-dark)!important',
          borderRadius: 'var(--border-radius)',
          '& .MuiInputBase-root': {
            color: 'var(--text-color)',
          },
          '& svg': { fill: 'var(--text-color)' },
          '& label': { color: 'var(--text-color)' },
          '& label.Mui-focused': { color: 'var(--text-color)!important' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--primary-color-500)!important',
          },
        }}
      />
    </LocalizationProvider>
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
