import { Stack, Typography } from '@mui/material';
import { getCountryFlagSrc } from '@/utils';
import styles from './CountryBox.module.css';

const CountryBox = ({ name, code, onClick }) => (
  <Stack className={styles.countryBox} onClick={onClick}>
    <Typography variant="cardTitle">{name}</Typography>
    <img src={getCountryFlagSrc(code)} alt={`${name}'s flag`} />
  </Stack>
);

export default CountryBox;
