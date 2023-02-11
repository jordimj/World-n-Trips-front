import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import styles from './Select.module.css';

function Select(props) {
  const { label, value, onChange, children, helper, disabled = false, ...rest } = props;

  return (
    <FormControl disabled={disabled} sx={{ width: '100%' }}>
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
        {...rest}
      >
        {children}
      </MuiSelect>
      <FormHelperText className={styles.formHelperText}>{helper}</FormHelperText>
    </FormControl>
  );
}

function MultiSelect(props) {
  return (
    <Select
      multiple
      input={<OutlinedInput label="Tag" />}
      renderValue={(selected) => selected.join(', ')}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 400,
            width: 250,
          },
        },
      }}
      {...props}
    />
  );
}

Select.Multiple = MultiSelect;
export default Select;
