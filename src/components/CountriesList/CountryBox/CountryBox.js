import { Box, Stack, Typography } from '@mui/material';
import styles from './CountryBox.module.css';

const CountryBox = ({ name, code, onClick }) => (
  <Stack className={styles.countryBox} onClick={onClick} gap={4}>
    <Typography variant="cardTitle">{name}</Typography>
    <Box sx={{ height: '100%', mt: 'auto' }}>
      <img
        src={process.env.PUBLIC_URL + `/img/flags/${code}.png`}
        alt={`${name}'s flag`}
      />
    </Box>
  </Stack>
);

export default CountryBox;
