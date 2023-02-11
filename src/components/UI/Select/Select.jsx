import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import styles from './Select.module.css';

function Select(props) {
  const { label, value, onChange, children, helper, disabled = false } = props;

  return (
    <FormControl disabled={disabled}>
      <InputLabel id={`${label}-select-label`} className={styles.text}>
        {label}
      </InputLabel>
      <MuiSelect
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        label={label}
        className={styles.select}
        value={value}
        onChange={onChange}
      >
        {children}
      </MuiSelect>
      <FormHelperText className={styles.formHelperText}>{helper}</FormHelperText>
    </FormControl>
  );
}

export default Select;
