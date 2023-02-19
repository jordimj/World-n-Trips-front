import { Stack, Typography } from '@mui/material';
import styles from './CountryBox.module.css';

const CountryBox = ({ name, code, onClick }) => (
  <Stack className={styles.countryBox} onClick={onClick}>
    <Typography variant="cardTitle">{name}</Typography>
    <img src={`/img/flags/${code}.png`} alt={`${name}'s flag`} />
  </Stack>
);

export default CountryBox;
