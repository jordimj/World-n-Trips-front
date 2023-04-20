import MenuItem from '@mui/material/MenuItem';

function SelectOption(props) {
  const { label, value } = props;

  return (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  );
}

export default SelectOption;
