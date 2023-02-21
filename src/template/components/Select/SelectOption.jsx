import MenuItem from '@mui/material/MenuItem';
import styles from './Select.module.css';

function SelectOption(props) {
  const { label, value } = props;

  return (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  );
}

export default SelectOption;
