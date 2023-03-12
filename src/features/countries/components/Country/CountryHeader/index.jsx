import { Box, Stack, Typography } from '@mui/material';
import Map from '../../Map/Map';
import CountryDetails from '../CountryDetails/CountryDetails';
import NeighboringCountries from '../NeighboringCountries';
import styles from './CountryHeader.module.css';

function CountryHeader({ info, statesVisited, trips }) {
  const stateCodes = statesVisited.map((state) => [state.code]);

  return (
    <Stack direction="row" gap={4} sx={{ mt: 5, mb: 4, alignItems: 'center' }}>
      <Box className={styles.details}>
        <CountryDetails info={info} trips={trips} />
      </Box>
      <Stack className={styles.map} gap={1}>
        <Typography variant="h1">{info.name}</Typography>
        <Typography variant="subtitle1">{info.continent}</Typography>
        <Map data={[[''], ...stateCodes]} />
        {info.borders && <NeighboringCountries info={info} />}
      </Stack>
    </Stack>
  );
}

export default CountryHeader;
