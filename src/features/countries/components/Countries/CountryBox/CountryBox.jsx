import { Stack, Typography } from '@mui/material';
import CountryFlag from '@/template/components/CountryFlag';
import styles from './CountryBox.module.css';

const CountryBox = ({ name, onClick }) => (
  <Stack className={styles.countryBox} onClick={onClick}>
    <Typography variant="cardTitle">{name.toUpperCase()}</Typography>
    <CountryFlag name={name} />
  </Stack>
);

export default CountryBox;
