import { MenuItem } from '@mui/material';
import Select from '../../../../template/components/Select/Select';

function YearSelect({ year, onYearChange }) {
  const currentYear = new Date().getFullYear();

  const options = [
    'All time',
    ...Array.from({ length: currentYear - 2015 + 1 }, (_, idx) => currentYear - idx),
  ];

  return (
    <Select
      label="All time VS Yearly Stats"
      value={year ?? 'All time'}
      onChange={onYearChange}
      maxWidth={300}
    >
      {options.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
}

export default YearSelect;
