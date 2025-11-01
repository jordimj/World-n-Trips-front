import { MenuItem, SelectChangeEvent } from '@mui/material';
import Select from '@/template/components/Select/Select';

interface Props {
  year: string | null;
  onYearChange: (e: SelectChangeEvent<string>) => void;
}

export default function YearSelect(props: Props) {
  const { year, onYearChange } = props;
  const currentYear = new Date().getFullYear();

  const options = [
    'All time',
    ...Array.from({ length: currentYear - 2015 + 1 }, (_, idx) => String(currentYear - idx)),
  ];

  return (
    <Select
      label="All time VS Yearly Stats"
      value={year ?? 'All time'}
      onChange={onYearChange}
      maxWidth={300}
      centered
    >
      {options.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
}
