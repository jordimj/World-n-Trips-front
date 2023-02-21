import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';

function YearSelect({ year, onYearChange }) {
  const currentYear = new Date().getFullYear();

  const options = [
    'All time',
    ...Array.from({ length: currentYear - 2015 + 1 }, (_, idx) => currentYear - idx),
  ];

  return (
    <FormControl>
      <Select
        labelId="continent-select-label"
        id="continent-select"
        value={year ?? 'All time'}
        onChange={onYearChange}
        sx={{ width: '300px' }}
      >
        {options.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText sx={{ textAlign: 'right' }}>
        All time VS Yearly Stats
      </FormHelperText>
    </FormControl>
  );
}

export default YearSelect;
